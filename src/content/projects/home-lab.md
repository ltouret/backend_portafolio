---
title: Home Lab
summary: The machines I run my own sites and demos on, an old tower, a Raspberry Pi and a VPS, with everything in Docker behind Nginx.
stack: [Docker, Docker Compose, Nginx, acme.sh, WireGuard, fail2ban, Linux]
date: 2026-11-13
featured: true
---

## What it is

The live demos on this site run on three machines I set up and look after myself: an old tower at home, a Raspberry Pi and a VPS.

## What runs on it

- The live demos of [H42N42](/projects/h42n42/) and [Reimagined-KMI](/projects/reimagined-kmi/).
- Static sites, such as my [red-black tree visualization](https://github.com/ltouret/redBlackWeb).
- A few private services for my own use.

## How it's set up

All three machines follow the same pattern. Each service is its own Docker Compose project on its own Docker network. Nginx sits in front as a reverse proxy: it handles TLS and routes each subdomain to the right container. One wildcard certificate, issued and renewed by acme.sh, covers every subdomain.

Remote access goes through WireGuard. SSH accepts keys only, and fail2ban bans addresses that keep failing to log in.

## Data

The tower keeps persistent data on a RAID array. Backups run daily and are copied to several machines.
