---
title: Reimagined-KMI
summary: A command-line pastebin in pure PHP, with no framework or database. Pipe text to curl and get back a short link.
stack: [PHP, Docker, Bash]
date: 2024-10-20
repo: https://github.com/ltouret/reimagined-kmi
---

## What it is

A pastebin you use from the terminal, written in plain PHP with no dependencies. You upload with `cat file | curl -F 'kmi=<-' <domain>` and get back a link with a random 10-character ID. Anyone can paste, no account needed.

## How it works

- **One file, split by role:** `index.php` has a small router that switches on the HTTP method, and service functions that handle storage.
- **Flat-file storage:** each paste is saved as a file in `uploads/`. Once there are more than 1000, the oldest one is deleted.
- **Limits and errors:** pastes are capped at 512 KB. The server answers with proper status codes: `201` on upload, and `400`, `404`, `405`, `413` or `500` for errors.
- **Terminal-friendly home page:** `GET /` returns a man-page-style help text. It's colored with ANSI codes when the client is curl, and plain text in a browser.

## Running it

- Runs on PHP's built-in server, started by a shell script, or in an Alpine PHP Docker image.
- The public domain comes from a `.env` file.
- Bash scripts in `tools/` load-test GET and POST with 1000 requests each and clear out the uploads folder.
