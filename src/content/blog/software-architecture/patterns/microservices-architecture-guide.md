---
title: "Production-Ready Microservices: Complete Setup Guide for Engineering Leads"
slug: "production-ready-microservices-setup-guide"
description: "A complete, opinionated checklist for engineering leads and architects to establish a production-ready microservice architecture — covering planning, infrastructure, CI/CD, security, observability, reliability, developer experience, and governance."
excerpt: "Setting up microservices for production requires more than splitting a monolith. This guide walks engineering leads through all 43 steps across 9 phases — from domain decomposition to compliance."
publishedAt: "2026-02-16"
updatedAt: "2026-02-16"
category: "software-architecture"
subcategory: "microservices"
tags: ["microservices", "production-engineering", "kubernetes", "ci-cd", "infrastructure-as-code", "observability", "devops", "platform-engineering", "security", "distributed-systems"]
author: "Headless Engineer"
readingTime: 22
seo:
  metaTitle: "Production-Ready Microservices Setup Guide - 43-Step Checklist for Architects"
  metaDescription: "Complete microservices setup checklist for engineering leads. 43 steps across 9 phases covering IaC, Kubernetes, CI/CD, security, observability, and developer experience."
  keywords: ["production microservices", "microservices architecture setup", "kubernetes production", "microservices checklist", "platform engineering", "service mesh", "gitops", "microservices security", "distributed systems observability"]
  canonicalUrl: "/blog/software-architecture/microservices/production-ready-microservices-setup-guide"
  ogImage: "/images/blog/production-microservices-setup-og.jpg"
---

# Microservices Architecture: Design Patterns and Best Practices

Microservices architecture has revolutionized how we build and deploy large-scale applications. By decomposing monolithic applications into smaller, independent services, organizations can achieve greater scalability, maintainability, and team autonomy.

## What are Microservices?

Microservices are an architectural approach where applications are built as a collection of loosely coupled, independently deployable services that communicate over well-defined APIs.

### Key Characteristics

- **Single Responsibility**: Each service focuses on one business capability
- **Decentralized**: Services manage their own data and business logic
- **Independent Deployment**: Services can be deployed independently
- **Technology Agnostic**: Different services can use different technologies
- **Fault Isolation**: Failure in one service doesn't bring down the entire system

## Core Design Patterns

### 1. Database per Service Pattern

Each microservice owns its data and database schema.

```typescript
// User Service - Owns user data
class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    // User service manages its own database
    return await this.userRepository.save(userData);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}

// Order Service - Owns order data
class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userServiceClient: UserServiceClient
  ) {}

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    // Verify user exists via API call, not direct database access
    const user = await this.userServiceClient.getUser(orderData.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.orderRepository.save(orderData);
  }
}
```

### 2. API Gateway Pattern

Single entry point for all client requests, routing to appropriate services.

```typescript
// API Gateway Implementation
class APIGateway {
  constructor(
    private userService: UserServiceClient,
    private orderService: OrderServiceClient,
    private authService: AuthServiceClient
  ) {}

  async handleRequest(request: GatewayRequest): Promise<GatewayResponse> {
    // Authentication
    const token = request.headers.authorization;
    const user = await this.authService.validateToken(token);
    
    if (!user) {
      return { statusCode: 401, body: { error: 'Unauthorized' } };
    }

    // Route to appropriate service
    switch (request.path) {
      case '/users':
        return await this.routeToUserService(request, user);
      case '/orders':
        return await this.routeToOrderService(request, user);
      default:
        return { statusCode: 404, body: { error: 'Not found' } };
    }
  }

  private async routeToUserService(
    request: GatewayRequest, 
    user: User
  ): Promise<GatewayResponse> {
    try {
      const result = await this.userService.handleRequest({
        ...request,
        user
      });
      return { statusCode: 200, body: result };
    } catch (error) {
      return { statusCode: 500, body: { error: error.message } };
    }
  }
}
```

### 3. Service Discovery Pattern

Services dynamically discover and communicate with each other.

