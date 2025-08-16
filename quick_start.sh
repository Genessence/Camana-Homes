#!/bin/bash

echo "🚀 Camana Homes - Quick Start Setup"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql+asyncpg://camana_user:camana_password@localhost:5432/camana_homes

# API Configuration
API_HOST=127.0.0.1
API_PORT=8001

# Frontend Configuration
FRONTEND_URL=http://localhost:8080
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Start PostgreSQL
echo "🐘 Starting PostgreSQL with Docker..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL failed to start. Check logs with: docker-compose logs postgres"
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Set up database tables
echo "🗄️ Setting up database tables..."
python setup_database.py

# Create image folders
echo "📁 Creating image folders..."
python setup_image_folders.py

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Add your property images to the created folders (1, 2, 3, ..., 10)"
echo "2. Save your Excel file as 'properties.xlsx' in this directory"
echo "3. Run: python import_excel.py"
echo "4. Start API: cd api && uvicorn main:app --reload --port 8001"
echo "5. Start Frontend: npm run dev"
echo ""
echo "📖 For detailed instructions, see: DATABASE_SETUP.md"
