# Repository Setup Guide

This guide explains how to maintain two repositories: one **public** (for showcasing) and one **private** (for deployment).

## Repository Strategy

### Option 1: Two Separate Repositories (Recommended) ✅

**Benefits:**
- Clear separation between public and private code
- No risk of accidentally pushing sensitive data
- Easier to manage and maintain
- Public repo stays clean for portfolio

**Structure:**
- **Private Repo**: Full version with all data, used for deployment
- **Public Repo**: Clean version with sample data, for showcasing

### Option 2: Git Branches

**Benefits:**
- Single repository
- Easier to sync changes

**Drawbacks:**
- Risk of accidentally pushing sensitive data
- More complex workflow
- Harder to maintain separation

## Setup Instructions

### Step 1: Prepare Your Private Repository (Current)

Your current repository is your **private** repository. This is where you:
- Keep all real user data
- Deploy from
- Do active development

**Current `.gitignore` is correct** - it excludes `.env*` files.

### Step 2: Create Public Repository

1. **Create a new GitHub repository** (make it public)
   ```bash
   # On GitHub, create a new public repository
   # Name it: learn-pwa (or learn-pwa-public)
   ```

2. **Prepare the public version:**
   
   **On Windows (PowerShell):**
   ```powershell
   # Run the preparation script
   .\scripts\prepare-public.ps1
   ```
   
   **On Mac/Linux:**
   ```bash
   # Make script executable
   chmod +x scripts/prepare-public.sh
   
   # Run the preparation script
   ./scripts/prepare-public.sh
   ```

3. **Create a new directory for public repo:**
   ```bash
   # Create a new folder
   mkdir ../learn-pwa-public
   cd ../learn-pwa-public
   
   # Clone your private repo (or copy files)
   # Then run the prepare script to replace data files
   ```

4. **Initialize public repository:**
   ```bash
   git init
   git remote add origin https://github.com/yourusername/learn-pwa-public.git
   git add .
   git commit -m "Initial commit - public version"
   git push -u origin main
   ```

### Step 3: Maintain Both Repositories

#### When Making Code Changes:

1. **Make changes in your private repo** (main development)
2. **Test thoroughly**
3. **Commit to private repo**
4. **Copy changes to public repo** (excluding data files and images):
   ```bash
   # Copy all files except data and images
   rsync -av --exclude 'src/lib/data/users.json' \
              --exclude 'src/lib/data/lesson.json' \
              --exclude '.env*' \
              --exclude 'node_modules' \
              --exclude '.next' \
              --exclude 'public/*.webp' \
              --exclude 'public/*.jpg' \
              --exclude 'public/*.png' \
              --exclude 'public/*.svg' \
              private-repo/ public-repo/
   
   # Or use the sync script (Windows PowerShell)
   .\scripts\sync-to-public.ps1
   ```

5. **Run prepare script in public repo** to ensure sample data
6. **Add README.md to public folder** (explains image requirements)
7. **Commit and push to public repo**

#### Automated Sync Script (Optional)

Create a sync script to automate copying:

```bash
# scripts/sync-to-public.sh
#!/bin/bash
SOURCE_DIR="."
TARGET_DIR="../learn-pwa-public"

# Copy all files except sensitive ones
rsync -av --exclude 'src/lib/data/users.json' \
          --exclude 'src/lib/data/lesson.json' \
          --exclude '.env*' \
          --exclude 'node_modules' \
          --exclude '.next' \
          --exclude '.git' \
          $SOURCE_DIR/ $TARGET_DIR/

# Run prepare script in target
cd $TARGET_DIR
./scripts/prepare-public.sh
```

## What Goes in Each Repository

### Private Repository ✅
- ✅ All source code
- ✅ Full user data (`users.json` with real users)
- ✅ Full course data (`lesson.json` with all courses)
- ✅ `.env.example` (template only)
- ✅ All images and assets
- ✅ Complete project structure
- ❌ No `scripts/` folder (not needed for production)
- ❌ No `public/README.md` (not needed in private repo)

### Public Repository ✅
- ✅ All source code
- ✅ Sample user data (1-2 demo users)
- ✅ Sample course data (2-3 sample courses)
- ✅ `.env.example` (template only)
- ✅ `manifest.json` (required for PWA)
- ✅ `scripts/` folder (useful for others who fork the repo)
- ✅ `public/README.md` (explains image requirements)
- ✅ Complete project structure
- ❌ No real user data
- ❌ No production environment variables
- ❌ No image files (`.webp`, `.jpg`, `.png`, `.svg`) - excluded to reduce repo size

## Important Notes

1. **Never commit `.env.local`** to either repository
2. **Always use sample data** in public repository
3. **Test public repo** before pushing to ensure it works
4. **Keep README updated** in both repos
5. **Use different remote URLs** for each repo

## Quick Reference

### Private Repo (Deployment)
```bash
cd learn-pwa
git remote -v
# Should point to your private repo
```

### Public Repo (Portfolio)
```bash
cd learn-pwa-public
git remote -v
# Should point to your public repo
```

## Troubleshooting

**Q: How do I sync changes between repos?**
A: Manually copy changed files, or use the sync script. Always run the prepare script in the public repo after syncing.

**Q: What if I accidentally push sensitive data?**
A: If it's in a private repo, it's less critical but still not ideal. If in public repo, immediately:
1. Remove the sensitive file
2. Use `git filter-branch` or BFG Repo-Cleaner to remove from history
3. Force push (be careful!)

**Q: Can I use Git submodules?**
A: Possible but more complex. Two separate repos is simpler and safer.

## Best Practices

1. ✅ Always develop in private repo first
2. ✅ Test thoroughly before syncing to public
3. ✅ Use the prepare script to ensure clean sample data
4. ✅ Review changes before pushing to public repo
5. ✅ Keep both READMEs updated
6. ✅ Document any differences between repos