```typescript
// Service Registry
class ServiceRegistry {
  private services = new Map<string, ServiceInstance[]>();

  register(serviceName: string, instance: ServiceInstance): void {
    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, []);
    }
    this.services.get(serviceName)!.push(instance);
  }

  discover(serviceName: string): ServiceInstance[] {
    return this.services.get(serviceName) || [];
  }

  healthCheck(): void {
    // Remove unhealthy instances
    for (const [serviceName, instances] of this.services) {
      const healthyInstances = instances.filter(instance => 
        this.isHealthy(instance)
      );
      this.services.set(serviceName, healthyInstances);
    }
  }

  private isHealthy(instance: ServiceInstance): boolean {
    // Health check implementation
    return true; // Simplified
  }
}

// Service Client with Discovery
class UserServiceClient {
  constructor(
    private serviceRegistry: ServiceRegistry,
    private loadBalancer: LoadBalancer
  ) {}

  async getUser(userId: string): Promise<User> {
    const instances = this.serviceRegistry.discover('user-service');
    const instance = this.loadBalancer.selectInstance(instances);
    
    const response = await fetch(`${instance.url}/users/${userId}`);
    return await response.json();
  }
}
```

### 4. Circuit Breaker Pattern

Prevents cascading failures by monitoring service health.

```typescript
class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold = 5;
  private readonly timeout = 60000; // 1 minute

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage in service client
class OrderServiceClient {
  private circuitBreaker = new CircuitBreaker();

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return await this.circuitBreaker.execute(async () => {
      const response = await fetch('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    });
  }
}
```

### 5. Event-Driven Architecture

Services communicate through asynchronous events.

```typescript
// Event Bus Interface
interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventType: string, handler: EventHandler): void;
}

// Domain Events
class UserCreatedEvent implements DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly timestamp: Date = new Date()
  ) {}
}

class OrderCreatedEvent implements DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly timestamp: Date = new Date()
  ) {}
}

// User Service - Publisher
class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventBus: EventBus
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    const user = await this.userRepository.save(userData);
    
    // Publish event
    await this.eventBus.publish(
      new UserCreatedEvent(user.id, user.email)
    );
    
    return user;
  }
}

// Email Service - Subscriber
class EmailService {
  constructor(private eventBus: EventBus) {
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.eventBus.subscribe('UserCreated', async (event: UserCreatedEvent) => {
      await this.sendWelcomeEmail(event.email);
    });

    this.eventBus.subscribe('OrderCreated', async (event: OrderCreatedEvent) => {
      await this.sendOrderConfirmation(event.userId, event.orderId);
    });
  }

  private async sendWelcomeEmail(email: string): Promise<void> {
    // Send welcome email
    console.log(`Sending welcome email to ${email}`);
  }

  private async sendOrderConfirmation(userId: string, orderId: string): Promise<void> {
    // Send order confirmation
    console.log(`Sending order confirmation for ${orderId} to user ${userId}`);
  }
}
```

## Data Management Patterns

### 1. Saga Pattern

Manages distributed transactions across multiple services.

```typescript
// Saga Orchestrator
class OrderSaga {
  constructor(
    private paymentService: PaymentServiceClient,
    private inventoryService: InventoryServiceClient,
    private shippingService: ShippingServiceClient
  ) {}

  async processOrder(order: Order): Promise<void> {
    const sagaId = generateSagaId();
    
    try {
      // Step 1: Reserve inventory
      await this.inventoryService.reserveItems(order.items, sagaId);
      
      // Step 2: Process payment
      const payment = await this.paymentService.processPayment(
        order.amount, 
        order.paymentMethod, 
        sagaId
      );
      
      // Step 3: Arrange shipping
      await this.shippingService.scheduleShipping(
        order.shippingAddress, 
        order.items, 
        sagaId
      );
      
      // All steps successful - complete saga
      await this.completeSaga(sagaId);
      
    } catch (error) {
      // Compensate for any completed steps
      await this.compensate(sagaId, error);
      throw error;
    }
  }

  private async compensate(sagaId: string, error: Error): Promise<void> {
    // Reverse operations in opposite order
    try {
      await this.shippingService.cancelShipping(sagaId);
    } catch (e) {
      console.error('Failed to cancel shipping:', e);
    }

    try {
      await this.paymentService.refundPayment(sagaId);
    } catch (e) {
      console.error('Failed to refund payment:', e);
    }

    try {
      await this.inventoryService.releaseReservation(sagaId);
    } catch (e) {
      console.error('Failed to release inventory:', e);
    }
  }
}
```

### 2. CQRS (Command Query Responsibility Segregation)

Separate read and write operations for better scalability.

