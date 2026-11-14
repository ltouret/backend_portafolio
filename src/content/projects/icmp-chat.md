---
title: icmp_chat
summary: A terminal chat room that runs entirely over ping packets. No TCP, no UDP, and the client doesn't need root.
stack: [C, Linux, ICMP, Raw sockets]
date: 2026-11-01
repo: https://github.com/ltouret/icmp_chat
featured: true
---

## What it is

A chat room where every message travels inside an ICMP echo packet, the kind `ping` sends. Clients send their messages as ping requests, and the server answers everyone in the room with ping replies. It's plain C on Linux with no libraries, and one binary runs both sides: `icmp_chat server` or `icmp_chat client <ip> <name>`.

I started it right after [ft_ping](/projects/ft-ping/), using the same kind of socket.

## The problem that shaped the design

The kernel already speaks ICMP, and it kept getting in the way.

My first plan had the server ping its clients to check they were still there. The clients never saw those packets. A client uses an unprivileged "ping socket" (`SOCK_DGRAM` + `IPPROTO_ICMP`), which only receives echo *replies*, and the client machine's kernel was answering my requests itself. The server looped forever waiting for answers.

That gave the protocol its one rule: clients only send requests, the server only sends replies. The kernel gives each ping socket its own ICMP id, so the server identifies a user by IP address plus that id, and replies with it so the right socket gets the message.

The server's kernel also answers every ping it receives, echoing the client's message straight back. I first planned to turn that off with a `sysctl`. Instead, each packet carries an action field: the kernel's copy still says "send", so clients ignore it and the server needs no special setup.

## Protocol

Each message is a fixed 300-byte packet: the ICMP header, a magic value (`ICMC`, easy to spot in tcpdump), the action, a username, a room name and up to 256 bytes of UTF-8 text. Both sides drop anything that is too short, has the wrong magic value, or carries a type and action that can't come from the other side.

## Terminal client

The client draws its own input line, so a message arriving while you type is printed above your text instead of through it. Backspace understands multi-byte UTF-8. When stdin is a pipe it reads whole lines, so a script can post to the room.

## Where it stands

This is v1.0, and it has limits I chose to ship with. A client only starts receiving after it has sent one message, and the server never removes clients that leave. There is no authentication, so anyone who knows the format can post under any name. A join packet and a keepalive, which would also keep NAT mappings open, are planned for v1.1.
