---
title: webserv
summary: An HTTP/1.1 server written from scratch in C++, with an nginx-style config file, virtual servers, uploads and PHP through CGI.
stack: [C++, HTTP, CGI, PHP]
date: 2022-06-05
repo: https://github.com/ltouret/webserv
---

## What it is

A web server built as a team project at 42 school. No HTTP library: we parse the requests, build the responses and manage the sockets ourselves. It's configured with a file in a syntax close to nginx's.

## How it works

A single `poll()` loop watches every listening socket and every client, so one process serves them all with no threads to coordinate.

Requests can arrive in pieces, so each client keeps its own parsing state until the headers and body are complete. Bodies sent with chunked transfer encoding are reassembled, and a body over the configured limit gets a `413`.

PHP runs through CGI: the server forks, sets the CGI environment variables and executes `php-cgi`, then sends its output back as the response.

## Configuration

Each `server` block has its own port, `server_name` and root, so one process serves several sites. Per location you can set `index`, `autoindex`, `allow_methods` (anything else gets a `405`), `return` redirections, custom error pages, a body size limit and an `upload_store` for uploaded files.

## Testing

The repo has one config file per feature, and test sites with PHP forms and upload pages to exercise them from a browser.
