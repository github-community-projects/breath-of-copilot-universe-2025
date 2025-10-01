#!/bin/bash

# Legend of Zelda Monster Database - Build & Deploy Script
# This script builds and deploys the Zelda-themed web application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art - Dark Link
show_dark_link_ascii() {
    echo -e "${PURPLE}"
    cat << 'EOF'
    ⚔️  DARK LINK - THE SHADOW OF THE HERO ⚔️
    
                            ████████                
                        ████░░░░░░████              
                      ██░░░░░░░░░░░░██            
                      ██░░██░░░░██░░██            
                      ██░░██░░░░██░░██            
                        ██░░░░░░░░██              
                        ██░░████░░██              
                          ████████                
                            ████                  
                        ████████████              
                      ██░░░░░░░░░░██            
                    ████░░░░░░░░░░████          
                  ██░░░░░░░░░░░░░░░░██        
                ████░░░░░░░░░░░░░░░░████      
              ██░░░░██████████████░░░░██    
            ██░░░░██░░░░░░░░░░░░░░██░░░░██  
          ██░░░░██░░░░░░░░░░░░░░░░░░██░░░░██
        ██░░░░██░░░░░░░░░░░░░░░░░░░░░░██░░░░██
        ██░░██░░░░░░░░░░░░░░░░░░░░░░░░░░██░░██
          ████░░░░░░░░░░░░░░░░░░░░░░░░░░████  
            ██████████████████████████████    
              ████                ████        
            ██░░██                ██░░██      
          ██░░░░██                ██░░░░██    
        ██░░░░██                    ██░░░░██  
        ██████                        ██████  

    "I am the shadow that follows your every move...
     I am the darkness in your heart...
     I am... DARK LINK!"
    
EOF
    echo -e "${NC}"
}

# Function to print colored output
print_status() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] ✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] ℹ️ $1${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main deployment function
main() {
    clear
    
    echo -e "${CYAN}═════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}🏰 HYRULE MONSTER DATABASE - BUILD & DEPLOY SCRIPT 🏰${NC}"
    echo -e "${CYAN}═════════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Check prerequisites
    print_info "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js to continue."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm to continue."
        exit 1
    fi
    
    print_status "Node.js version: $(node --version) (npm version: $(npm --version))"
    echo ""
    
    # Install dependencies
    print_info "Installing dependencies..."
    if [ ! -d "node_modules" ]; then
        npm install
        if [ $? -eq 0 ]; then
            print_status "Dependencies installed successfully!"
        else
            print_error "Failed to install dependencies!"
            exit 1
        fi
    else
        print_status "Dependencies pre-installed."
    fi
    echo ""
    
    # Security warnings
    print_warning "🚨 SECURITY ALERT 🚨"
    echo -e "${YELLOW}"
    echo "This application contains INTENTIONAL security vulnerabilities:"
    echo "• SQL Injection vulnerabilities in search endpoints, Cross-Site Scripting (XSS) potential, Information disclosure in error messages, Debug endpoints exposing sensitive information"
    echo ""
    echo "These vulnerabilities are for EDUCATIONAL PURPOSES ONLY! DO NOT deploy this application to a production environment!"
    echo -e "${NC}"
    echo ""

    # Show Dark Link ASCII art
    show_dark_link_ascii
    
    # Ask for confirmation
    echo -e "${PURPLE}Do you want to continue and start a vulnerable server full of monsters? [y/N]: ${NC}"
    read -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Deployment cancelled by user."
        exit 0
    fi
    
    echo ""
    print_info "Starting the Hyrule Monster Database server..."
    echo ""
    
    # Kill any existing server on port 3000
    if lsof -i :3000 >/dev/null 2>&1; then
        print_warning "Port 3000 is already in use. Attempting to free it..."
        pkill -f "node server.js" || true
        sleep 2
    fi
    
    # Start the server
    print_status "Launching server..."
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}🎮 READY TO EXPLORE THE DARK SIDE OF HYRULE! 🎮${NC}"
    echo ""
    echo -e "${CYAN}📱 Web Application: ${YELLOW}http://localhost:3000${NC}"
    echo ""
    echo -e "${RED}⚠️  Test a SQL injection attacks:${NC}"
    echo -e "${RED}   • Search: ${YELLOW}' OR '1'='1${NC}"
    echo ""
    echo -e "${GREEN}Press Ctrl+C to stop the server${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Start the Node.js server
    node server.js
}

# Cleanup function
cleanup() {
    echo ""
    print_info "Shutting down server..."
    print_status "Thanks for exploring the dark side of Hyrule! 🏰"
    echo ""
    echo -e "${PURPLE}"
    echo "Remember: With great power comes great responsibility."
    echo "Use these vulnerabilities only for learning and ethical security testing!"
    echo -e "${NC}"
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

# Run the main function
main "$@"
