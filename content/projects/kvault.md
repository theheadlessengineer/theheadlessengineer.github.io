---
title: 'kvault'
slug: 'kvault'
description: 'Distributed key-value store built on the Raft consensus protocol'
excerpt: 'Distributed key-value store built on Raft consensus. Sub-millisecond reads, horizontal scaling, and automatic shard rebalancing.'
category: 'Go'
status: 'active'
license: 'Apache 2.0'
lastCommit: '1 week ago'
tags: ['database', 'raft', 'distributed-systems', 'key-value', 'consensus']
stats:
  stars: 1204
  forks: 156
  contributors: 18
  version: 'v2.1.0'
  buildStatus: 'passing'
  coverage: 92
links:
  github: 'https://github.com/example/kvault'
  docs: 'https://kvault.io/docs'
  demo: 'https://demo.kvault.io'
seo:
  metaTitle: 'kvault - Distributed Key-Value Store with Raft Consensus'
  metaDescription: 'Production-ready distributed key-value store with Raft consensus, sub-millisecond reads, and automatic shard rebalancing'
  keywords: ['kvault', 'distributed-database', 'raft', 'key-value-store', 'go', 'consensus']
  canonicalUrl: '/projects/kvault'
  ogImage: '/images/projects/kvault-og.jpg'
---

## Overview

kvault is a distributed key-value store built on the Raft consensus protocol. It provides sub-millisecond reads, horizontal scaling, and automatic shard rebalancing without manual intervention.

## Quick Start

```go
package main

import "github.com/example/kvault"

func main() {
    client := kvault.Connect("localhost:8080")

    client.Set("key", "value")
    val, _ := client.Get("key")
}
```

## Features

- Raft consensus for strong consistency
- Sub-millisecond read latency
- Automatic shard rebalancing
- Multi-datacenter replication
- ACID transactions
- gRPC and HTTP APIs

## Performance

Benchmarked on 5-node cluster with 3 replicas:

- Reads: 50,000 ops/sec per node
- Writes: 15,000 ops/sec cluster-wide
- p99 read latency: 0.8ms
- p99 write latency: 3.2ms
