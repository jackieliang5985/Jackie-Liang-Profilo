# Deployment Guide

This guide covers multiple deployment options for your portfolio website.

## Quick Start: Vercel (Recommended)

**Why Vercel?** It's the easiest and fastest way to deploy Next.js applications with zero configuration.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
     - `GITHUB_TOKEN`: (Optional) Your GitHub personal access token
   - Click "Deploy"

3. **Done!** Your site will be live in ~2 minutes

**Benefits:**
- Automatic deployments on every push
- Free SSL certificate
- Global CDN
- Preview deployments for pull requests
- Free tier is generous for portfolios

---

## Docker Deployment

### Local Development with Docker

```bash
# Build and run
docker-compose up --build

# Or manually
docker build -t portfolio .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GITHUB_USERNAME=your-username \
  -e GITHUB_TOKEN=your-token \
  portfolio
```

### Production Docker Deployment

1. **Build the image**
   ```bash
   docker build -t portfolio:latest .
   ```

2. **Deploy to your server**
   - Upload to cloud providers (AWS ECS, Google Cloud Run, Azure Container Instances)
   - Or deploy to your own VPS (DigitalOcean, Linode, etc.)

3. **Example: Deploy to DigitalOcean App Platform**
   - Connect your GitHub repository
   - Select Dockerfile
   - Add environment variables
   - Deploy

---

## Traditional Server Deployment

### Using PM2 (Process Manager)

1. **On your server, install Node.js 18+**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and build**
   ```bash
   git clone <your-repo-url>
   cd Profilo
   npm install
   npm run build
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Start the application**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup  # Follow instructions to enable auto-start
   ```

5. **Set up Nginx reverse proxy** (optional but recommended)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## GitHub Actions CI/CD

The repository includes a GitHub Actions workflow that automatically deploys to Vercel.

### Setup:

1. **Get Vercel credentials**
   - Go to [Vercel Settings > Tokens](https://vercel.com/account/tokens)
   - Create a new token
   - In your Vercel project settings, find:
     - Organization ID
     - Project ID

2. **Add GitHub Secrets**
   - Go to your GitHub repository
   - Settings > Secrets and variables > Actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your organization ID
     - `VERCEL_PROJECT_ID`: Your project ID
     - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
     - `GITHUB_TOKEN`: (Optional) Your GitHub token

3. **Push to main branch**
   - The workflow will automatically deploy on every push

---

## Environment Variables

Create a `.env.local` file (or set in your hosting platform):

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_TOKEN=your-token-here  # Optional but recommended
```

### Getting a GitHub Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio API")
4. Select scope: `public_repo` (read-only access to public repositories)
5. Generate and copy the token
6. Add it to your environment variables

**Why use a token?**
- Increases API rate limit from 60 to 5000 requests/hour
- Prevents rate limiting issues
- More reliable for production

---

## Deployment Checklist

Before deploying, make sure to:

- [ ] Update `components/Hero.tsx` with your name and title
- [ ] Update `components/About.tsx` with your bio and skills
- [ ] Update `components/Contact.tsx` with your email and social links
- [ ] Update `app/layout.tsx` with your page title and description
- [ ] Set `NEXT_PUBLIC_GITHUB_USERNAME` environment variable
- [ ] (Optional) Set `GITHUB_TOKEN` environment variable
- [ ] Test locally with `npm run dev`
- [ ] Build successfully with `npm run build`

---

## Post-Deployment

1. **Test your live site**
   - Verify all sections load correctly
   - Check that GitHub projects are fetching
   - Test on mobile devices

2. **Set up custom domain** (if using Vercel)
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Monitor performance**
   - Check Vercel Analytics (if enabled)
   - Monitor GitHub API rate limits
   - Set up error tracking (optional)

---

## Troubleshooting

### Build Fails

- Check Node.js version (18+ required)
- Verify all environment variables are set
- Check build logs for specific errors

### Projects Not Loading

- Verify `NEXT_PUBLIC_GITHUB_USERNAME` is correct
- Check GitHub API rate limits
- Add `GITHUB_TOKEN` if rate limited
- Check browser console for errors

### Docker Issues

- Ensure Dockerfile uses correct Node version
- Check that `output: 'standalone'` is in `next.config.js`
- Verify environment variables are passed to container

---

## Cost Estimates

- **Vercel**: Free tier (perfect for portfolios)
- **Docker on Cloud**: Varies (DigitalOcean: ~$5/month, AWS: Pay-as-you-go)
- **Traditional VPS**: ~$5-10/month (DigitalOcean, Linode)

---

Need help? Open an issue on GitHub!

