---
title: icmp_chat
summary: A terminal chat room that sends its messages inside ICMP echo packets, the packets ping uses, instead of TCP or UDP.
stack: [C, Linux, ICMP, Raw sockets]
date: 2026-11-01
repo: https://github.com/ltouret/icmp_chat
---

## What it is

A small chat written in C for Linux, with no external libraries. Clients send their messages to the server as ping requests, and the server sends each one to everyone in the room as ping replies. One binary runs both sides: `icmp_chat server` or `icmp_chat client <ip> <name>`.

## How it works

- **Server:** opens a raw ICMP socket, which needs root or `CAP_NET_RAW`. It keeps a list of users in the room, each identified by IP address and ICMP id, and broadcasts every message to all of them.
- **Client:** uses an unprivileged ICMP "ping socket" (`SOCK_DGRAM` + `IPPROTO_ICMP`), so it doesn't need root. The kernel gives this socket its own ICMP id, and the server replies with that id so the right socket gets the message.
- **One direction each:** clients only send echo *requests* and the server only sends echo *replies*. If the server sent requests, the client machine's kernel would answer them itself.

## Protocol

- Each message is a custom 300-byte packet. It holds the ICMP header plus a magic value (`ICMC`), an action, a username, a room name and up to 256 bytes of message.
- Both sides drop all other ICMP traffic. A packet must be the full size, carry the magic value, and have the type and action expected from the other side. This also filters out the server kernel's automatic ping replies.

## Terminal client

- The client manages its own input line, so incoming messages are printed above what you're typing without breaking it.
- Backspace is UTF-8 aware, and Ctrl+U, Ctrl+D and Ctrl+C work.
- When stdin is a pipe, it reads whole lines instead, so scripts can send messages.

## Limits

The README lists the known limits of v1.0, with a v1.1 roadmap to fix several of them:
- A client only receives messages after sending one.
- Clients are never removed from the room.
- There's no authentication or encryption.
- There's a single room.
