#!/bin/bash

# Build script for Hyrule Monster Database Static Site
echo "🏗️  Building Hyrule Monster Database for static deployment..."

# Create dist directory
rm -rf dist
mkdir -p dist

# Copy static files
echo "📄 Copying static files..."
cp src/index.html dist/
cp src/style.css dist/
cp src/script.js dist/
cp src/monsters.json dist/

# Create a simple package.json for the build process if needed
cat > dist/package.json << 'EOF'
{
  "name": "hyrule-monster-database-static",
  "version": "2.0.0",
  "description": "Legend of Zelda themed demo app with intentional vulnerabilities - Static Edition",
  "scripts": {
    "serve": "python3 -m http.server 8000 || python -m SimpleHTTPServer 8000"
  },
  "keywords": ["zelda", "demo", "security", "vulnerabilities", "static"],
  "author": "GitHub Copilot",
  "license": "MIT"
}
EOF

echo "✅ Build complete! Files are in the 'dist' directory."
echo "🌐 You can serve the site locally with:"
echo "   cd dist && python3 -m http.server 8000"
echo "   Then visit: http://localhost:8000"