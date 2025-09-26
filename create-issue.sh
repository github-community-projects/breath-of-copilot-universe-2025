#!/bin/bash

# Create GitHub Issue Script
# This script creates a GitHub issue using the gh CLI from a markdown file

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] ✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] ℹ️  $1${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main function
main() {
    echo -e "${CYAN}═════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}🏰 HYRULE MONSTER DATABASE - GITHUB ISSUE CREATOR 🏰${NC}"
    echo -e "${CYAN}═════════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Default markdown file path
    local markdown_file="${1:-prompts/issue.md}"
    
    print_info "Creating GitHub issue from: $markdown_file"
    
    # Check prerequisites
    print_info "Checking prerequisites..."
    
    if ! command_exists gh; then
        print_error "GitHub CLI (gh) is not installed. Please install it to continue."
        exit 1
    fi
    
    # Check if file exists
    if [ ! -f "$markdown_file" ]; then
        print_error "Markdown file '$markdown_file' not found!"
        exit 1
    fi
    
    print_status "GitHub CLI found: $(gh --version | head -n 1)"
    
    # Parse the markdown file
    print_info "Parsing markdown file..."
    
    # Extract title from first line (format: "Title: [title text]")
    local first_line=$(head -n 1 "$markdown_file")
    
    # Check if first line starts with "Title: "
    if [[ ! "$first_line" =~ ^"Title: ".+ ]]; then
        print_error "Invalid title format in first line of $markdown_file"
        print_error "Expected format: 'Title: Your Issue Title'"
        print_error "Found: '$first_line'"
        exit 1
    fi
    
    local title="${first_line#Title: }"
    
    if [ -z "$title" ]; then
        print_error "Could not extract title from first line of $markdown_file"
        print_error "Expected format: 'Title: Your Issue Title'"
        exit 1
    fi
    
    # Extract description (everything after the first line)
    local description=$(tail -n +2 "$markdown_file")
    
    print_status "Title: $title"
    print_info "Description preview:"
    echo -e "${NC}$(echo "$description" | head -n 3)${NC}"
    if [ "$(echo "$description" | wc -l)" -gt 3 ]; then
        echo -e "${NC}...${NC}"
    fi
    echo ""
    
    # Check if authenticated with GitHub before creating issue
    if ! gh auth status >/dev/null 2>&1; then
        print_error "Not authenticated with GitHub. Please run 'gh auth login' first."
        print_info "However, the parsing was successful:"
        print_info "Title would be: '$title'"
        print_info "Description would be the content shown above."
        exit 1
    fi
    
    print_status "GitHub authentication verified"
    
    # Create the issue
    print_info "Creating GitHub issue..."
    
    local result
    if result=$(gh issue create --title "$title" --body "$description" 2>&1); then
        print_status "Issue created successfully!"
        print_status "Issue URL: $result"
    else
        print_error "Failed to create issue: $result"
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    print_status "GitHub issue creation completed! 🎉"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
}

# Run the main function
main "$@"