# CreatorHub - African Content Creator Marketplace

A monorepo-based platform connecting African content creators with brands and businesses.

## 🚀 Features

- **Creator Marketplace**: Browse and hire content creators by niche, location, and engagement
- **Social Media Integration**: Automatic syncing of follower counts and engagement rates from Facebook, Instagram, YouTube, and Twitter
- **Project Management**: Full lifecycle management from hiring to payment
- **Secure Payments**: Multi-gateway support (Flutterwave, Paystack, Stripe) with escrow
- **Real-time Messaging**: WebSocket-based chat between creators and brands
- **Analytics Dashboard**: Comprehensive insights for both creators and brands
- **Mobile-First Design**: Progressive Web App with offline capabilities

## 📁 Project Structure

```
creatorhub/
├── apps/
│   ├── web/              # Next.js web application (PWA)
│   ├── admin/            # Admin dashboard
│   └── api/              # Main NestJS API gateway
├── services/
│   ├── auth-service/     # Authentication microservice
│   ├── payment-service/  # Payment processing
│   ├── notification-service/
│   ├── analytics-service/
│   ├── search-service/
│   └── social-sync-service/
├── packages/
│   ├── ui/               # Shared UI components
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── database/         # Database schemas
│   ├── validation/       # Validation schemas
│   └── constants/        # Shared constants
└── infrastructure/
    ├── terraform/        # Infrastructure as Code
    ├── kubernetes/       # K8s manifests
    └── docker/           # Dockerfiles
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + React Query
- **Real-time**: Socket.io Client

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Architecture**: Microservices
- **API**: RESTful + GraphQL (optional)
- **Real-time**: Socket.io

### Databases
- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Search**: Elasticsearch 8
- **Messages**: MongoDB 5

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Cloud**: AWS / Google Cloud
- **IaC**: Terraform

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/creatorhub.git
cd creatorhub
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start infrastructure services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MongoDB (port 27017)
- Elasticsearch (port 9200)
- RabbitMQ (port 5672, management: 15672)
- MinIO (port 9000, console: 9001)
- Mailhog (SMTP: 1025, UI: 8025)

### 5. Run database migrations

```bash
pnpm run db:migrate
```

### 6. Seed the database (optional)

```bash
pnpm run db:seed
```

### 7. Start development servers

```bash
pnpm run dev
```

This starts all applications in development mode:
- **Web App**: http://localhost:3001
- **API**: http://localhost:3000
- **Admin**: http://localhost:3002

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start all apps in dev mode
pnpm run build        # Build all apps
pnpm run test         # Run all tests
pnpm run lint         # Lint all code
pnpm run format       # Format code with Prettier

# Docker
pnpm run docker:up    # Start Docker services
pnpm run docker:down  # Stop Docker services
pnpm run docker:logs  # View Docker logs

# Database
pnpm run db:migrate   # Run migrations
pnpm run db:seed      # Seed database

# Cleanup
pnpm run clean        # Clean build artifacts
```

### Working with Individual Apps

```bash
# Navigate to specific app
cd apps/web

# Run app-specific commands
pnpm run dev
pnpm run build
pnpm run test
```

## 🏗️ Building for Production

### Build all applications

```bash
pnpm run build
```

### Build Docker images

```bash
docker-compose -f docker-compose.prod.yml build
```

### Deploy to Kubernetes

```bash
kubectl apply -f infrastructure/kubernetes/
```

## 📦 Package Management

This monorepo uses **pnpm workspaces** and **Turborepo** for efficient package management and build orchestration.

### Adding dependencies

```bash
# Add to root
pnpm add -w <package>

# Add to specific app
pnpm add <package> --filter web

# Add to all apps
pnpm add <package> -r
```

### Creating new packages

```bash
turbo gen workspace
```

## 🗄️ Database Management

### Migrations

```bash
# Generate migration
cd apps/api
pnpm run migration:generate -- -n MigrationName

# Run migrations
pnpm run migration:run

# Revert migration
pnpm run migration:revert
```

### Seeds

```bash
# Run seeds
cd apps/api
pnpm run seed:run
```

## 🧩 Microservices

Each service is independently deployable:

- **auth-service** (Port 3100): Authentication & authorization
- **payment-service** (Port 3200): Payment processing & escrow
- **notification-service** (Port 3300): Email, SMS, push notifications
- **analytics-service** (Port 3400): Analytics & reporting
- **search-service** (Port 3500): Search & discovery
- **social-sync-service** (Port 3600): Social media integration

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- SQL injection prevention
- XSS protection
- CSRF protection
- Data encryption at rest

## 📊 Monitoring

- **Application**: Sentry for error tracking
- **Infrastructure**: Prometheus + Grafana
- **Logs**: Loki or CloudWatch
- **Uptime**: UptimeRobot

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests for specific app
pnpm run test --filter api

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:coverage
```

## 📝 API Documentation

API documentation is available at:
- Development: http://localhost:3000/api/docs
- Staging: https://api-staging.creatorhub.com/docs
- Production: https://api.creatorhub.com/docs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Your Name
- **Backend**: Team Members
- **Frontend**: Team Members
- **DevOps**: Team Members

## 📞 Support

- Email: support@creatorhub.com
- Slack: [Join our community](https://slack.creatorhub.com)
- Docs: [Documentation](https://docs.creatorhub.com)

## 🗺️ Roadmap

- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered creator matching
- [ ] Video portfolio support
- [ ] Multi-language support
- [ ] Cryptocurrency payments
- [ ] Creator NFT marketplace

## ⚠️ Important Notes

1. Never commit `.env` files
2. Always run migrations before deploying
3. Use feature flags for new features
4. Write tests for new functionality
5. Follow the coding standards

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Turborepo](https://turbo.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ for African Creators
