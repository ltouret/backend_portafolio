---
title: ft_services
summary: A Kubernetes cluster on Minikube where every image is built from Alpine by hand, with WordPress, phpMyAdmin, MySQL, FTPS and a Telegraf, InfluxDB and Grafana monitoring stack.
stack: [Kubernetes, Minikube, Docker, MetalLB, Nginx, MySQL, InfluxDB, Grafana, Bash]
date: 2021-05-02
repo: https://github.com/ltouret/ft_services
---

## What it is

A Kubernetes project done for 42 school in 2021. One `setup.sh` starts Minikube, installs MetalLB, builds seven images and deploys the cluster, then prints the address of each service.

## No ready-made images

The subject forbids pulling service images, so every container starts from bare Alpine and I install and configure the software myself: nginx, WordPress and phpMyAdmin (each behind its own nginx with PHP), MySQL, vsftpd for FTPS, InfluxDB and Grafana. The images are built directly inside Minikube's Docker daemon, so there is no registry.

It's a slow way to deploy WordPress and a good way to learn what the official images do for you.

## How the cluster fits together

- Each service is a Deployment plus a Service. The public ones are `LoadBalancer` services with addresses from MetalLB. MySQL and InfluxDB stay internal as `ClusterIP`.
- MySQL, InfluxDB and the FTPS server keep their data on persistent volume claims, so it survives a pod being replaced.
- The front nginx redirects HTTP to HTTPS, reverse-proxies `/phpmyadmin/` and redirects `/wordpress` to the WordPress service's own port.
- Every container also runs a Telegraf agent that reports to InfluxDB, and Grafana reads from there. Since a container then has two processes, its start script exits as soon as either one dies, so Kubernetes restarts the pod.
