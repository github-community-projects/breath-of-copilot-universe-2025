#!/bin/bash

# Git Rollback Script for Remote Main Branch
# This script allows users to rollback the remote main branch to a previous commit
# by showing commit history and allowing interactive selection

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BRANCH_NAME="main"
MAX_COMMITS=20

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

print_header() {
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}🔄 GIT ROLLBACK SCRIPT - REMOTE MAIN BRANCH${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository!"
        exit 1
    fi
}

# Function to check if branch exists
check_branch_exists() {
    local branch=$1
    if ! git show-ref --verify --quiet refs/heads/$branch; then
        if ! git show-ref --verify --quiet refs/remotes/origin/$branch; then
            print_error "Branch '$branch' does not exist locally or remotely!"
            exit 1
        fi
    fi
}

# Function to fetch latest changes
fetch_remote() {
    print_info "Fetching latest changes from remote..."
    if git fetch origin 2>/dev/null; then
        print_status "Successfully fetched remote changes"
    else
        print_warning "Failed to fetch from remote. Working with local branch only."
        print_info "Note: This script is designed for remote rollbacks, but will demonstrate with local branch."
    fi
}

# Function to display commit history
show_commit_history() {
    local branch=$1
    echo ""
    print_info "Recent commit history for '$branch' branch:"
    echo ""
    
    # Create a temporary file to store commit info
    local temp_file=$(mktemp)
    
    # Get commit history with detailed format - try remote first, fall back to local
    if git show-ref --verify --quiet refs/remotes/origin/$branch; then
        git log origin/$branch --oneline -n $MAX_COMMITS --pretty=format:"%h|%ad|%an|%s" --date=short > "$temp_file"
    else
        git log $branch --oneline -n $MAX_COMMITS --pretty=format:"%h|%ad|%an|%s" --date=short > "$temp_file"
    fi
    
    if [ ! -s "$temp_file" ]; then
        print_error "No commits found for branch '$branch'"
        rm "$temp_file"
        exit 1
    fi
    
    # Display commits with numbering
    echo -e "${CYAN}Num  | SHA     | Date       | Author           | Message${NC}"
    echo -e "${CYAN}-----|---------|------------|------------------|---------------------------------${NC}"
    
    local line_num=1
    while IFS='|' read -r sha date author message; do
        printf "${YELLOW}%-4d${NC} | ${GREEN}%-7s${NC} | ${BLUE}%-10s${NC} | ${PURPLE}%-16s${NC} | %.50s\n" \
               "$line_num" "$sha" "$date" "$author" "$message"
        ((line_num++))
    done < "$temp_file"
    
    rm "$temp_file"
    echo ""
}



# Function to get commit SHA by line number
get_commit_sha_by_number() {
    local branch=$1
    local line_number=$2
    
    # Try remote first, fall back to local
    if git show-ref --verify --quiet refs/remotes/origin/$branch; then
        git log origin/$branch --oneline -n $MAX_COMMITS --pretty=format:"%h" | sed -n "${line_number}p"
    else
        git log $branch --oneline -n $MAX_COMMITS --pretty=format:"%h" | sed -n "${line_number}p"
    fi
}

# Function to show commit details
show_commit_details() {
    local sha=$1
    echo ""
    print_info "Selected commit details:"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    git show --stat $sha
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Function to confirm rollback
confirm_rollback() {
    local target_sha=$1
    local branch=$2
    
    print_warning "🚨 DANGER ZONE 🚨"
    echo -e "${RED}You are about to perform a DESTRUCTIVE operation!${NC}"
    echo -e "${RED}This will FORCE PUSH and rewrite history on the remote '$branch' branch.${NC}"
    echo -e "${RED}Target commit: $target_sha${NC}"
    echo ""
    echo -e "${YELLOW}This action will:${NC}"
    echo -e "${YELLOW}  1. Reset the local '$branch' branch to commit $target_sha${NC}"
    echo -e "${YELLOW}  2. Force push to remote origin/$branch${NC}"
    echo -e "${YELLOW}  3. PERMANENTLY DELETE all commits after $target_sha${NC}"
    echo ""
    echo -e "${RED}⚠️  This cannot be undone easily! ⚠️${NC}"
    echo ""
    
    local confirmation
    while true; do
        echo -e "${YELLOW}Type 'YES' to confirm the rollback, or 'NO' to cancel: ${NC}"
        read -r confirmation
        
        case "$confirmation" in
            "YES")
                return 0
                ;;
            "NO")
                print_info "Rollback cancelled by user"
                exit 0
                ;;
            *)
                print_error "Please type exactly 'YES' or 'NO'"
                ;;
        esac
    done
}

