---
title: Home Lab
summary: My self-hosted infrastructure across an old tower, a Raspberry Pi and a VPS, running websites and services in Docker behind an Nginx reverse proxy with wildcard TLS, a WireGuard VPN and daily backups.
stack: [Docker, Docker Compose, Nginx, acme.sh, WireGuard, fail2ban, Linux]
date: 2026-11-13
featured: true
---

## What it is

The infrastructure I run to host my own websites and services. It's spread over three machines: an old tower at home, a Raspberry Pi and a VPS. They all use the same setup: every service in Docker, behind an Nginx reverse proxy.

## What it hosts

- **Static sites**, such as the [red-black tree visualization](https://github.com/ltouret/redBlackWeb).
- **Live demos of my projects**, such as [H42N42](/projects/h42n42/) and [Reimagined-KMI](/projects/reimagined-kmi/).
- **A few private services** for personal use.

## How it's set up

- **Docker Compose for every service:** each one is its own Compose project, with its own Docker network, so services are isolated from each other.
- **Nginx as reverse proxy:** it routes each subdomain to the right container and handles TLS for all of them.
- **Wildcard certificates:** acme.sh issues and renews one wildcard certificate that covers every subdomain.
- **WireGuard VPN** for remote access to the network.
- **fail2ban** watches the logs and bans IPs after repeated failed attempts.

## Backups

Backups run every day and are copied to several machines, so a single machine failing doesn't lose any data.
