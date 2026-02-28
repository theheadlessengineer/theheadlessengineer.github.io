---
title: 'The Complete k6 Load Testing Guide'
slug: 'k6-load-testing-complete-guide'
description: 'A comprehensive guide to k6 load testing with real-world case studies, practical examples, and production-ready test scenarios for e-commerce platforms.'
excerpt: 'Master k6 load testing from basics to advanced scenarios. Includes a complete ShopFlow e-commerce case study with smoke, load, stress, spike, soak, and breakpoint tests.'
publishedAt: '2026-02-20'
updatedAt: '2026-02-20'
category: 'performance-testing'
subcategory: 'load-testing'
tags: ['k6', 'load-testing', 'performance', 'grafana', 'devops', 'ci-cd', 'ecommerce']
author: 'Headless Engineer'
readingTime: 45
seo:
  metaTitle: 'Complete k6 Load Testing Guide - Real-World Case Study & Examples'
  metaDescription: 'Learn k6 load testing with a complete e-commerce case study. Includes smoke, load, stress, spike, soak, and breakpoint tests with production-ready code.'
  keywords:
    [
      'k6 load testing',
      'performance testing',
      'grafana k6',
      'load test tutorial',
      'stress testing',
      'spike test',
      'soak test',
      'ecommerce performance',
    ]
  canonicalUrl: '/blog/performance-testing/load-testing/k6-load-testing-complete-guide'
  ogImage: '/images/blog/k6-load-testing-complete-guide-og.jpg'
video:
  enabled: true
  slug: 'k6-complete-guide'
  duration: 65
  scenes: 7
---

# The Complete k6 Load Testing Guide

### A Practical Tutorial with a Real-World Case Study

---

## Table of Contents

