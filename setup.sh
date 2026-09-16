#!/bin/bash

# Digikala Clone Setup Script
# This script sets up the project for development

echo "🚀 Setting up Digikala Clone..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
VITE_BASE_URL=/
VITE_API_BASE_URL=https://api.digikala.com
EOF
    echo "✅ .env file created"
fi

# Run type check
echo "🔍 Running type check..."
npm run typecheck

if [ $? -ne 0 ]; then
    echo "⚠️  Type check failed. Please fix the errors."
else
    echo "✅ Type check passed"
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Start development server
echo "🚀 Starting development server..."
echo "   Open http://localhost:5173 in your browser"
echo "   Press Ctrl+C to stop"

npm run dev
