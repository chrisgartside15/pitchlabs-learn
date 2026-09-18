# START HERE: PitchLabs Learn Blog Setup

Everything is ready to go. Here's what you have and what to do next.

## What's Included

✅ **Full Next.js blog template** with:
- Home page
- Article listing
- Dynamic article pages (each `.mdx` file becomes a page)
- Dark mode support
- Mobile-responsive design
- SEO ready (metadata, structured data, etc.)

✅ **First article already written**
- "How to Plan a Soccer Training Session: A Complete Guide"
- Located at: `content/articles/how-to-plan-soccer-training-session.mdx`

✅ **Content strategy document** (`CONTENT_STRATEGY.md`)
- 50+ article ideas mapped out across 5 topic clusters
- Search intent for each
- Publishing roadmap

✅ **Setup & deployment guide** (`SETUP_GUIDE.md`)
- How to run locally
- How to push to GitHub
- How to deploy to Vercel
- How to connect to your domain

✅ **Article template** (`content/articles/_ARTICLE_TEMPLATE.mdx`)
- Copy this as a starting point for new articles

---

## Immediate Next Steps (This Week)

### 1. Get It Running Locally (5 min)

\`\`\`bash
cd PitchLabs-Learn
npm install
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000). You should see the home page with your first article.

### 2. Push to GitHub (5 min)

Follow the "Push to GitHub" section in \`SETUP_GUIDE.md\`.

TL;DR:
\`\`\`bash
git init
git add .
git commit -m "Initial commit: PitchLabs Learn blog"
git remote add origin https://github.com/chrisgartside15/pitchlabs-learn.git
git branch -M main
git push -u origin main
\`\`\`

### 3. Deploy to Vercel (5 min)

Follow the "Deploy to Vercel" section in \`SETUP_GUIDE.md\`.

1. Go to vercel.com
2. Sign in with GitHub
3. Import \`pitchlabs-learn\` repo
4. Click Deploy
5. Wait 1-2 minutes, done

You'll get a live URL.

---

## You're Ready

The infrastructure is done. You have a roadmap. You have a template. You have your first article written.

Good luck. 🚀
