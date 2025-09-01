#!/bin/bash

# Build script for production deployment
echo "🚀 Building KBE Platform for Production..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build client
echo "🎨 Building client..."
npm run build:client

# Build server
echo "⚙️ Building server..."
npm run build:server

# Copy public assets
echo "📁 Copying public assets..."
cp -r client/public/* dist/public/ 2>/dev/null || :

echo "✅ Build completed successfully!"
echo "📊 Build size:"
du -sh dist/

echo "🌐 Ready for deployment to Vercel!"
