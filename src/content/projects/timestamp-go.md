---
title: Timestamp-go
summary: A Go and Gin API for the freeCodeCamp timestamp and request-header-parser microservices, which logs request analytics to MySQL through middleware.
stack: [Go, Gin, MySQL, Docker]
date: 2023-09-21
repo: https://github.com/ltouret/timestamp-go
---

## What it is

Two freeCodeCamp back-end projects, *Timestamp Microservice* and *Request Header Parser*, built in Go with Gin instead of the usual Node and Express. Both run in one versioned API under `/api/v1`.

## Endpoints

- **`GET /timestamp/:date`:** takes a `YYYY-MM-DD` date or a Unix time in milliseconds and returns `{ unix, utc }`. Invalid input gets a `400` with an error.
- **`GET /timestamp/`:** returns the current time in the same format.
- **`GET /header-parser/whoami`:** returns the client's IP address, `Accept-Language` and User-Agent.

## Going further than the subject

- **Request analytics:** Gin middleware times each request and writes the timestamp, client IP, User-Agent, status code and response time to MySQL.
- **Automatic schema setup:** on startup, the app creates the `analytics` database and its tables if they don't exist yet.
- **Dependency injection:** the database handle is passed to the routes through an `AnalyticsService` instead of a global.
- **Configuration:** database credentials and Gin mode come from a `.env` file. There's a Docker dev image with `air` for live reload, and separate `dev` and `main` branches.
