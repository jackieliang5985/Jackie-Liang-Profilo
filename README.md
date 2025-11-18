# Portfolio Website

A modern, clean portfolio website that automatically fetches and displays your GitHub projects. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Clean, Modern Design** - Beautiful UI with dark mode support
- 🔄 **Auto-sync with GitHub** - Automatically fetches your repositories
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Optimized** - Built with Next.js for optimal performance
- 🌙 **Dark Mode** - Automatic dark mode based on system preferences
- 🚀 **Easy Deployment** - Ready for Vercel, Docker, or any platform

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A GitHub account (to fetch your projects)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Profilo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your GitHub username:
   ```
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Customize Your Information

1. **Hero Section** (`components/Hero.tsx`)
   - Update your name and title
   - Modify the description

2. **About Section** (`components/About.tsx`)
   - Add your bio and experience
   - Update skills and technologies

3. **Contact Section** (`components/Contact.tsx`)
   - Add your email address
   - Update GitHub and LinkedIn URLs

4. **Metadata** (`app/layout.tsx`)
   - Update page title and description

### GitHub Integration

The portfolio automatically fetches your GitHub repositories. You can configure:

- **Username**: Set `NEXT_PUBLIC_GITHUB_USERNAME` in your `.env.local`
- **GitHub Token** (Optional): Create a personal access token at [GitHub Settings](https://github.com/settings/tokens) and add it as `GITHUB_TOKEN` to increase API rate limits

The API route filters out:
- Forked repositories (by default)
- Archived repositories (by default)

You can modify these filters in `app/api/github/route.ts`.

## Deployment

### Option 1: Vercel (Recommended - Easiest)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
   - `GITHUB_TOKEN`: (Optional) Your GitHub personal access token

4. **Deploy**
   - Click "Deploy" and you're done!

Vercel will automatically deploy on every push to your main branch.

### Option 2: Docker

1. **Build the Docker image**
   ```bash
   docker build -t portfolio .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_GITHUB_USERNAME=your-username \
     -e GITHUB_TOKEN=your-token \
     portfolio
   ```

   Or use docker-compose:
   ```bash
   docker-compose up
   ```

### Option 3: Traditional Hosting (Node.js)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Set up a process manager** (PM2 recommended)
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   ```

### Option 4: GitHub Actions + Vercel

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to Vercel on push to main.

**Setup:**
1. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN`: Get from [Vercel Settings](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID`: Found in Vercel project settings
   - `VERCEL_PROJECT_ID`: Found in Vercel project settings
   - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
   - `GITHUB_TOKEN`: (Optional) Your GitHub token

2. Push to main branch and the workflow will deploy automatically

## Project Structure

```
Profilo/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts          # GitHub API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── About.tsx                 # About section
│   ├── Contact.tsx               # Contact section
│   ├── Hero.tsx                  # Hero section
│   ├── Navigation.tsx            # Navigation bar
│   └── Projects.tsx              # Projects section
├── lib/
│   └── github.ts                 # GitHub API utilities
├── .env.example                  # Environment variables template
├── docker-compose.yml            # Docker Compose config
├── Dockerfile                    # Docker configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS config
└── vercel.json                   # Vercel configuration
```

## Customization

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component styles using Tailwind classes

### Adding New Sections

1. Create a new component in `components/`
2. Add it to `app/page.tsx`
3. Add navigation link in `components/Navigation.tsx`

## Troubleshooting

### Projects Not Loading

1. Check that `NEXT_PUBLIC_GITHUB_USERNAME` is set correctly
2. Verify your GitHub username is correct
3. Check browser console for errors
4. If rate limited, add a `GITHUB_TOKEN`

### Build Errors

1. Make sure all dependencies are installed: `npm install`
2. Check Node.js version (18+ required)
3. Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## License

MIT License - feel free to use this for your own portfolio!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

