# PitchLabs Learn: Setup & Deployment Guide

This guide walks you through getting this repo running locally, pushing it to GitHub, and deploying to Vercel.

## Step 1: Local Setup (5 minutes)

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- Git installed

### Install & Run

```bash
# Clone or download the repo
cd pitchlabs-learn

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the home page with one article.

To stop the dev server, press `Ctrl+C`.

---

## Step 2: Push to GitHub (5 minutes)

### Initialize Git & Create Remote Repo

```bash
# From inside the pitchlabs-learn folder

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: PitchLabs Learn blog setup"
```

### Create the Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `pitchlabs-learn`
3. Description: "A coaching education blog for PitchLabs"
4. Public (easier for SEO)
5. Skip "Initialize this repository with..." options
6. Click "Create repository"

### Connect Local Repo to GitHub

GitHub will show you these commands after you create the repo. Copy and paste them:

```bash
git remote add origin https://github.com/chrisgartside15/pitchlabs-learn.git
git branch -M main
git push -u origin main
```

Done. Your code is now on GitHub.

---

## Step 3: Deploy to Vercel (5 minutes)

### Create Vercel Account & Deploy

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New..." → "Project"
4. Authorize GitHub access when prompted
5. Select `pitchlabs-learn` from your repos
6. Click "Import"
7. Vercel auto-detects Next.js. Keep defaults and click "Deploy"

Wait ~1-2 minutes. You'll get a live URL (something like `pitchlabs-learn-8d5z.vercel.app`).

**That's it.** Your site is live.

### Test It

Visit the Vercel URL. You should see the home page and be able to click through to the article.

---

## Step 4: Connect to pitchlabs.com (Optional, 10 minutes)

To make it live at `learn.pitchlabs.com` (or `pitchlabs.com/learn`):

### Option A: Subdomain (Easier, Recommended)

1. In Vercel, go to your project settings → "Domains"
2. Add domain: `learn.pitchlabs.com`
3. Vercel will show DNS records you need to add
4. In your domain registrar (GoDaddy, Namecheap, etc.), add those DNS records
5. Wait ~10-30 minutes for DNS to propagate
6. Test: Visit `learn.pitchlabs.com`

### Option B: Path on Existing Domain (`pitchlabs.com/learn`)

This requires routing traffic from your main PitchLabs site to Vercel. More complex—ask for help if this is your setup.

For now, a subdomain is simpler and just as good for SEO.

---

## Step 5: Automatic Deployment (Already Set Up)

Every time you:

1. Write/edit an article in `content/articles/`
2. Commit to GitHub: `git commit -am "Add new article"`
3. Push to main: `git push`

Vercel automatically rebuilds and deploys within 1-2 minutes. No manual steps.

You can watch deploys at [vercel.com/dashboard](https://vercel.com/dashboard) under your project.

---

## Publishing Your First Article

1. Create a new file: `content/articles/my-article-slug.mdx`

2. Add frontmatter:
```yaml
---
title: "My Article Title"
excerpt: "A short excerpt for listings."
date: "2026-09-17"
author: "Your Name"
cta: "Optional call-to-action"
---
```

3. Write your article in Markdown below the frontmatter.

4. Commit and push:
```bash
git add content/articles/my-article-slug.mdx
git commit -m "Add article: My Article Title"
git push
```

5. Vercel deploys automatically. Within 1-2 minutes, visit your site and refresh.

---

## Troubleshooting

### Build fails after I push

Check the Vercel dashboard for error messages. Common issues:

- Typo in frontmatter (make sure YAML syntax is correct)
- Missing required fields (title, excerpt, date)
- Invalid file name (use hyphens, not spaces)

### I can't see my changes locally

Stop and restart the dev server:
```bash
# Ctrl+C to stop
npm run dev
```

### I need to update an article

Just edit the `.mdx` file, commit, and push. Vercel redeploys automatically.

---

## Environment Variables (Advanced)

You don't need these for basic functionality. Only add if you need:

- Analytics tracking
- Comments system
- Search functionality

For now, skip this.

---

## Next Steps

1. ✅ Understand the content strategy (read `CONTENT_STRATEGY.md`)
2. Write the next 2-3 articles from Cluster 1
3. Set up Google Search Console for the domain
4. Monitor traffic and search rankings

---

## Questions?

- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- MDX syntax: [mdxjs.com](https://mdxjs.com)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
