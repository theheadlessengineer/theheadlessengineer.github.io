import { render, screen } from '@testing-library/react';
import fs from 'fs';
import ProjectsPage from '@/app/projects/page';

jest.mock('fs');
jest.mock('path', () => ({
  join: (...args: string[]) => args.join('/'),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Projects Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockFs.readdirSync.mockReturnValueOnce(['project1.md', 'project2.md'] as any);
    mockFs.statSync
      .mockReturnValueOnce({ isDirectory: () => false } as any)
      .mockReturnValueOnce({ isDirectory: () => false } as any);

    const project1 = `---
title: neural-mesh
slug: neural-mesh
description: Distributed neural network inference runtime
excerpt: Low-latency distributed runtime for neural network inference
language: Rust
status: active
license: MIT
lastCommit: 2 days ago
tags: [distributed, ml, rust]
stats:
  stars: 2841
links:
  github: https://github.com/example/neural-mesh
seo:
  metaTitle: neural-mesh - Distributed Inference
  metaDescription: Low-latency distributed runtime for neural network inference
  keywords: [rust, ml, distributed]
  canonicalUrl: /projects/neural-mesh
  ogImage: /images/neural-mesh.jpg
---
Content 1`;

    const project2 = `---
title: kvault
slug: kvault
description: Distributed key-value store
excerpt: Distributed key-value store built on Raft consensus
language: Go
status: active
license: Apache 2.0
lastCommit: 1 week ago
tags: [database, raft, go]
stats:
  stars: 1204
links:
  github: https://github.com/example/kvault
seo:
  metaTitle: kvault - Distributed KV Store
  metaDescription: Distributed key-value store with Raft consensus
  keywords: [go, database, raft]
  canonicalUrl: /projects/kvault
  ogImage: /images/kvault.jpg
---
Content 2`;

    mockFs.readFileSync.mockReturnValueOnce(project1).mockReturnValueOnce(project2);
  });

  it('should render projects page with projects', () => {
    render(<ProjectsPage />);

    expect(screen.getByText('neural-mesh')).toBeInTheDocument();
    expect(screen.getByText('kvault')).toBeInTheDocument();
  });

  it('should display projects', () => {
    render(<ProjectsPage />);

    expect(screen.getByText('neural-mesh')).toBeInTheDocument();
    expect(screen.getByText('kvault')).toBeInTheDocument();
  });
});
