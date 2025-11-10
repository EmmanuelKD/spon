#!/bin/bash

# CreatorHub Setup Script
# This script sets up the development environment for CreatorHub

set -e

echo "🚀 Setting up CreatorHub monorepo..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18 or higher is required${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check/Install pnpm
echo ""
echo "📦 Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm@8.14.0
fi
echo -e "${GREEN}✅ pnpm version: $(pnpm -v)${NC}"

# Check Docker
echo ""
echo "🐳 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed${NC}"
    echo "Docker is recommended for running services locally"
    echo "Install from: https://docs.docker.com/get-docker/"
else
    echo -e "${GREEN}✅ Docker is installed${NC}"
    if ! docker info > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Docker is not running${NC}"
        echo "Please start Docker Desktop"
    else
        echo -e "${GREEN}✅ Docker is running${NC}"
    fi
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Setup environment files
echo ""
echo "📝 Setting up environment files..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your configuration${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
fi

# Setup Git hooks
echo ""
echo "🔧 Setting up Git hooks..."
if [ -d ".git" ]; then
    pnpm run prepare
    echo -e "${GREEN}✅ Git hooks configured${NC}"
else
    echo -e "${YELLOW}⚠️  Not a git repository. Skipping Git hooks setup${NC}"
fi

# Start Docker services
echo ""
if command -v docker &> /dev/null && docker info > /dev/null 2>&1; then
    echo "🐳 Starting Docker services..."
    docker-compose up -d postgres redis mongodb elasticsearch rabbitmq minio mailhog
    echo ""
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    echo -e "${GREEN}✅ Docker services started${NC}"
    
    # Run database migrations
    echo ""
    echo "🗄️  Running database migrations..."
    cd apps/api
    if [ -f "package.json" ]; then
        # Check if TypeORM migrations exist
        if [ -d "src/database/migrations" ]; then
            pnpm run migration:run 2>/dev/null || echo -e "${YELLOW}⚠️  No migrations to run or database not ready${NC}"
        fi
    fi
    cd ../..
else
    echo -e "${YELLOW}⚠️  Docker is not available. Skipping service startup${NC}"
    echo "You'll need to manually set up databases"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Update .env file with your configuration"
echo "  2. Run 'pnpm run dev' to start development servers"
echo ""
echo "Access the application:"
echo "  - Web App:     http://localhost:3001"
echo "  - API:         http://localhost:3000"
echo "  - API Docs:    http://localhost:3000/api/docs"
echo "  - Admin:       http://localhost:3002"
echo ""
echo "Docker Services:"
echo "  - PostgreSQL:     localhost:5432"
echo "  - Redis:          localhost:6379"
echo "  - MongoDB:        localhost:27017"
echo "  - Elasticsearch:  localhost:9200"
echo "  - RabbitMQ:       localhost:5672 (Management: localhost:15672)"
echo "  - MinIO:          localhost:9000 (Console: localhost:9001)"
echo "  - Mailhog:        localhost:8025"
echo ""
echo "Useful commands:"
echo "  pnpm run dev          # Start all services"
echo "  pnpm run build        # Build all apps"
echo "  pnpm run test         # Run tests"
echo "  pnpm run lint         # Lint code"
echo "  docker-compose logs -f # View logs"
echo ""
echo "Documentation: See README.md for more information"
echo ""
