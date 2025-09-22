# Git Rollback Script 🔄

A comprehensive bash script to safely rollback a remote Git branch to a previous commit with interactive selection and safety features.

## Features ✨

- **📊 Formatted Commit History**: Shows commits in a clear, numbered table format
- **🎯 Interactive Selection**: Browse and select from recent commits
- **🔍 Detailed Commit Info**: View full commit details before rollback
- **🛡️ Safety Confirmations**: Multiple confirmation prompts for destructive operations
- **🔒 Safe Force Push**: Uses `--force-with-lease` for safer force pushing
- **🌿 Multi-Branch Support**: Works with any branch, not just main
- **📝 Comprehensive Logging**: Colored output with timestamps
- **❌ Error Handling**: Proper validation and error reporting
- **📖 Help Documentation**: Built-in help with examples

## Usage 🚀

### Basic Usage

```bash
# Rollback main branch (default)
./scripts/rollback-main.sh

# Rollback a specific branch
./scripts/rollback-main.sh develop

# Show help
./scripts/rollback-main.sh --help
```

### Interactive Flow

1. **Fetch Updates**: Script fetches latest changes from remote
2. **Show History**: Displays recent commits in formatted table
3. **Select Commit**: Choose which commit to rollback to
4. **Review Details**: View full details of selected commit
5. **Confirm Action**: Multiple safety confirmations
6. **Execute Rollback**: Performs git reset and force push

## Example Output 📋

```
═══════════════════════════════════════════════════════════
🔄 GIT ROLLBACK SCRIPT - REMOTE MAIN BRANCH
═══════════════════════════════════════════════════════════

[10:30:15] ℹ️  Target branch: main
[10:30:15] ✅ Successfully fetched remote changes

[10:30:16] ℹ️  Recent commit history for 'main' branch:

Num  | SHA     | Date       | Author           | Message
-----|---------|------------|------------------|---------------------------------
1    | a1b2c3d | 2025-01-15 | Jane Developer   | feat: add new feature
2    | e4f5g6h | 2025-01-14 | John Coder      | fix: resolve bug in component
3    | i7j8k9l | 2025-01-13 | Alice Smith     | docs: update README
4    | m0n1o2p | 2025-01-12 | Bob Johnson     | refactor: improve performance

Enter the number of the commit to rollback to (1-4), or 'q' to quit: 2

[10:30:20] ℹ️  Selected commit details:
═══════════════════════════════════════════════════════════
commit e4f5g6h1234567890abcdef
Author: John Coder <john@example.com>
Date:   Mon Jan 14 15:30:00 2025 -0800

    fix: resolve bug in component
    
    - Fixed null pointer exception
    - Added validation checks
    - Updated tests
═══════════════════════════════════════════════════════════

[10:30:21] ⚠️  🚨 DANGER ZONE 🚨
You are about to perform a DESTRUCTIVE operation!
This will FORCE PUSH and rewrite history on the remote 'main' branch.
Target commit: e4f5g6h

This action will:
  1. Reset the local 'main' branch to commit e4f5g6h
  2. Force push to remote origin/main
  3. PERMANENTLY DELETE all commits after e4f5g6h

⚠️  This cannot be undone easily! ⚠️

Type 'YES' to confirm the rollback, or 'NO' to cancel: YES

[10:30:25] ℹ️  Performing rollback...
[10:30:25] ℹ️  Switching to branch 'main'...
[10:30:25] ℹ️  Resetting to commit e4f5g6h...
[10:30:26] ℹ️  Force pushing to remote origin/main...
[10:30:27] ✅ Successfully rolled back remote 'main' branch to commit e4f5g6h

[10:30:27] ✅ Rollback completed successfully! 🎉

[10:30:27] ℹ️  The remote 'main' branch has been rolled back to commit e4f5g6h
[10:30:27] ⚠️  Remember: This operation rewrote git history. Other team members may need to reset their local branches.
```

## Safety Features 🛡️

### Multiple Confirmation Steps
- Interactive commit selection with validation
- Detailed commit review before action
- Explicit "YES" confirmation required for destructive operations
- Multiple cancellation points (type 'q' or 'NO')

### Safe Force Push
- Uses `git push --force-with-lease` instead of `--force`
- Prevents accidental overwrites if remote has changed
- Checks branch existence before operations

### Error Handling
- Validates git repository status
- Checks branch existence (local and remote)
- Handles network failures gracefully
- Provides clear error messages with timestamps

## Configuration ⚙️

### Script Variables
- `MAX_COMMITS=20`: Maximum number of commits to show
- `BRANCH_NAME="main"`: Default branch (overrideable via argument)

### Requirements
- Git repository with remote origin
- Bash shell (v4.0+)
- Network access to remote repository
- Write permissions to remote branch

## Important Notes ⚠️

### This is a Destructive Operation
- **Permanently deletes commits** from remote branch
- **Cannot be easily undone** once completed
- **Affects all team members** using the branch

### Before Using
1. **Communicate with team** about the rollback
2. **Backup important commits** if needed
3. **Ensure you have the right permissions**
4. **Consider alternative approaches** (revert commits, etc.)

### After Rollback
- Team members will need to reset their local branches:
  ```bash
  git fetch origin
  git reset --hard origin/main
  ```

## Troubleshooting 🔧

### Common Issues

**"Failed to fetch from remote"**
- Check network connection
- Verify git credentials
- Ensure remote repository exists

**"Branch does not exist"**
- Verify branch name spelling
- Check if branch exists on remote
- Ensure you have access permissions

**"Force push failed"**
- Remote may have been updated by someone else
- Re-run the script to get latest changes
- Check write permissions to remote branch

## Examples 📚

### Rollback main branch
```bash
./scripts/rollback-main.sh
```

### Rollback development branch
```bash
./scripts/rollback-main.sh develop
```

### View available options
```bash
./scripts/rollback-main.sh --help
```

### Cancel operation
When prompted for commit selection, type `q` to quit safely.

## License 📄

This script is provided as-is for educational and utility purposes. Use at your own risk and always test in non-production environments first.

## Contributing 🤝

Feel free to submit issues and enhancement requests!

---

**⚠️ Remember: With great power comes great responsibility. Always double-check before running destructive git operations!**