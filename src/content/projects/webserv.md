---
title: webserv
summary: An HTTP/1.1 web server in C++, with an nginx-style config file, multiple virtual servers, uploads and PHP through CGI.
stack: [C++, HTTP, CGI, PHP]
date: 2022-06-05
repo: https://github.com/ltouret/webserv
---

## What it is

A 42 school team project: an HTTP server written from scratch in C++, configured with a file in a syntax close to nginx's.

## Features

- **Non-blocking I/O:** one `poll()` loop handles all clients and listening sockets.
- **Methods:** `GET`, `POST` and `DELETE`, with a `405` for methods a location doesn't allow.
- **Several virtual servers:** each `server` block has its own `listen` port, `server_name` and root.
- **Per-location rules:** `index`, `autoindex`, `allow_methods`, `return` redirections, custom `error_page`s, and `client_max_body_size` (bodies over the limit get a `413`).
- **File uploads**, saved to a configured `upload_store`.
- **CGI:** PHP scripts run through `php-cgi`, with the CGI environment variables set.

## Testing

The repo includes sample config files for each feature (autoindex, error pages, methods, redirection, uploads and server names), and test sites with PHP forms and upload pages.
