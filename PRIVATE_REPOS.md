# Using Private Repositories in Your Portfolio

You have several options for displaying projects in your portfolio:

## Option 1: Use Public Repositories (No Token Needed)

**Pros:**
- ✅ No setup required
- ✅ Works immediately
- ✅ No security concerns

**Cons:**
- ❌ Only shows public repositories
- ❌ Lower API rate limit (60 requests/hour without token)

**How it works:**
- Just set `NEXT_PUBLIC_GITHUB_USERNAME` in your `.env.local`
- The portfolio will automatically fetch your public repositories

---

## Option 2: Use Private Repositories (Requires Token)

**Pros:**
- ✅ Can show private repositories
- ✅ Higher API rate limit (5,000 requests/hour)
- ✅ More control over what to display

**Cons:**
- ⚠️ Requires setting up a GitHub Personal Access Token
- ⚠️ Token must be kept secure (server-side only)

**Setup Steps:**

1. **Create a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio API")
   - Select scopes:
     - ✅ `repo` (Full control of private repositories) - **Required for private repos**
     - OR just `public_repo` (Access public repositories) - **If you only want public repos**
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Add Token to Environment Variables:**
   
   **For local development** (`.env.local`):
   ```env
   GITHUB_TOKEN=your-token-here
   NEXT_PUBLIC_GITHUB_USERNAME=your-username
   ```

   **For Vercel deployment:**
   - Go to your project settings
   - Environment Variables
   - Add `GITHUB_TOKEN` with your token value
   - Make sure it's set for "Production", "Preview", and "Development"

3. **Enable Private Repos in API Call:**
   
   Update `components/Projects.tsx` to include private repos:
   ```typescript
   fetch(`/api/github?username=${username}&includePrivate=true`)
   ```

   Or keep it false to only show public repos even with a token:
   ```typescript
   fetch(`/api/github?username=${username}&includePrivate=false`)
   ```

---

## Option 3: Manually Curate Projects (Most Control)

If you want complete control over which projects appear, you can create a manual projects list.

### Create `data/projects.ts`:

```typescript
export interface ManualProject {
  id: string
  name: string
  description: string
  url: string
  demoUrl?: string
  language: string
  stars?: number
  forks?: number
  topics: string[]
  image?: string
}

export const manualProjects: ManualProject[] = [
  {
    id: '1',
    name: 'My Awesome Project',
    description: 'A project I built that does amazing things',
    url: 'https://github.com/your-username/project',
    demoUrl: 'https://project-demo.com',
    language: 'TypeScript',
    stars: 42,
    forks: 5,
    topics: ['react', 'typescript', 'nextjs'],
  },
  // Add more projects...
]
```

### Update `components/Projects.tsx` to use manual data:

```typescript
import { manualProjects } from '@/data/projects'

// Replace the GitHub fetch with:
const [projects, setProjects] = useState(manualProjects)
```

**Pros:**
- ✅ Complete control over what's displayed
- ✅ Can include projects from other platforms
- ✅ Can customize descriptions and metadata
- ✅ No API rate limits

**Cons:**
- ❌ Manual maintenance required
- ❌ Doesn't auto-update from GitHub

---

## Option 4: Hybrid Approach (Recommended)

Show both GitHub projects AND manually curated featured projects:

1. Keep GitHub integration for public repos
2. Add a "Featured Projects" section with manually selected projects
3. Best of both worlds!

---

## Security Best Practices

⚠️ **IMPORTANT**: Never expose your GitHub token in client-side code!

- ✅ Store `GITHUB_TOKEN` in `.env.local` (not `.env`)
- ✅ Add `.env.local` to `.gitignore` (already done)
- ✅ Use server-side API routes (already implemented)
- ✅ Never commit tokens to Git
- ✅ Use environment variables in deployment platforms

---

## Current Implementation

The current setup:
- ✅ Works with public repos (no token needed)
- ✅ Supports private repos when token is provided
- ✅ Filters out forks and archived repos by default
- ✅ All API calls are server-side (secure)

To enable private repos, just:
1. Add `GITHUB_TOKEN` to your environment variables
2. Update the fetch call in `Projects.tsx` to include `&includePrivate=true`

---

## Recommendation

For most portfolios:
- **Start with public repos** (easiest, no setup)
- **Add a token** for higher rate limits (even if not using private repos)
- **Manually curate** if you want to highlight specific projects

For maximum control:
- Use **Option 3 (Manual)** or **Option 4 (Hybrid)**

