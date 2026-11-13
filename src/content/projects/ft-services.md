---
title: ft_services
summary: A multi-service Kubernetes cluster on Minikube, with MetalLB load balancing, WordPress, phpMyAdmin, FTPS and an InfluxDB, Telegraf and Grafana monitoring stack.
stack: [Kubernetes, Minikube, Docker, MetalLB, Nginx, MySQL, InfluxDB, Grafana, Bash]
date: 2021-05-02
repo: https://github.com/ltouret/ft_services
---

## What it is

A 42 school project about running a set of services on Kubernetes. A single `setup.sh` starts Minikube, installs MetalLB, builds every image and deploys the whole cluster.

## Services

- **Nginx:** redirects HTTP to HTTPS, and routes `/wordpress` and `/phpmyadmin` to the matching services.
- **WordPress and phpMyAdmin**, each served by its own nginx.
- **MySQL**, with persistent storage.
- **FTPS** with vsftpd.
- **Monitoring:** a Telegraf agent in each container sends metrics to InfluxDB, and Grafana displays them.

## How it's built

- **Own images:** every service has its own Dockerfile based on Alpine, built inside Minikube's Docker daemon instead of pulled from a registry.
- **Kubernetes resources:** each service is a Deployment and a Service. The external ones are `LoadBalancer` services that get their IPs from MetalLB, and stateful ones use persistent volume claims.
- **Setup script:** fills in the Minikube IP in the configs, deploys everything in order and prints where each service can be reached.
