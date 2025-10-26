#!/bin/bash

echo "🚀 KoloCmil Store - Deployment Script"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  No remote repository configured"
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/koloCmil-store.git"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin $repo_url
    echo "✅ Remote added"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update KoloCmil Store"
fi

git commit -m "$commit_msg"
echo "✅ Changes committed"

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' → 'Static Site'"
echo "3. Connect your GitHub repository"
echo "4. Configure:"
echo "   - Build Command: npm install && npm run build"
echo "   - Publish Directory: dist"
echo "5. Click 'Create Static Site'"
echo ""
echo "🎉 Your app will be live in 2-3 minutes!"
