---
title: malloc
summary: A custom malloc, free and realloc for Linux, built on mmap as a shared library that replaces the system allocator through LD_PRELOAD.
stack: [C, Linux, mmap]
date: 2025-03-04
repo: https://github.com/ltouret/malloc
---

## What it is

A 42 school project: a memory allocator for Linux, built as a shared library (`libft_malloc.so`). The included `run.sh` preloads it with `LD_PRELOAD`, so any program uses it instead of the system `malloc`.

## How it works

- **Memory from the kernel:** pages are requested with `mmap` and released with `munmap`.
- **Three size classes:**
  - Tiny allocations, up to a quarter of a page.
  - Small allocations, up to a page.
  - Large allocations, which each get their own mapping.
- **Fewer system calls:** two tiny zones and two small zones are preallocated.
- **Block tracking:** a doubly linked list tracks the blocks. Freed space is reused first-fit.
- **Alignment:** every allocation is aligned to 16 bytes.

## Visualization

`show_alloc_mem()` prints the current state of the heap: each zone, its type, and the address and size of every allocated block.
