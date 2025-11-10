# Getting Started with CreatorHub

This guide will help you set up and run the CreatorHub application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Will be installed automatically if not present
- **Docker Desktop** - [Download](https://docs.docker.com/get-docker/)
- **Git** - [Download](https://git-scm.com/downloads)

## Quick Start (5 minutes)

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd creatorhub-prototype

# Run the setup script
chmod +x scripts/setup.sh
./scripts/setup.sh
```

The setup script will:
- Check system requirements
- Install dependencies
- Create environment file
- Start Docker services
- Run database migrations

### 2. Configure Environment

Edit the `.env` file and update these critical values:

```bash
# JWT Secrets (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# If you have payment gateway credentials, add them:
FLUTTERWAVE_SECRET_KEY=your_key_here
PAYSTACK_SECRET_KEY=your_key_here
```

### 3. Start Development

```bash
# Start all services
pnpm run dev
```

This command starts:
- **Web App** on http://localhost:3001
- **API** on http://localhost:3000
- **Admin Dashboard** on http://localhost:3002

### 4. Access the Application

Open your browser and visit:
- **Web App**: http://localhost:3001
- **API Documentation**: http://localhost:3000/api/docs
- **Admin**: http://localhost:3002

## Manual Setup (If setup script fails)

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Setup Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### Step 3: Start Docker Services

```bash
docker-compose up -d
```

### Step 4: Run Migrations

```bash
cd apps/api
pnpm run migration:run
cd ../..
```

### Step 5: Start Development

```bash
pnpm run dev
```

## Development Workflow

### Running Individual Apps

```bash
# Run only the web app
cd apps/web
pnpm run dev

# Run only the API
cd apps/api
pnpm run dev
```

### Database Operations

```bash
# Generate a new migration
cd apps/api
pnpm run migration:generate -- -n YourMigrationName

# Run migrations
pnpm run migration:run

# Revert last migration
pnpm run migration:revert

# Seed database with test data
pnpm run seed:run
```

### Testing

```bash
# Run all tests
pnpm run test

# Run tests for specific app
pnpm run test --filter web

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:coverage
```

### Code Quality

```bash
# Lint all code
pnpm run lint

# Format all code
pnpm run format

# Type check
pnpm run type-check
```

## Docker Services

The application uses the following Docker services:

| Service | Port | Admin Panel | Credentials |
|---------|------|-------------|-------------|
| PostgreSQL | 5432 | - | user: creatorhub / pass: dev_password |
| Redis | 6379 | - | pass: dev_password |
| MongoDB | 27017 | - | user: creatorhub / pass: dev_password |
| Elasticsearch | 9200 | - | - |
| RabbitMQ | 5672 | http://localhost:15672 | user: creatorhub / pass: dev_password |
| MinIO | 9000 | http://localhost:9001 | user: minioadmin / pass: minioadmin |
| Mailhog | 1025 | http://localhost:8025 | - |

### Managing Docker Services

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart postgres

# View status
docker-compose ps
```

## Project Structure

```
creatorhub/
├── apps/
│   ├── web/          # Next.js web application
│   ├── admin/        # Admin dashboard
│   └── api/          # NestJS API
├── services/         # Microservices
├── packages/         # Shared packages
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── ui/           # UI components
└── infrastructure/   # DevOps & IaC
```

## Common Issues & Solutions

### Port Already in Use

If you get a "port already in use" error:

```bash
# Find and kill the process using the port
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker Services Not Starting

```bash
# Stop all containers
docker-compose down

# Remove volumes and restart
docker-compose down -v
docker-compose up -d
```

### Database Connection Issues

1. Ensure PostgreSQL is running: `docker-compose ps`
2. Check DATABASE_URL in `.env`
3. Try restarting the database: `docker-compose restart postgres`

### pnpm Installation Issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## API Testing

### Using Swagger UI

Visit http://localhost:3000/api/docs to interact with the API through Swagger.

### Using cURL

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "creator@example.com",
    "password": "Password123!",
    "role": "creator"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "creator@example.com",
    "password": "Password123!"
  }'
```

## Environment Variables

Key environment variables you should configure:

```bash
# Application
NODE_ENV=development
APP_URL=http://localhost:3001
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://creatorhub:dev_password@localhost:5432/creatorhub_dev

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Payment Gateways (Optional for development)
FLUTTERWAVE_SECRET_KEY=your_key
PAYSTACK_SECRET_KEY=your_key

# Social Media APIs (Optional for development)
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
```

## Next Steps

1. **Explore the API**: Visit http://localhost:3000/api/docs
2. **Create a Creator Profile**: Register as a creator and set up your profile
3. **Browse the Code**: Start with `apps/web/src/app/page.tsx` and `apps/api/src/main.ts`
4. **Read the Documentation**: Check out `docs/` folder for detailed guides
5. **Join the Community**: Connect with other developers

## Getting Help

- **Documentation**: See the `docs/` folder
- **Issues**: Check existing issues on GitHub
- **Discord**: Join our community (if available)
- **Email**: support@creatorhub.com

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.
