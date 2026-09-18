# PitchLabs Learn

A coaching education blog for PitchLabs. Coaching guides, training session planning, and soccer fundamentals.

## Quick Start

### Local Development

1. Clone this repo and install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Add a New Article

1. Create a new `.mdx` file in `content/articles/`:
```bash
content/articles/your-article-slug.mdx
```

2. Add frontmatter at the top:
```yaml
---
title: "Your Article Title"
excerpt: "A short excerpt that appears in article listings."
date: "2026-09-17"
author: "Chris Gartside"
cta: "Optional call-to-action text"
---
```

3. Write your content in Markdown below the frontmatter.

4. Commit and push. The article will appear automatically on the site.

## Deployment to Vercel

### First-time Setup

1. Make sure this repo is on GitHub: `chrisgartside15/pitchlabs-learn`

2. Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

3. Click "Add New..." → "Project"

4. Select the `pitchlabs-learn` repo and click "Import"

5. Vercel will auto-detect it's a Next.js project. Click "Deploy".

6. Once deployed, you'll get a live URL (something like `pitchlabs-learn-chi.vercel.app`).

### Connect to usepitchlabs.com

To make it live at `usepitchlabs.com/learn`:

1. In your domain registrar (wherever your DNS is), add a subdomain redirect or DNS record pointing to Vercel.

2. In Vercel project settings → "Domains", add `learn.usepitchlabs.com` or configure the DNS records.

3. Vercel will provide specific DNS records to add to your domain.

(Alternative: If you want `usepitchlabs.com/learn` instead of a subdomain, that requires more complex routing—easiest path is just a subdomain for now.)

### Deploy Updates

Once Vercel is set up:

1. Write or edit articles in `content/articles/`
2. Commit and push to GitHub
3. Vercel automatically rebuilds and deploys (takes ~1–2 minutes)

No manual deploy steps needed.

## Content Architecture

The blog uses topical clusters. Each pillar article links to supporting articles, and those link back to each other and the pillar.

### First Cluster: Session Planning

**Pillar:** How to Plan a Soccer Training Session (live)

**Supporting articles (planned):**
- Start With the Learning Objective, Not the Drill
- How to Design Game-Realistic Practices
- Coaching Decision-Making Development
- How to Progress and Regress Activities
- Coaching Interventions That Actually Work
- Training-to-Game Transfer

### Second Cluster: Soccer Fundamentals (planned)

Similar structure for core skills: scanning, receiving, positioning, etc.

### Activity Examples (planned)

Individual pages with PitchLabs diagrams for common activities:
- 4v4 Four-Goal Game
- 5v2 Rondos
- Directional Small-Sided Games

## File Structure

```
pitchlabs-learn/
├── app/
│   ├── layout.js              # Main layout, header, footer
│   ├── globals.css            # Styles
│   ├── page.js                # Home page
│   └── articles/
│       └── [slug]/
│           └── page.js        # Article detail page
├── lib/
│   └── articles.js            # Article fetching logic
├── content/
│   └── articles/
│       └── *.mdx              # Article files
├── public/                    # Static assets (images, etc)
├── package.json
├── next.config.js
└── README.md
```

## Adding Images to Articles

1. Place images in `public/images/articles/`

2. Reference in your MDX:
```markdown
![Alt text](/images/articles/your-image.png)
```

Images are served from the `public/` folder automatically.

## SEO & Metadata

Each article gets automatic:
- Open Graph meta tags (for social sharing)
- Twitter card data
- Structured Article data (helps Google understand the content)
- Canonical URLs

You can customize per-article in the frontmatter if needed.

## Styling

The site supports light and dark mode automatically based on system preferences.

All styles are in `app/globals.css`. Components use scoped `<style jsx>` tags for additional styling.

## Questions?

This is a straightforward Next.js + MDX setup. For more on MDX syntax, see [mdxjs.com](https://mdxjs.com).
