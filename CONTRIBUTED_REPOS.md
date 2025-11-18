# Handling Contributed Repositories

Your portfolio now supports repositories you've contributed to but don't own!

## How It Works

### Automatic Detection
- When you have a GitHub token set, the portfolio automatically fetches repos you own AND repos you've contributed to
- Contributed repos are marked with a **🤝 Contributed** badge
- The badge shows who owns the repository on hover

### Visual Indicators
- **Owned repos**: No special badge (normal display)
- **Contributed repos**: Blue "🤝 Contributed" badge
- **Private repos**: Amber "🔒 Private" badge
- Both badges can appear together if you contributed to a private repo

## Options

### Option 1: Show Contributed Repos (Default)
Contributed repos will appear in your portfolio with a badge indicating you contributed to them.

**Current behavior**: Contributed repos are included by default

### Option 2: Hide Contributed Repos
If you only want to show repos you own, you can exclude contributed repos.

**To exclude contributed repos**, update `components/Projects.tsx`:

```typescript
// Change this line (around line 20):
fetch(`/api/github?username=${username}&includePrivate=true`)

// To:
fetch(`/api/github?username=${username}&includePrivate=true&excludeContributions=true`)
```

### Option 3: Only Show Owned Repos
If you don't want to fetch contributed repos at all, you can disable the contribution fetching.

**To disable contribution fetching**, update `components/Projects.tsx`:

```typescript
// Change this line:
fetch(`/api/github?username=${username}&includePrivate=true`)

// To:
fetch(`/api/github?username=${username}&includePrivate=true&includeContributions=false`)
```

## Requirements

### To See Contributed Repos:
- ✅ You need a **GitHub Personal Access Token** (GITHUB_TOKEN)
- ✅ The token must have appropriate scopes
- ✅ The portfolio uses the authenticated API endpoint

### Without a Token:
- Only public repos you own will be shown
- Contributed repos won't be detected (GitHub's public API doesn't provide this info)

## Benefits

1. **Showcase Collaboration**: Display your contributions to open-source or team projects
2. **Full Portfolio**: Show all your work, not just what you own
3. **Clear Attribution**: The badge makes it clear you contributed vs. owned
4. **Professional**: Shows you work well in collaborative environments

## Example

If you contributed to a project called "awesome-library" owned by "other-user":
- ✅ It will appear in your portfolio
- ✅ It will have a "🤝 Contributed" badge
- ✅ Hovering shows "Contributed to this project (owned by other-user)"
- ✅ The "View Code" button links to the original repository

---

**Current Setting**: Contributed repos are **included** and shown with a badge.

