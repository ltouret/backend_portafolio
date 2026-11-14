---
title: malloc
summary: A malloc, free and realloc built on mmap, loaded in place of the system allocator with LD_PRELOAD.
stack: [C, Linux, mmap]
date: 2025-03-04
repo: https://github.com/ltouret/malloc
---

## What it is

A memory allocator for Linux, built as a shared library (`libft_malloc.so`) for 42 school, with a contribution from a classmate. A small `run.sh` preloads it with `LD_PRELOAD`, so an existing program runs on this allocator instead of the system one without being recompiled.

## Design

Memory comes from `mmap` and goes back with `munmap`. Requests fall into three classes by size: tiny (up to a quarter of a page), small (up to a page) and large (its own mapping). Each tiny or small zone is sized to hold 105 allocations, and two of each are mapped up front, so most calls never reach the kernel. Blocks are tracked in a doubly linked list, freed space is reused first-fit, and every pointer is aligned to 16 bytes.

## The rewrite

My first prototype handled tiny and small zones in one way and large allocations in another. Partway through I stopped and reworked it so that every zone lives in the same linked list and differs only by a type field. A large allocation became one more zone in that list, and the same logic now serves all three sizes.

## Debugging aid

`show_alloc_mem()` prints the heap as the allocator sees it: every zone, its type, and the address and size of each live block.