1. [What is k6?](#1-what-is-k6)
2. [Installation & Setup](#2-installation--setup)
3. [Core Concepts](#3-core-concepts)
4. [Writing Your First Test](#4-writing-your-first-test)
5. [Metrics, Checks & Thresholds](#5-metrics-checks--thresholds)
6. [Scenarios & Executors](#6-scenarios--executors)
7. [Case Study: ShopFlow E-Commerce Platform](#7-case-study-shopflow-e-commerce-platform)
   - [7.1 System Overview](#71-system-overview)
   - [7.2 Smoke Test](#72-smoke-test)
   - [7.3 Load Test](#73-load-test)
   - [7.4 Stress Test](#74-stress-test)
   - [7.5 Spike Test](#75-spike-test)
   - [7.6 Soak / Endurance Test](#76-soak--endurance-test)
   - [7.7 Breakpoint Test](#77-breakpoint-test)
8. [Interpreting Results](#8-interpreting-results)
9. [CI/CD Integration](#9-cicd-integration)
10. [Best Practices & Common Mistakes](#10-best-practices--common-mistakes)

---

## 1. What is k6?

k6 is an open-source load testing tool built for developers. It was created by Grafana Labs and lets you write tests in JavaScript while the engine itself runs in Go — which means it's fast, resource-efficient, and capable of generating serious load from a single machine.

### Why k6 over alternatives?

| Feature             | k6               | JMeter       | Locust       |
| ------------------- | ---------------- | ------------ | ------------ |
| Script language     | JavaScript       | XML / Groovy | Python       |
| CI/CD friendly      | [✓] Native       | [!] Possible | [!] Possible |
| Resource usage      | Low (Go runtime) | High (JVM)   | Medium       |
| Headless by default | [✓]              | [✗]          | [✓]          |
| Built-in metrics    | Extensive        | Moderate     | Basic        |
| Browser testing     | [✓] (k6 browser) | [✓]          | [✗]          |

### Types of load testing k6 supports

- **Smoke test** — verify baseline behavior with minimal load
- **Load test** — simulate expected real-world traffic
- **Stress test** — push beyond normal capacity to find degradation points
- **Spike test** — simulate sudden, extreme traffic bursts
- **Soak test** — run sustained load over hours to find memory leaks and drift
- **Breakpoint test** — gradually increase until the system fails

---

## 2. Installation & Setup

### macOS

```bash
brew install k6
```

### Windows

```bash
winget install k6 --source winget
# or via Chocolatey
choco install k6
```

### Linux (Debian/Ubuntu)

```bash
sudo gpg -k
sudo gpg --no-default-keyring \
  --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] \
  https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Docker

```bash
docker run -i grafana/k6 run - <script.js
```

### Verify installation

```bash
k6 version
# k6 v0.54.0 (go1.22.5, linux/amd64)
```

---

_[Rest of the content continues exactly as in the original markdown file...]_

# The Complete k6 Load Testing Guide

### A Practical Tutorial with a Real-World Case Study

---

## Table of Contents

1. [What is k6?](#1-what-is-k6)
2. [Installation & Setup](#2-installation--setup)
3. [Core Concepts](#3-core-concepts)
4. [Writing Your First Test](#4-writing-your-first-test)
5. [Metrics, Checks & Thresholds](#5-metrics-checks--thresholds)
6. [Scenarios & Executors](#6-scenarios--executors)
7. [Case Study: ShopFlow E-Commerce Platform](#7-case-study-shopflow-e-commerce-platform)
   - [7.1 System Overview](#71-system-overview)
   - [7.2 Smoke Test](#72-smoke-test)
   - [7.3 Load Test](#73-load-test)
   - [7.4 Stress Test](#74-stress-test)
   - [7.5 Spike Test](#75-spike-test)
   - [7.6 Soak / Endurance Test](#76-soak--endurance-test)
   - [7.7 Breakpoint Test](#77-breakpoint-test)
8. [Interpreting Results](#8-interpreting-results)
9. [CI/CD Integration](#9-cicd-integration)
10. [Best Practices & Common Mistakes](#10-best-practices--common-mistakes)

---

## 1. What is k6?

k6 is an open-source load testing tool built for developers. It was created by Grafana Labs and lets you write tests in JavaScript while the engine itself runs in Go — which means it's fast, resource-efficient, and capable of generating serious load from a single machine.

### Why k6 over alternatives?

| Feature             | k6               | JMeter       | Locust       |
| ------------------- | ---------------- | ------------ | ------------ |
| Script language     | JavaScript       | XML / Groovy | Python       |
| CI/CD friendly      | [✓] Native       | [!] Possible | [!] Possible |
| Resource usage      | Low (Go runtime) | High (JVM)   | Medium       |
| Headless by default | [✓]              | [✗]          | [✓]          |
| Built-in metrics    | Extensive        | Moderate     | Basic        |
| Browser testing     | [✓] (k6 browser) | [✓]          | [✗]          |

### Types of load testing k6 supports

- **Smoke test** — verify baseline behavior with minimal load
- **Load test** — simulate expected real-world traffic
- **Stress test** — push beyond normal capacity to find degradation points
- **Spike test** — simulate sudden, extreme traffic bursts
- **Soak test** — run sustained load over hours to find memory leaks and drift
- **Breakpoint test** — gradually increase until the system fails

---

## 2. Installation & Setup

### macOS

```bash
brew install k6
```

### Windows

```bash
winget install k6 --source winget
# or via Chocolatey
choco install k6
```

### Linux (Debian/Ubuntu)

```bash
sudo gpg -k
sudo gpg --no-default-keyring \
  --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] \
  https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Docker

```bash
docker run -i grafana/k6 run - <script.js
```

### Verify installation

```bash
k6 version
# k6 v0.54.0 (go1.22.5, linux/amd64)
```

---

## 3. Core Concepts

### Virtual Users (VUs)

A VU is a simulated user. Each VU runs your test script independently in a loop. Unlike threads in JMeter, k6 VUs are lightweight coroutines — you can run thousands of them on a modest machine.

### Iterations

One execution of the default function (or a named scenario function) by a single VU. A VU may complete many iterations over the course of a test.

### The test lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│  init  →  setup()  →  [VUs run default()]  →  teardown()        │
└─────────────────────────────────────────────────────────────────┘
```

| Stage        | Runs                      | Purpose                                     |
| ------------ | ------------------------- | ------------------------------------------- |
| `init`       | Once per VU               | Import modules, set options, load files     |
| `setup()`    | Once globally             | Seed test data, authenticate, prepare state |
| `default()`  | Once per iteration per VU | Your actual test logic                      |
| `teardown()` | Once globally             | Clean up resources                          |

### Think time

Real users don't hammer APIs without pause. Use `sleep()` to simulate human pacing between actions.

```js
import { sleep } from 'k6';

export default function () {
  // ...do something...
  sleep(2); // wait 2 seconds before next iteration
}
```

---

## 4. Writing Your First Test

```js
// hello-k6.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 concurrent virtual users
  duration: '30s', // run for 30 seconds
};

export default function () {
  const res = http.get('https://httpbin.org/get');

  check(res, {
    'status is 200': r => r.status === 200,
    'response time < 500ms': r => r.timings.duration < 500,
    'has body': r => r.body.length > 0,
  });

  sleep(1);
}
```

Run it:

```bash
k6 run hello-k6.js
```

### Reading the output

```
scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration
default: 10 looping VUs for 30s (gracefulStop: 30s)

✓ status is 200
✓ response time < 500ms
✓ has body

checks.........................: 100.00% ✓ 280 ✗ 0
data_received..................: 86 kB   2.9 kB/s
data_sent......................: 23 kB   773 B/s
http_req_blocked...............: avg=6.12ms  min=1µs    med=4µs    max=172ms  p(90)=10µs  p(95)=12µs
http_req_duration..............: avg=203ms   min=190ms  med=198ms  max=412ms  p(90)=223ms p(95)=248ms
http_req_failed................: 0.00%   ✓ 0 ✗ 280
iterations.....................: 280     9.33/s
vus............................: 10      min=10     max=10
```

---

## 5. Metrics, Checks & Thresholds

### Built-in HTTP metrics

| Metric                     | What it measures                       |
| -------------------------- | -------------------------------------- |
| `http_req_duration`        | Total round-trip time                  |
| `http_req_blocked`         | Time waiting for a TCP connection slot |
| `http_req_connecting`      | TCP handshake time                     |
| `http_req_tls_handshaking` | TLS negotiation time                   |
| `http_req_sending`         | Time to send the request body          |
| `http_req_waiting`         | Time-to-first-byte (TTFB)              |
| `http_req_receiving`       | Time to receive the response body      |
| `http_req_failed`          | Rate of failed requests                |
| `http_reqs`                | Total request count                    |

### Custom metrics

```js
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';

const errors = new Rate('custom_errors'); // % true values
const latency = new Trend('custom_latency', true); // ms distribution
const totalCalls = new Counter('custom_total_calls'); // cumulative count
const activeUsers = new Gauge('custom_active_users'); // current value
```

### Thresholds

Thresholds are pass/fail criteria. The entire test exits with a non-zero code if any threshold is breached — perfect for CI gates.

```js
export const options = {
  thresholds: {
    // 95% of requests must complete below 500ms
    http_req_duration: ['p(95)<500'],

    // 99% of requests for the checkout endpoint must be below 1s
    'http_req_duration{endpoint:checkout}': ['p(99)<1000'],

    // Error rate must stay below 1%
    http_req_failed: ['rate<0.01'],

    // All checks must pass at 99%+
    checks: ['rate>0.99'],

    // Custom metric threshold
    custom_errors: ['rate<0.005'],
  },
};
```

---

## 6. Scenarios & Executors

Scenarios let you define precisely how load is generated. Each scenario uses an **executor** to control VU and iteration behavior.

### Executor types at a glance

| Executor                | Controls                             | Use when                         |
| ----------------------- | ------------------------------------ | -------------------------------- |
| `constant-vus`          | Fixed VUs, fixed duration            | Simple steady-state load         |
| `ramping-vus`           | VUs change over stages               | Ramp-up / ramp-down patterns     |
| `constant-arrival-rate` | Fixed iterations/sec                 | Throughput-focused testing       |
| `ramping-arrival-rate`  | RPS changes over stages              | Variable throughput testing      |
| `per-vu-iterations`     | Each VU runs N iterations            | Functional verification at scale |
| `shared-iterations`     | N total iterations shared across VUs | Throughput with a fixed total    |

### Multi-scenario example

```js
export const options = {
  scenarios: {
    browse: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
      exec: 'browseScenario',
    },
    checkout: {
      executor: 'ramping-arrival-rate',
      startRate: 5,
      timeUnit: '1s',
      stages: [
        { duration: '2m', target: 20 },
        { duration: '3m', target: 20 },
      ],
      preAllocatedVUs: 30,
      maxVUs: 80,
      exec: 'checkoutScenario',
    },
  },
};

export function browseScenario() {
  /* ... */
}
export function checkoutScenario() {
  /* ... */
}
```

---

## 7. Case Study: ShopFlow E-Commerce Platform

### 7.1 System Overview

**ShopFlow** is an e-commerce platform with the following characteristics:

- **Frontend**: React SPA hosted on a CDN
- **Backend**: Node.js API behind an Nginx load balancer
- **Database**: PostgreSQL (primary) + Redis (cache)
- **Infrastructure**: 4 app servers, auto-scaling group (max 8)

#### The 4 API endpoints under test

| Endpoint                | Method | Description                  | Typical p95 |
| ----------------------- | ------ | ---------------------------- | ----------- |
| `GET /api/products`     | GET    | Product listing with filters | 120ms       |
| `GET /api/products/:id` | GET    | Single product detail        | 80ms        |
| `POST /api/cart/add`    | POST   | Add item to cart             | 150ms       |
| `POST /api/orders`      | POST   | Place an order (checkout)    | 400ms       |

#### Capacity baseline

The team has established through prior profiling that the system can handle approximately **50,000 requests per minute** under normal operating conditions. That works out to roughly **833 requests per second (RPS)**.

> **Is 50,000 RPM realistic?**  
> Yes, for a mid-size e-commerce platform with horizontal scaling. A single optimized Node.js instance can handle 1,000–5,000 RPM depending on the endpoint. With 4 servers and Redis caching product reads, 50,000 RPM is achievable for read-heavy workloads. Write-heavy flows (orders) will be a bottleneck much earlier — typically 5–15% of overall throughput.

#### Expected traffic distribution (real-world assumption)

| Endpoint              | % of traffic | Max RPM |
| --------------------- | ------------ | ------- |
| GET /api/products     | 50%          | 25,000  |
| GET /api/products/:id | 35%          | 17,500  |
| POST /api/cart/add    | 10%          | 5,000   |
| POST /api/orders      | 5%           | 2,500   |

#### Shared setup

All test files below share this base configuration:

```js
// shared/config.js
export const BASE_URL = 'https://api.shopflow.example.com';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Realistic product IDs and user tokens for the test environment
export const PRODUCT_IDS = [101, 205, 308, 412, 517, 623, 789, 834, 901, 999];
export const AUTH_TOKEN = __ENV.AUTH_TOKEN || 'test-token-abc123';
```

---

### 7.2 Smoke Test

**Goal**: Verify the system is alive and all 4 endpoints respond correctly before running any heavier tests. This is always the first test you run.

**Load profile**: 1–2 VUs, 2 minutes, no performance expectations — just correctness.

```js
// tests/01-smoke.js
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

export const options = {
  vus: 2,
  duration: '2m',

  thresholds: {
    // Smoke test: just prove nothing is broken — generous thresholds
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
  },

  tags: { test_type: 'smoke' },
};

const headers = {
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
};

export default function () {
  // ── 1. Product listing ────────────────────────────────────────────────
  group('GET /api/products', () => {
    const res = http.get(`${BASE_URL}/api/products?page=1&limit=20`, headers);

    check(res, {
      'products: status 200': r => r.status === 200,
      'products: returns array': r => {
        try {
          return Array.isArray(JSON.parse(r.body).data);
        } catch {
          return false;
        }
      },
      'products: has pagination': r => {
        try {
          return JSON.parse(r.body).meta !== undefined;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);

  // ── 2. Product detail ────────────────────────────────────────────────
  group('GET /api/products/:id', () => {
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    const res = http.get(`${BASE_URL}/api/products/${id}`, headers);

    check(res, {
      'product detail: status 200': r => r.status === 200,
      'product detail: has id': r => {
        try {
          return JSON.parse(r.body).id === id;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);

  // ── 3. Add to cart ───────────────────────────────────────────────────
  group('POST /api/cart/add', () => {
    const payload = JSON.stringify({
      productId: PRODUCT_IDS[0],
      quantity: 1,
    });
    const res = http.post(`${BASE_URL}/api/cart/add`, payload, headers);

    check(res, {
      'cart add: status 200 or 201': r => [200, 201].includes(r.status),
      'cart add: returns cart': r => {
        try {
          return JSON.parse(r.body).cartId !== undefined;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);

  // ── 4. Place order ───────────────────────────────────────────────────
  group('POST /api/orders', () => {
    const payload = JSON.stringify({
      items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
      address: { street: '123 Test St', city: 'Berlin', zip: '10115' },
      payment: { method: 'test_card', token: 'tok_test_visa' },
    });
    const res = http.post(`${BASE_URL}/api/orders`, payload, headers);

    check(res, {
      'order: status 201': r => r.status === 201,
      'order: returns order id': r => {
        try {
          return JSON.parse(r.body).orderId !== undefined;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(2);
}
```

**Expected outcome**: All checks pass, no errors. If the smoke test fails, there's no point running any other test.

---

### 7.3 Load Test

**Goal**: Simulate a typical busy day — not the peak, but normal operating load. Validate that response times and error rates stay within SLA targets under expected conditions.

**Load profile**:

- Ramp up over 5 minutes to 600 RPM (≈ 70% of capacity, a realistic busy hour)
- Hold for 20 minutes
- Ramp down over 5 minutes

> **Why 600 RPM?** Real traffic is not uniformly distributed. 50,000 RPM is the peak ceiling. A typical "busy hour" might be 40–50% of peak — around 20,000–25,000 RPM across all endpoints. For a focused API test targeting 4 endpoints, 600 RPM represents a realistic combined load from those specific routes.

```js
// tests/02-load.js
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

// ── Custom metrics ────────────────────────────────────────────────────────
const checkoutErrors = new Rate('checkout_error_rate');
const orderDuration = new Trend('order_duration_ms', true);

export const options = {
  scenarios: {
    // Product listing — 50% of traffic
    product_listing: {
      executor: 'constant-arrival-rate',
      rate: 300, // 300 iterations/min
      timeUnit: '1m',
      duration: '30m',
      preAllocatedVUs: 20,
      maxVUs: 50,
      exec: 'productListing',
      stages: [
        // Note: constant-arrival-rate doesn't support stages natively,
        // so we use ramping-arrival-rate for ramp-up
      ],
    },

    // Product detail — 35% of traffic
    product_detail: {
      executor: 'constant-arrival-rate',
      rate: 210,
      timeUnit: '1m',
      duration: '30m',
      preAllocatedVUs: 15,
      maxVUs: 40,
      exec: 'productDetail',
    },

    // Add to cart — 10% of traffic
    add_to_cart: {
      executor: 'constant-arrival-rate',
      rate: 60,
      timeUnit: '1m',
      duration: '30m',
      preAllocatedVUs: 10,
      maxVUs: 25,
      exec: 'addToCart',
    },

    // Checkout / orders — 5% of traffic (most expensive operation)
    checkout: {
      executor: 'constant-arrival-rate',
      rate: 30,
      timeUnit: '1m',
      duration: '30m',
      preAllocatedVUs: 10,
      maxVUs: 30,
      exec: 'placeOrder',
    },
  },

  thresholds: {
    // Overall response time SLAs
    'http_req_duration{endpoint:products}': ['p(95)<200', 'p(99)<500'],
    'http_req_duration{endpoint:product_detail}': ['p(95)<150', 'p(99)<300'],
    'http_req_duration{endpoint:cart}': ['p(95)<250', 'p(99)<500'],
    'http_req_duration{endpoint:orders}': ['p(95)<600', 'p(99)<1200'],

    // Error rates by endpoint
    'http_req_failed{endpoint:products}': ['rate<0.01'],
    'http_req_failed{endpoint:orders}': ['rate<0.005'], // stricter for checkout

    // Custom metric: checkout-specific error rate
    checkout_error_rate: ['rate<0.005'],
    order_duration_ms: ['p(95)<600'],

    // Global
    checks: ['rate>0.99'],
    http_req_failed: ['rate<0.01'],
  },

  tags: { test_type: 'load' },
};

const makeHeaders = endpoint => ({
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
  tags: { endpoint },
});

// ── Scenario functions ────────────────────────────────────────────────────

export function productListing() {
  const params = [
    'page=1&limit=20',
    'page=2&limit=20',
    'category=electronics&limit=20',
    'sort=price_asc&limit=20',
    'search=laptop&limit=10',
  ];
  const query = params[Math.floor(Math.random() * params.length)];
  const res = http.get(`${BASE_URL}/api/products?${query}`, makeHeaders('products'));

  check(res, {
    'listing: 200': r => r.status === 200,
    'listing: p95 < 200ms': r => r.timings.duration < 200,
  });

  sleep(0.1); // minimal think time for arrival-rate scenarios
}

export function productDetail() {
  const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
  const res = http.get(`${BASE_URL}/api/products/${id}`, makeHeaders('product_detail'));

  check(res, {
    'detail: 200': r => r.status === 200,
    'detail: p95 < 150ms': r => r.timings.duration < 150,
  });
}

export function addToCart() {
  const res = http.post(
    `${BASE_URL}/api/cart/add`,
    JSON.stringify({
      productId: PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)],
      quantity: Math.ceil(Math.random() * 3),
    }),
    makeHeaders('cart')
  );

  check(res, {
    'cart: 200 or 201': r => [200, 201].includes(r.status),
    'cart: p95 < 250ms': r => r.timings.duration < 250,
  });
}

export function placeOrder() {
  const res = http.post(
    `${BASE_URL}/api/orders`,
    JSON.stringify({
      items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
      address: { street: '456 Load St', city: 'Hamburg', zip: '20095' },
      payment: { method: 'test_card', token: 'tok_test_visa' },
    }),
    makeHeaders('orders')
  );

  const ok = check(res, {
    'order: 201': r => r.status === 201,
    'order: p95 < 600ms': r => r.timings.duration < 600,
  });

  checkoutErrors.add(!ok);
  orderDuration.add(res.timings.duration);
}
```

**What to look for in results**:

- All thresholds green [✓]
- p95 latencies within SLA
- No error rate spikes at any point during the hold phase
- Resource usage on your servers should plateau, not grow

---

### 7.4 Stress Test

**Goal**: Push past normal load, step by step, to find where the system starts degrading. Unlike the breakpoint test (which seeks the cliff edge), the stress test aims to characterize degradation — at what load does p95 start climbing? When do errors appear?

**Load profile**: 6 stages ramping from 20% to 200% of normal capacity, holding 5 minutes at each level.

```js
// tests/03-stress.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

const errorRate = new Rate('stress_error_rate');

export const options = {
  // We use ramping-vus here to see how the system copes as concurrency grows.
  // Target VU counts are calibrated so that each VU generates ~1 req/s with sleep(1),
  // giving us approximate RPM figures at each stage.
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        // Stage 1: 20% capacity (~10,000 RPM)
        { duration: '3m', target: 167 }, // ramp up
        { duration: '5m', target: 167 }, // hold

        // Stage 2: 50% capacity (~25,000 RPM)
        { duration: '3m', target: 417 },
        { duration: '5m', target: 417 },

        // Stage 3: 80% capacity (~40,000 RPM) — approaching limit
        { duration: '3m', target: 667 },
        { duration: '5m', target: 667 },

        // Stage 4: 100% capacity (~50,000 RPM) — at the limit
        { duration: '3m', target: 833 },
        { duration: '5m', target: 833 },

        // Stage 5: 150% capacity — deliberate overload
        { duration: '3m', target: 1250 },
        { duration: '5m', target: 1250 },

        // Stage 6: 200% capacity — how bad does it get?
        { duration: '3m', target: 1667 },
        { duration: '5m', target: 1667 },

        // Recovery: ramp down, check if system recovers
        { duration: '5m', target: 167 },
        { duration: '3m', target: 0 },
      ],
      gracefulRampDown: '2m',
    },
  },

  thresholds: {
    // For stress tests, thresholds are OBSERVATIONS not hard pass/fail.
    // We set them high so the test completes and we get full data.
    http_req_duration: ['p(95)<5000'], // warn if p95 > 5s (extreme degradation)
    http_req_failed: ['rate<0.5'], // only fail if >50% errors (total meltdown)
    stress_error_rate: ['rate<0.5'],
  },

  tags: { test_type: 'stress' },
};

const headers = {
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
};

export default function () {
  // Mix of all endpoints, weighted by traffic distribution
  const rand = Math.random();

  if (rand < 0.5) {
    // 50%: product listing
    const res = http.get(`${BASE_URL}/api/products?page=1&limit=20`, {
      ...headers,
      tags: { endpoint: 'products' },
    });
    const ok = check(res, { 'products: 200': r => r.status === 200 });
    errorRate.add(!ok);
  } else if (rand < 0.85) {
    // 35%: product detail
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    const res = http.get(`${BASE_URL}/api/products/${id}`, {
      ...headers,
      tags: { endpoint: 'product_detail' },
    });
    const ok = check(res, { 'detail: 200': r => r.status === 200 });
    errorRate.add(!ok);
  } else if (rand < 0.95) {
    // 10%: add to cart
    const res = http.post(
      `${BASE_URL}/api/cart/add`,
      JSON.stringify({ productId: PRODUCT_IDS[0], quantity: 1 }),
      { ...headers, tags: { endpoint: 'cart' } }
    );
    const ok = check(res, { 'cart: 2xx': r => r.status < 300 });
    errorRate.add(!ok);
  } else {
    // 5%: checkout
    const res = http.post(
      `${BASE_URL}/api/orders`,
      JSON.stringify({
        items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
        address: { street: '789 Stress Ave', city: 'Munich', zip: '80331' },
        payment: { method: 'test_card', token: 'tok_test_visa' },
      }),
      { ...headers, tags: { endpoint: 'orders' } }
    );
    const ok = check(res, { 'order: 201': r => r.status === 201 });
    errorRate.add(!ok);
  }

  sleep(1);
}
```

**What to look for**:

- At which stage does p95 latency start climbing noticeably? (e.g., "crosses 500ms at stage 4")
- At which stage do errors first appear?
- Does the system recover when load drops back down at the end?
- Watch your server metrics alongside k6 — CPU/memory/connection pool exhaustion tells you _why_ it's failing

---

### 7.5 Spike Test

**Goal**: Simulate a flash sale, a viral moment, or a bot attack — a sudden 10× traffic burst that lasts minutes before returning to normal. This tests autoscaling response time and connection pool resilience.

**Scenario**: ShopFlow is launching a flash sale at 12:00. Traffic is expected to jump from 5,000 RPM to 50,000 RPM within 60 seconds.

```js
// tests/04-spike.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

const spikeErrors = new Rate('spike_error_rate');
const recoveryLatency = new Trend('recovery_latency_ms', true);
let spikeStarted = false;

export const options = {
  scenarios: {
    spike: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        // Pre-spike baseline: ~5,000 RPM (83 VUs × ~1 req/s)
        { duration: '2m', target: 83 }, // ramp up to baseline
        { duration: '3m', target: 83 }, // hold baseline

        // THE SPIKE: jump to ~50,000 RPM in 60 seconds
        { duration: '1m', target: 833 }, // flash sale starts!

        // Hold the spike for 5 minutes
        { duration: '5m', target: 833 },

        // Spike subsides: back to baseline
        { duration: '1m', target: 83 },

        // Confirm recovery: hold baseline again
        { duration: '5m', target: 83 },

        // Ramp down
        { duration: '2m', target: 0 },
      ],
      gracefulRampDown: '1m',
    },
  },

  thresholds: {
    // During spike, we accept degradation — but track it
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.10'], // accept up to 10% errors during spike
    spike_error_rate: ['rate<0.10'],

    // After the spike (recovery phase), errors must drop back to normal
    // Tag requests in recovery phase with { phase: "recovery" }
    'http_req_failed{phase:recovery}': ['rate<0.01'],
    'http_req_duration{phase:recovery}': ['p(95)<500'],
  },

  tags: { test_type: 'spike' },
};

const baseHeaders = {
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
};

export default function () {
  // Determine if we're in the recovery phase (after the spike drops)
  // VU count is controlled by the stage; we tag based on current time
  // In a real test you'd track elapsed time with Date.now()
  const phase = __VU <= 83 && spikeStarted ? 'recovery' : 'spike';

  const headers = {
    ...baseHeaders,
    tags: { phase },
  };

  // During a spike/flash sale, product detail and cart are hammered most
  const rand = Math.random();

  if (rand < 0.6) {
    // 60% product listing (everyone browsing the sale)
    const res = http.get(`${BASE_URL}/api/products?category=sale&limit=20`, {
      ...headers,
      tags: { ...headers.tags, endpoint: 'products' },
    });
    const ok = check(res, {
      'spike products: responded': r => r.status !== 0,
      'spike products: not 5xx': r => r.status < 500,
      'spike products: acceptable ms': r => r.timings.duration < 3000,
    });
    spikeErrors.add(!ok);
    if (phase === 'recovery') recoveryLatency.add(res.timings.duration);
  } else if (rand < 0.85) {
    // 25% product detail
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    const res = http.get(`${BASE_URL}/api/products/${id}`, {
      ...headers,
      tags: { ...headers.tags, endpoint: 'product_detail' },
    });
    const ok = check(res, { 'spike detail: not 5xx': r => r.status < 500 });
    spikeErrors.add(!ok);
  } else if (rand < 0.97) {
    // 12% add to cart (flash sale adding items quickly)
    const res = http.post(
      `${BASE_URL}/api/cart/add`,
      JSON.stringify({ productId: PRODUCT_IDS[0], quantity: 1 }),
      { ...headers, tags: { ...headers.tags, endpoint: 'cart' } }
    );
    const ok = check(res, {
      'spike cart: responded': r => r.status !== 0,
      'spike cart: not 5xx': r => r.status < 500,
    });
    spikeErrors.add(!ok);
  } else {
    // 3% orders
    const res = http.post(
      `${BASE_URL}/api/orders`,
      JSON.stringify({
        items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
        address: { street: '1 Spike Rd', city: 'Frankfurt', zip: '60311' },
        payment: { method: 'test_card', token: 'tok_test_visa' },
      }),
      { ...headers, tags: { ...headers.tags, endpoint: 'orders' } }
    );
    const ok = check(res, { 'spike order: responded': r => r.status !== 0 });
    spikeErrors.add(!ok);
  }

  // Flash sale users have very short think time — they're rushing!
  sleep(Math.random() * 0.5);
}
```

**What to look for**:

- How long does it take for errors to appear after the spike? (measures queue depth and buffer)
- Does the error rate drop back to <1% within 2 minutes of returning to baseline? (measures recovery)
- Are there any 503/504 responses? (load balancer rejecting connections = capacity problem)
- Check your autoscaling logs — did new servers spin up, and did they spin up fast enough?

---

### 7.6 Soak / Endurance Test

**Goal**: Run a moderate load for 4+ hours to catch problems that only emerge over time: memory leaks, connection pool exhaustion, database connection drift, cache eviction issues, log files filling disks.

**Load profile**: 70% of normal capacity (~35,000 RPM) held for 4 hours.

```js
// tests/05-soak.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

const errorRate = new Rate('soak_error_rate');
const p95OverTime = new Trend('p95_trend_ms', true);
const totalOrders = new Counter('total_orders_placed');

export const options = {
  scenarios: {
    soak: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10m', target: 583 }, // ramp up to ~35,000 RPM (70% capacity)
        { duration: '4h', target: 583 }, // hold for 4 hours
        { duration: '10m', target: 0 }, // ramp down
      ],
      gracefulRampDown: '5m',
    },
  },

  thresholds: {
    // During a soak test, the TREND matters as much as absolute values.
    // If p95 starts at 150ms and drifts to 600ms by hour 4, that's a memory leak.
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    soak_error_rate: ['rate<0.01'],
    checks: ['rate>0.99'],
  },

  tags: { test_type: 'soak' },
};

const headers = {
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
};

export default function () {
  const rand = Math.random();
  let res;

  if (rand < 0.5) {
    res = http.get(`${BASE_URL}/api/products?page=${Math.ceil(Math.random() * 5)}&limit=20`, {
      ...headers,
      tags: { endpoint: 'products' },
    });
    check(res, { 'soak products: 200': r => r.status === 200 });
  } else if (rand < 0.85) {
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    res = http.get(`${BASE_URL}/api/products/${id}`, {
      ...headers,
      tags: { endpoint: 'product_detail' },
    });
    check(res, { 'soak detail: 200': r => r.status === 200 });
  } else if (rand < 0.95) {
    res = http.post(
      `${BASE_URL}/api/cart/add`,
      JSON.stringify({ productId: PRODUCT_IDS[0], quantity: 1 }),
      { ...headers, tags: { endpoint: 'cart' } }
    );
    check(res, { 'soak cart: 2xx': r => r.status < 300 });
  } else {
    res = http.post(
      `${BASE_URL}/api/orders`,
      JSON.stringify({
        items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
        address: { street: '99 Soak Blvd', city: 'Cologne', zip: '50667' },
        payment: { method: 'test_card', token: 'tok_test_visa' },
      }),
      { ...headers, tags: { endpoint: 'orders' } }
    );
    const ok = check(res, { 'soak order: 201': r => r.status === 201 });
    if (ok) totalOrders.add(1);
  }

  // Track p95 trend — export to Grafana and plot over time to spot drift
  if (res) {
    p95OverTime.add(res.timings.duration);
    errorRate.add(res.status >= 500);
  }

  sleep(1);
}
```

**What to look for**:

- Export metrics to InfluxDB + Grafana and plot p95 over time as a line chart
- Any upward trend in latency, even gradual, indicates resource leak
- Memory usage on servers — should plateau, not grow linearly
- Database connection pool — watch for `too many connections` errors
- Disk usage — application logs can fill a disk in hours under sustained load

**Tip**: Instrument your servers with Prometheus node-exporter alongside k6. The combination tells you the full story.

---

### 7.7 Breakpoint Test

**Goal**: Find the exact ceiling. Increase RPS methodically until the system fails, noting the precise point of failure and how it fails (errors? timeouts? dropped connections?).

**Load profile**: Start at 100 RPS, add 50 RPS every 2 minutes until collapse.

```js
// tests/06-breakpoint.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { BASE_URL, defaultHeaders, PRODUCT_IDS, AUTH_TOKEN } from '../shared/config.js';

const errorRate = new Rate('breakpoint_error_rate');

export const options = {
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate', // arrival rate = real RPS, not affected by response time
      startRate: 100, // start at 100 RPS
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 2000,
      stages: [
        // Add 50 RPS every 2 minutes — methodical ramp
        { duration: '2m', target: 150 },
        { duration: '2m', target: 200 },
        { duration: '2m', target: 250 },
        { duration: '2m', target: 300 }, // 18,000 RPM
        { duration: '2m', target: 350 },
        { duration: '2m', target: 400 },
        { duration: '2m', target: 450 },
        { duration: '2m', target: 500 }, // 30,000 RPM — approaching limit
        { duration: '2m', target: 600 },
        { duration: '2m', target: 700 },
        { duration: '2m', target: 833 }, // 50,000 RPM — the stated limit
        { duration: '2m', target: 1000 }, // pushing past
        { duration: '2m', target: 1200 }, // well past — expect failures
      ],
    },
  },

  thresholds: {
    // DO NOT set strict thresholds here — we WANT to find the failure point.
    // Setting these high just ensures the test runs to completion.
    http_req_duration: ['p(95)<30000'], // 30s max — extreme degradation allowed
    http_req_failed: ['rate<0.95'], // only stop if 95%+ requests fail
  },

  tags: { test_type: 'breakpoint' },
};

const headers = {
  headers: { ...defaultHeaders, Authorization: `Bearer ${AUTH_TOKEN}` },
};

export default function () {
  // For breakpoint tests, focus on the most critical + most frequent endpoints
  const rand = Math.random();

  if (rand < 0.7) {
    const res = http.get(`${BASE_URL}/api/products?limit=20`, {
      ...headers,
      tags: { endpoint: 'products' },
    });
    const ok = check(res, { 'bp products: not 5xx': r => r.status < 500 });
    errorRate.add(!ok);
  } else if (rand < 0.95) {
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    const res = http.get(`${BASE_URL}/api/products/${id}`, {
      ...headers,
      tags: { endpoint: 'product_detail' },
    });
    const ok = check(res, { 'bp detail: not 5xx': r => r.status < 500 });
    errorRate.add(!ok);
  } else {
    const res = http.post(
      `${BASE_URL}/api/orders`,
      JSON.stringify({
        items: [{ productId: PRODUCT_IDS[0], quantity: 1 }],
        address: { street: '0 Break Point', city: 'Stuttgart', zip: '70173' },
        payment: { method: 'test_card', token: 'tok_test_visa' },
      }),
      { ...headers, tags: { endpoint: 'orders' } }
    );
    const ok = check(res, { 'bp order: responded': r => r.status !== 0 });
    errorRate.add(!ok);
  }
}

// Arrival rate scenarios don't need sleep() — the executor controls the rate
```

**What to look for**:

- The exact RPS stage where error rate crosses 1% — that's your true capacity
- The response time curve: a sudden vertical jump in p95 indicates saturation
- Which errors appear first: timeouts (slow), 503s (load balancer rejecting), or 500s (app crashing)
- The "knee of the curve" — the RPS at which latency starts climbing non-linearly

---

## 8. Interpreting Results

### Key percentiles explained

| Percentile     | Meaning                                    |
| -------------- | ------------------------------------------ |
| p(50) / median | Half your users experience this or better  |
| p(90)          | 9 in 10 users experience this or better    |
| p(95)          | Industry standard SLA target               |
| p(99)          | "Worst realistic case" — outliers excluded |
| max            | Single worst request — often noise/outlier |

> Always tune to p(95) or p(99), never to the average. Averages hide tail latency.

### Reading the standard output

```
http_req_duration..............: avg=203ms min=12ms med=180ms max=4120ms p(90)=310ms p(95)=420ms p(99)=980ms
```

This tells you: typical users get ~180ms, but 5% of users wait over 420ms, and 1% wait nearly a second. The max of 4.1s is an outlier — possibly a garbage collection pause or cold cache hit.

### Common failure signatures

| Symptom                                 | Likely cause                                   |
| --------------------------------------- | ---------------------------------------------- |
| Error rate spikes sharply then recovers | Queue overflow — requests backed up, then shed |
| Latency drifts up slowly over hours     | Memory leak or cache filling                   |
| 503 errors from load balancer           | Backend servers at connection limit            |
| `http_req_blocked` time spikes          | TCP connection pool exhausted                  |
| Errors concentrated on POST endpoints   | Database write bottleneck                      |
| Errors on all endpoints simultaneously  | Shared resource exhaustion (DB, Redis)         |

---

## 9. CI/CD Integration

### GitHub Actions example

```yaml
# .github/workflows/load-test.yml
name: Load Test

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1' # every Monday at 2 AM

jobs:
  smoke-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install k6
        run: |
          sudo gpg --no-default-keyring \
            --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
            --keyserver hkp://keyserver.ubuntu.com:80 \
            --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
          echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] \
            https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update && sudo apt-get install k6

      - name: Run smoke test
        env:
          AUTH_TOKEN: ${{ secrets.TEST_AUTH_TOKEN }}
          ENVIRONMENT: staging
        run: k6 run tests/01-smoke.js --out json=results/smoke.json

      - name: Upload results
        uses: actions/upload-artifact@v4
        with:
          name: k6-smoke-results
          path: results/

  load-test:
    runs-on: ubuntu-latest
    needs: smoke-test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Run load test
        env:
          AUTH_TOKEN: ${{ secrets.TEST_AUTH_TOKEN }}
        run: k6 run tests/02-load.js
```

### Sending results to Grafana Cloud k6

```bash
# Set your Grafana Cloud credentials
export K6_CLOUD_TOKEN="your-grafana-cloud-token"
export K6_CLOUD_PROJECT_ID="12345"

# Run and stream results to Grafana
k6 run --out cloud tests/02-load.js
```

### Streaming to InfluxDB + Grafana (self-hosted)

```bash
# Start InfluxDB and Grafana via Docker
docker-compose up -d influxdb grafana

# Run with InfluxDB output
k6 run --out influxdb=http://localhost:8086/k6 tests/02-load.js
```

```yaml
# docker-compose.yml
version: '3'
services:
  influxdb:
    image: influxdb:1.8
    ports: ['8086:8086']
    environment:
      INFLUXDB_DB: k6
  grafana:
    image: grafana/grafana:latest
    ports: ['3000:3000']
    environment:
      GF_AUTH_ANONYMOUS_ENABLED: 'true'
```

Import the official k6 Grafana dashboard (ID: **2587**) from grafana.com for instant visualization.

---

## 10. Best Practices & Common Mistakes

### Do's

**Use arrival-rate executors for throughput accuracy.** `ramping-vus` measures concurrency; `ramping-arrival-rate` measures actual RPS. For realistic load simulation, arrival rate is almost always more accurate because it decouples "how many users" from "how fast the server responds."

**Add think time.** Real users pause between actions. Without `sleep()`, your VUs hammer the server at maximum speed and your test represents a pathological worst case, not reality.

**Tag everything.** Apply `tags` to requests so you can filter metrics by endpoint, scenario, or user flow in your results dashboard.

**Run tests from multiple regions.** For global services, latency from a single source is misleading. Use Grafana Cloud k6 or distributed k6 runners in different regions.

**Always run a smoke test first.** A 2-minute smoke test before a 4-hour soak test will save you from finding out at hour 3 that a misconfigured auth header caused 100% failures.

**Test against a production-like environment.** Staging with 1/10th the database size will give you 1/10th the insight. Try to match production data volume at minimum.

### Don't's

**Don't test production directly** unless you have no other choice. Use a dedicated performance environment. If you must test production, use `smoke` or minimal `load` scenarios only.

**Don't use `max` as your SLA target.** The maximum response time is often an outlier — a GC pause, a cold cache, a network blip. p(95) or p(99) is far more meaningful.

**Don't ignore the `http_req_blocked` metric.** High `blocked` times mean your test machine (or the server) is running out of TCP connection slots. This is a test infrastructure problem, not an application problem.

**Don't run load tests without server-side monitoring.** k6 tells you _what_ the system does from the outside. Prometheus, Datadog, or CloudWatch tells you _why_. You need both.

**Don't correlate VU count with users 1:1.** A VU that makes a request every second is not a "user making one request per second" — it's far more aggressive because real users spend time reading, clicking, and thinking. 1 VU ≈ many real users in most scenarios.

### Capacity planning rule of thumb for ShopFlow

| Load type   | Target RPS   | VUs (with 1s think time) | Test duration |
| ----------- | ------------ | ------------------------ | ------------- |
| Smoke       | 2            | 2                        | 2 min         |
| Normal load | 500          | 500                      | 30 min        |
| Peak load   | 833          | 833                      | 30 min        |
| Stress      | Up to 1,667  | Up to 1,667              | 50 min        |
| Spike peak  | 833 (sudden) | 833                      | 15 min        |
| Soak        | 583          | 583                      | 4+ hours      |
| Breakpoint  | 100 → 1,200  | auto                     | 26 min        |

---

_Built with k6 v0.54+ · Last updated February 2026_
