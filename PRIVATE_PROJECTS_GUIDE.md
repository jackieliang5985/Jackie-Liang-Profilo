# Showcasing Private Projects - Complete Guide

## ✅ Your Code Stays Private!

**Important**: Showing a private project in your portfolio does NOT expose your code. Here's what happens:

### What Visitors See:
- ✅ Project name
- ✅ Description
- ✅ Programming language
- ✅ Technologies used (topics)
- ✅ Last updated date
- ✅ A "View Details" button (instead of "View Code")

### What Visitors CANNOT See:
- ❌ Your source code
- ❌ File contents
- ❌ Commit history
- ❌ Any repository details

### What Happens When They Click "View Details"?
- They'll see GitHub's standard "404" or "This repository is private" page
- **No code is exposed** - GitHub protects private repos
- They can see the repository exists, but nothing else

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Portfolio Private Repos`
4. Select scope: **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Add Token to Environment Variables

**For Local Development:**

Create/update `.env.local`:
```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=ghp_your_token_here
```

**For Vercel Deployment:**

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - `GITHUB_TOKEN` = `your-token-here`
   - `NEXT_PUBLIC_GITHUB_USERNAME` = `your-username`
4. Make sure both are enabled for **Production**, **Preview**, and **Development**
5. Redeploy your site

### Step 3: That's It!

The portfolio will now automatically:
- ✅ Fetch both public AND private repositories
- ✅ Show a "🔒 Private" badge on private projects
- ✅ Display "View Details" instead of "View Code" for private repos
- ✅ Keep all your code completely secure

---

## 🔒 Security Notes

### Your Token is Safe Because:
1. ✅ Token is stored **server-side only** (in environment variables)
2. ✅ Token is **never exposed** to the browser/client
3. ✅ All API calls happen on your server (Next.js API route)
4. ✅ Token is in `.gitignore` (won't be committed to Git)

### Best Practices:
- ✅ Use a token with **minimal scopes** (just `repo` for private repos)
- ✅ **Never** commit tokens to Git
- ✅ **Never** put tokens in client-side code
- ✅ Rotate tokens periodically (every 6-12 months)

---

## 🎨 How Private Projects Appear

Private projects will show:
- A **🔒 Private** badge next to the project name
- "View Details" button instead of "View Code"
- All other information (description, language, topics) as normal

This clearly indicates the project is private while still showcasing your work!

---

## 📋 What Gets Displayed

For each project (public or private), the portfolio shows:

| Information | Source | Visible? |
|------------|--------|----------|
| Project Name | GitHub API | ✅ Yes |
| Description | GitHub API | ✅ Yes |
| Language | GitHub API | ✅ Yes |
| Topics/Tags | GitHub API | ✅ Yes |
| Stars/Forks | GitHub API | ✅ Yes (if public) |
| Last Updated | GitHub API | ✅ Yes |
| **Source Code** | Repository | ❌ **Never** |
| **File Contents** | Repository | ❌ **Never** |
| **Commit History** | Repository | ❌ **Never** |

---

## 🛠️ Troubleshooting

### Private repos not showing?

1. **Check token is set:**
   ```bash
   # In your .env.local
   GITHUB_TOKEN=ghp_your_token_here
   ```

2. **Verify token has correct scope:**
   - Must have `repo` scope for private repos
   - Check at: https://github.com/settings/tokens

3. **Check server logs:**
   - Look for API errors in your deployment logs
   - Common issue: Token expired or revoked

4. **Test locally:**
   ```bash
   npm run dev
   # Check browser console for errors
   ```

### "View Details" shows 404?

This is **normal and expected** for private repos! GitHub shows a 404 to unauthorized users. Your code is still completely protected.

---

## 💡 Alternative: Manual Project Curation

If you prefer complete control, you can manually curate projects:

1. Create `data/projects.ts` with your project data
2. Update `components/Projects.tsx` to use manual data
3. You can include:
   - Private GitHub repos (just metadata)
   - Projects from other platforms
   - Custom descriptions
   - Screenshots or images

See `PRIVATE_REPOS.md` for details on manual curation.

---

## ✅ Summary

**You can safely showcase private projects because:**
- ✅ Only metadata is displayed (name, description, tech stack)
- ✅ Source code is never exposed
- ✅ GitHub protects private repositories
- ✅ Token is secure (server-side only)
- ✅ Visitors see a clear "Private" indicator

**Your code stays 100% private while you showcase your best work!** 🎉

---

## Need Help?

- Check `PRIVATE_REPOS.md` for more details
- Review GitHub API docs: https://docs.github.com/en/rest
- Test your token: `curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user/repos`