```typescript
// Command Side - Write Operations
class UserCommandService {
  constructor(private userRepository: UserRepository) {}

  async createUser(command: CreateUserCommand): Promise<void> {
    const user = new User(command.name, command.email);
    await this.userRepository.save(user);
    
    // Publish event for read side
    await this.eventBus.publish(new UserCreatedEvent(user));
  }

  async updateUser(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId);
    user.updateProfile(command.name, command.email);
    await this.userRepository.save(user);
    
    await this.eventBus.publish(new UserUpdatedEvent(user));
  }
}

// Query Side - Read Operations
class UserQueryService {
  constructor(private userReadRepository: UserReadRepository) {}

  async getUserById(userId: string): Promise<UserView> {
    return await this.userReadRepository.findById(userId);
  }

  async searchUsers(criteria: SearchCriteria): Promise<UserView[]> {
    return await this.userReadRepository.search(criteria);
  }
}

// Read Model Projector
class UserProjector {
  constructor(
    private userReadRepository: UserReadRepository,
    private eventBus: EventBus
  ) {
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.eventBus.subscribe('UserCreated', async (event: UserCreatedEvent) => {
      const userView = new UserView(
        event.userId,
        event.name,
        event.email,
        event.createdAt
      );
      await this.userReadRepository.save(userView);
    });
  }
}
```

## Deployment and Operations

### 1. Containerization with Docker

```dockerfile
# User Service Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

### 2. Kubernetes Deployment

```yaml
# user-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: user-service-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

## Monitoring and Observability

### 1. Distributed Tracing

```typescript
// Tracing with OpenTelemetry
import { trace, context } from '@opentelemetry/api';

class UserService {
  private tracer = trace.getTracer('user-service');

  async createUser(userData: CreateUserRequest): Promise<User> {
    return await this.tracer.startActiveSpan('createUser', async (span) => {
      try {
        span.setAttributes({
          'user.email': userData.email,
          'operation': 'create'
        });

        const user = await this.userRepository.save(userData);
        
        span.setStatus({ code: SpanStatusCode.OK });
        return user;
      } catch (error) {
        span.recordException(error);
        span.setStatus({ 
          code: SpanStatusCode.ERROR, 
          message: error.message 
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }
}
```

### 2. Metrics Collection

```typescript
// Prometheus metrics
import { register, Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route']
});

// Middleware for Express
function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
      
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path)
      .observe(duration);
  });
  
  next();
}
```

## Best Practices

### 1. Service Boundaries
- Align with business capabilities
- Minimize cross-service transactions
- Ensure services can evolve independently

### 2. Data Consistency
- Embrace eventual consistency
- Use event sourcing for audit trails
- Implement compensation patterns

### 3. Security
- Implement service-to-service authentication
- Use API gateways for external access
- Encrypt sensitive data in transit and at rest

### 4. Testing Strategy
```typescript
// Contract Testing with Pact
describe('User Service Contract', () => {
  it('should return user data when user exists', async () => {
    const interaction = {
      state: 'user exists',
      uponReceiving: 'a request for user data',
      withRequest: {
        method: 'GET',
        path: '/users/123'
      },
      willRespondWith: {
        status: 200,
        body: {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    };

    await provider.addInteraction(interaction);
    
    const userService = new UserServiceClient(provider.mockService.baseUrl);
    const user = await userService.getUser('123');
    
    expect(user.name).toBe('John Doe');
  });
});
```

## Common Pitfalls

### 1. Distributed Monolith
Creating too many fine-grained services that are tightly coupled.

### 2. Data Inconsistency
Not properly handling eventual consistency and distributed transactions.

### 3. Network Complexity
Underestimating the complexity of network communication and failure modes.

### 4. Operational Overhead
Not investing enough in monitoring, logging, and deployment automation.

## When to Use Microservices

### Good Fit
- Large, complex applications
- Multiple development teams
- Different scalability requirements
- Technology diversity needs

### Poor Fit
- Small applications
- Simple CRUD operations
- Single development team
- Tight coupling requirements

## Conclusion

Microservices architecture offers significant benefits for large-scale, complex applications but comes with increased operational complexity. Success requires careful service design, robust infrastructure, and strong DevOps practices.

Remember: **Start with a monolith and evolve to microservices when the benefits clearly outweigh the costs.**

## Further Reading

- [Building Microservices by Sam Newman](https://example.com)
- [Microservices Patterns by Chris Richardson](https://example.com)
- [Distributed Systems Patterns](https://example.com)
- [Event Storming Guide](https://example.com)
