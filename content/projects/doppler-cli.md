---
title: 'doppler-cli'
slug: 'doppler-cli'
description: 'Unified secrets management CLI across multiple environments and providers'
excerpt: 'Unified secrets management CLI across multiple environments. Hot reload, audit logging, RBAC teams, and multi-cloud support out of the box.'
category: 'Python'
status: 'stable'
license: 'MIT'
lastCommit: '2 weeks ago'
tags: ['secrets-management', 'devops', 'cli', 'security', 'multi-cloud']
stats:
  stars: 892
  forks: 94
  contributors: 12
  version: 'v3.2.1'
  buildStatus: 'passing'
  coverage: 88
links:
  github: 'https://github.com/example/doppler-cli'
  docs: 'https://doppler-cli.dev/docs'
seo:
  metaTitle: 'doppler-cli - Unified Secrets Management CLI'
  metaDescription: 'Production-ready secrets management CLI with hot reload, audit logging, and multi-cloud support'
  keywords: ['secrets-management', 'devops', 'cli', 'security', 'python', 'multi-cloud']
  canonicalUrl: '/projects/doppler-cli'
  ogImage: '/images/projects/doppler-cli-og.jpg'
---

## Overview

doppler-cli is a unified secrets management CLI that works across multiple environments and cloud providers. It provides hot reload, audit logging, RBAC teams, and multi-cloud support without vendor lock-in.

## Quick Start

```bash
pip install doppler-cli
```

```bash
# Initialize project
doppler init

# Set secrets
doppler secrets set API_KEY=abc123

# Run with secrets injected
doppler run -- python app.py
```

## Features

- Multi-cloud support (AWS, GCP, Azure, Vault)
- Hot reload secrets without restart
- Audit logging for compliance
- RBAC with team management
- Environment branching
- Secret rotation automation
- CLI and SDK support

## Integrations

Works with AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, HashiCorp Vault, and local encrypted storage.
