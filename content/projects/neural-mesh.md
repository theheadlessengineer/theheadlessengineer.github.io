---
title: 'neural-mesh'
slug: 'neural-mesh'
description: 'A low-latency distributed runtime for neural network inference across heterogeneous hardware'
excerpt: 'Distributed neural network inference runtime for heterogeneous hardware. Supports WASM, GPU, and CPU targets with automatic workload balancing and fault-tolerant mesh topology.'
category: 'Rust'
status: 'active'
license: 'MIT'
lastCommit: '2 days ago'
tags: ['distributed-systems', 'machine-learning', 'webassembly', 'gpu-compute', 'inference', 'onnx']
stats:
  stars: 2841
  forks: 318
  contributors: 24
  version: 'v0.9.4'
  buildStatus: 'passing'
  coverage: 87
links:
  github: 'https://github.com/example/neural-mesh'
  docs: 'https://neural-mesh.dev/docs'
  demo: 'https://demo.neural-mesh.dev'
  crates: 'https://crates.io/crates/neural-mesh'
featured: true
seo:
  metaTitle: 'neural-mesh - Distributed Neural Network Inference Runtime'
  metaDescription: 'Low-latency distributed runtime for neural network inference across heterogeneous hardware with WASM, GPU, and CPU support'
  keywords: ['neural-mesh', 'distributed-systems', 'machine-learning', 'rust', 'inference', 'gpu']
  canonicalUrl: '/projects/neural-mesh'
  ogImage: '/images/projects/neural-mesh-og.jpg'
---

## Overview

neural-mesh is a low-latency distributed runtime for neural network inference across heterogeneous hardware clusters. It provides a unified execution surface for WASM, CUDA, and CPU backends with transparent workload balancing and fault-tolerant mesh topology.

> Built for production: sub-10ms p99 inference latency under adversarial load, proven across 24 production deployments.

## Quick Start

Add the crate and start a local mesh node:

```rust
use neural_mesh::{Mesh, Backend, ModelPath};

#[tokio::main]
async fn main() {
    let mesh = Mesh::builder()
        .backend(Backend::Auto)
        .workers(8)
        .model(ModelPath::from("./llm.onnx"))
        .build().await.unwrap();

    let result = mesh.infer(&input).await.unwrap();
}
```

## Features

- Automatic backend selection: CUDA → WASM → CPU with graceful fallback
- Fault-tolerant mesh topology — nodes rejoin without restart
- Sub-10ms p99 latency under sustained production load
- ONNX model format with custom kernel extension points
- gRPC + HTTP/2 inference API with streaming support
- Built-in Prometheus metrics and OpenTelemetry tracing

## Architecture

The mesh is built around a gossip-based membership protocol. Each node maintains a partial view of cluster state and converges globally within two gossip rounds.
