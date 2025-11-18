# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

Replace `your-github-username` with your actual GitHub username.

## Step 3: Customize Your Information

### Update Hero Section
Edit `components/Hero.tsx`:
- Line 6: Change "Your Name" to your name
- Line 9: Update your title/role
- Line 12: Update your description

### Update About Section
Edit `components/About.tsx`:
- Update the bio paragraphs (lines 10-18)
- Update the skills list (lines 25-35)

### Update Contact Section
Edit `components/Contact.tsx`:
- Line 18: Update email address
- Line 30: Update GitHub URL
- Line 42: Update LinkedIn URL

### Update Page Metadata
Edit `app/layout.tsx`:
- Line 7: Update page title
- Line 8: Update page description

## Step 4: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Deploy (Choose One)

### Option A: Vercel (Easiest)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variable: `NEXT_PUBLIC_GITHUB_USERNAME`
5. Deploy!

### Option B: Docker
```bash
docker-compose up --build
```

## Optional: GitHub Token

For better rate limits, add a GitHub personal access token:

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Select `public_repo` scope
4. Add to `.env.local`:
   ```env
   GITHUB_TOKEN=your-token-here
   ```

## That's It! 🎉

Your portfolio is ready. For more details, see [README.md](README.md) and [DEPLOYMENT.md](DEPLOYMENT.md).