# Function to perform the rollback
perform_rollback() {
    local target_sha=$1
    local branch=$2
    
    print_info "Performing rollback..."
    
    # Ensure we're on the correct branch
    print_info "Switching to branch '$branch'..."
    if ! git checkout $branch 2>/dev/null; then
        # Branch doesn't exist locally, create it from remote
        print_info "Creating local branch '$branch' from origin/$branch..."
        git checkout -b $branch origin/$branch
    fi
    
    # Reset to target commit
    print_info "Resetting to commit $target_sha..."
    git reset --hard $target_sha
    
    # Force push to remote
    print_info "Force pushing to remote origin/$branch..."
    if git push --force-with-lease origin $branch; then
        print_status "Successfully rolled back remote '$branch' branch to commit $target_sha"
    else
        print_error "Failed to push to remote. The rollback was not completed."
        print_warning "Your local branch has been reset, but remote was not updated."
        exit 1
    fi
}

# Main function
main() {
    print_header
    
    # Parse command line arguments
    if [ $# -gt 0 ]; then
        BRANCH_NAME="$1"
    fi
    
    print_info "Target branch: $BRANCH_NAME"
    
    # Perform checks
    check_git_repo
    fetch_remote
    check_branch_exists "$BRANCH_NAME"
    
    # Show commit history
    show_commit_history "$BRANCH_NAME"
    
    # Count available commits - try remote first, fall back to local
    # Use the same method as show_commit_history to ensure consistency
    local temp_file=$(mktemp)
    if git show-ref --verify --quiet refs/remotes/origin/$BRANCH_NAME; then
        git log origin/$BRANCH_NAME --oneline -n $MAX_COMMITS --pretty=format:"%h|%ad|%an|%s" --date=short > "$temp_file"
    else
        git log $BRANCH_NAME --oneline -n $MAX_COMMITS --pretty=format:"%h|%ad|%an|%s" --date=short > "$temp_file"
    fi
    local commit_count=$(wc -l < "$temp_file")
    rm "$temp_file"
    
    if [ "$commit_count" -eq 0 ]; then
        print_error "No commits found in branch '$BRANCH_NAME'"
        exit 1
    fi
    
    if [ "$commit_count" -eq 1 ]; then
        print_error "Only one commit found. Cannot rollback further."
        exit 1
    fi
    
    # Get user selection
    local selection
    while true; do
        echo -e "${YELLOW}Enter the number of the commit to rollback to (2-$commit_count), or 'q' to quit: ${NC}"
        read -r selection
        
        if [[ "$selection" == "q" || "$selection" == "Q" ]]; then
            print_info "Rollback cancelled by user"
            exit 0
        fi
        
        if [[ "$selection" == "1" ]]; then
            print_error "You cannot rollback to the current commit, please select a past commit instead"
        elif [[ "$selection" =~ ^[0-9]+$ ]] && [ "$selection" -ge 2 ] && [ "$selection" -le "$commit_count" ]; then
            break
        else
            print_error "Invalid selection. Please enter a number between 2 and $commit_count, or 'q' to quit."
        fi
    done
    
    # Get the target commit SHA
    local target_sha=$(get_commit_sha_by_number "$BRANCH_NAME" "$selection")
    
    if [ -z "$target_sha" ]; then
        print_error "Failed to get commit SHA for selection $selection"
        exit 1
    fi
    
    # Show commit details
    show_commit_details "$target_sha"
    
    # Confirm rollback
    confirm_rollback "$target_sha" "$BRANCH_NAME"
    
    # Perform rollback
    perform_rollback "$target_sha" "$BRANCH_NAME"
    
    echo ""
    print_status "Rollback completed successfully! 🎉"
    echo ""
    print_info "The remote '$BRANCH_NAME' branch has been rolled back to commit $target_sha"
    print_warning "Remember: This operation rewrote git history. Other team members may need to reset their local branches."
}

# Help function
show_help() {
    echo "Git Rollback Script - Remote Main Branch"
    echo ""
    echo "Usage: $0 [branch_name]"
    echo ""
    echo "Arguments:"
    echo "  branch_name    The branch to rollback (default: main)"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Rollback main branch"
    echo "  $0 develop           # Rollback develop branch"
    echo ""
    echo "This script will:"
    echo "  1. Show recent commit history"
    echo "  2. Allow you to select a commit to rollback to"
    echo "  3. Confirm the destructive operation"
    echo "  4. Perform the rollback with force push"
}

# Handle help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Set up signal handling for cleanup
trap 'echo ""; print_info "Script interrupted by user"; exit 130' SIGINT SIGTERM

# Run the main function
main "$@"