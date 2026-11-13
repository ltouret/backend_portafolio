---
title: Home Lab
summary: A self-hosted server running my websites and services in Docker, behind an Nginx reverse proxy with wildcard TLS certificates from acme.sh and fail2ban protection.
stack: [Docker, Docker Compose, Nginx, acme.sh, fail2ban, Nextcloud, Linux]
date: 2026-11-13
---

## What it is

The server I run at home to host my own websites and services. Each one runs in Docker, and a single Nginx reverse proxy sits in front of them all. The same setup runs on a separate VPS for some projects.

## What it hosts

- **Static sites**, such as the [red-black tree visualization](https://github.com/ltouret/redBlackWeb).
- **Live demos of my projects**, such as [H42N42](/projects/h42n42/). [Reimagined-KMI](/projects/reimagined-kmi/) runs on the VPS with the same setup.
- **Nextcloud** for files.
- **A password manager.**

## How it's set up

- **Docker Compose for every service:** each one is its own Compose project, with its own Docker network, so services are isolated from each other.
- **Nginx as reverse proxy:** it routes each subdomain to the right container and handles TLS for all of them.
- **Wildcard certificates:** acme.sh issues and renews one wildcard certificate that covers every subdomain.
- **fail2ban** watches the logs and bans IPs after repeated failed attempts.
