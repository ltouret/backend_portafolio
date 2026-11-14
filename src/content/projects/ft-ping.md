---
title: ft_ping
summary: The inetutils 2.0 ping command rebuilt in C, with matching output, on a socket that doesn't need root.
stack: [C, Linux, ICMP, Sockets]
date: 2025-06-07
repo: https://github.com/ltouret/ft_ping
---

## What it is

A reimplementation of `ping` from inetutils 2.0, written for 42 school. The target was the original's behaviour: same output format, same statistics, same options. The repo has a script that downloads and builds inetutils 2.0 so the two can be run side by side.

## Running without root

`ping` traditionally needs a raw socket, which means root or a capability on the binary. I used an ICMP datagram socket instead (`SOCK_DGRAM` + `IPPROTO_ICMP`). The kernel fills in the checksum and the ICMP id, and the program runs as a normal user.

The trade-off is that this socket hides the IP header, so the reply's TTL isn't in the data. I get it by enabling `IP_RECVTTL` and reading the control messages that `recvmsg` returns.

## The parts that took the longest

- **Argument parsing.** It's written by hand, with no `getopt`. The core ping worked after ten days, and the parsing then took longer than that.
- **Statistics.** Min, avg, max and standard deviation, computed without libm, using a small square-root function of my own.

## Options

`-c`, `-i`, `-W`, `--ttl`, `-e`, `-v`, `-q`, plus `--help`, `--usage` and `-V`.
