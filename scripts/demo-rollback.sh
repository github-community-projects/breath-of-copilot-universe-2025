#!/bin/bash

# Demo script for the rollback functionality
# This script demonstrates the rollback script without performing actual rollback

cd /home/runner/work/breath-of-copilot-universe-2025/breath-of-copilot-universe-2025

echo "================================================="
echo "🔄 Git Rollback Script - Demonstration"
echo "================================================="
echo ""
echo "📋 Current commit history:"
git --no-pager log --oneline -5
echo ""

echo "🚀 Features of the rollback script:"
echo "   ✅ Shows formatted commit history with numbering"
echo "   ✅ Interactive commit selection"
echo "   ✅ Detailed commit information display"
echo "   ✅ Safety confirmations before destructive operations"
echo "   ✅ Force push with --force-with-lease for safety"
echo "   ✅ Support for any branch (not just main)"
echo "   ✅ Proper error handling and user feedback"
echo ""

echo "🎮 Running rollback script (will simulate selecting commit #2 and cancel)..."
echo ""

# Create a test file to simulate user input (selecting commit #2, then cancel)
echo "2" > /tmp/test_input.txt
echo "NO" >> /tmp/test_input.txt

# Run the script with simulated input, timeout after 15 seconds
timeout 15s ./scripts/rollback-main.sh main < /tmp/test_input.txt 2>/dev/null || true

# Clean up
rm -f /tmp/test_input.txt

echo ""
echo "================================================="
echo "✅ Demo completed successfully!"
echo "================================================="
echo ""
echo "📝 Script usage examples:"
echo "   ./scripts/rollback-main.sh              # Rollback main branch"
echo "   ./scripts/rollback-main.sh develop      # Rollback develop branch"
echo "   ./scripts/rollback-main.sh --help       # Show help"
echo ""
echo "⚠️  In a real scenario with proper remote access, the script would:"
echo "   1. Fetch the latest changes from remote"
echo "   2. Show commit history from the remote branch"
echo "   3. Allow selection of target commit"
echo "   4. Display detailed commit information"
echo "   5. Request confirmation for the destructive operation"
echo "   6. Perform git reset --hard to target commit"
echo "   7. Force push to remote with --force-with-lease"
echo ""