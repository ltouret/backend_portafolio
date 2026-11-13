---
title: Inception of Things
summary: A self-hosted cloud stack on K3s, with Vagrant VMs, Traefik ingress with HTTPS, GitOps deployments with ArgoCD and an in-cluster GitLab as the source of truth.
stack: [Kubernetes, K3s, Vagrant, ArgoCD, GitLab, Traefik, Docker, Bash]
date: 2025-06-04
repo: https://github.com/frdescam/inception-of-things
---

## What it is

A 42 school project about cloud infrastructure, built as a pair. It goes from provisioning VMs to a fully in-house continuous deployment pipeline, with each part runnable on its own.

## Parts

- **P1:** Two Vagrant VMs forming a K3s cluster (server + agent), provisioned with shell scripts.
- **P2:** A single-node K3s with three apps behind Traefik, routed by hostname, with a catch-all default backend.
- **P3:** K3d + ArgoCD syncing an app from a Git repo, so pushing a new image tag redeploys it.
- **Bonus:** GitLab running inside the cluster, replacing GitHub as the repo ArgoCD watches.

## Going further than the subject

- HTTPS through cert-manager with a cluster CA, plus a permanent HTTP → HTTPS redirect as Traefik middleware.
- Docker images built locally from a Dockerfile instead of pulled from a registry.
- Our own CI: images are built and pushed to the local GitLab registry, then deployed by ArgoCD, with nothing hosted outside the cluster.
