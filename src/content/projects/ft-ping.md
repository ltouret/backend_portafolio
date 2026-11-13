---
title: ft_ping
summary: A reimplementation of the inetutils 2.0 ping command in C, sending ICMP echo requests without needing root.
stack: [C, Linux, ICMP, Sockets]
date: 2025-06-07
repo: https://github.com/ltouret/ft_ping
---

## What it is

A 42 school project that rebuilds `ping` from inetutils 2.0 in C. It sends ICMP ECHO_REQUEST packets to a host and reports replies, round-trip times and final statistics, matching the original's output.

## How it works

- **No root needed:** it uses an ICMP "ping socket" (`SOCK_DGRAM` + `IPPROTO_ICMP`) instead of a raw socket. The kernel fills in fields like the checksum, so it runs with normal user permissions.
- **Replies:** read with `recvmsg`, which also returns the reply's TTL from the control messages.
- **Statistics:** packets sent, received and lost, plus round-trip min/avg/max/stddev. The final stats print on Ctrl+C or after the packet count.

## Options

- `-c N`: stop after N packets.
- `-i N`: wait N seconds between packets.
- `-W N`: wait up to N seconds for a reply.
- `--ttl N`: set the packets' time-to-live.
- `-e N`: set the session's identifier.
- `-v` / `-q`: verbose or quiet output.
- `--help`, `--usage` and `-V`.
