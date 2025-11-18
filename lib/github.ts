import axios from 'axios'
import { customDescriptions } from '@/data/customDescriptions'
import { techStacks } from '@/data/techStacks'
import { demoLinks } from '@/data/demoLinks'
import { projectExperienceLinks } from '@/data/projectExperienceLinks'
import { projectBlogLinks } from '@/data/projectBlogLinks'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  default_branch: string
  private: boolean
  fork?: boolean
  archived?: boolean
  isContributed?: boolean
  owner: {
    login: string
  }
}

export interface Project {
  id: number
  name: string
  description: string
  url: string
  demoUrl: string | null
  language: string | null
  stars: number
  forks: number
  updatedAt: string
  topics: string[]
  private: boolean
  isContributed: boolean
  owner: string
  techStack?: string[]
  experienceLink?: {
    label: string
    href: string
  }
  blogLink?: string | null
}

/**
 * Fetches repositories from GitHub API
 * @param username - GitHub username (only used for public repos, ignored if token provided)
 * @param token - Optional GitHub personal access token (required for private repos)
 * @param excludeForks - Whether to exclude forked repositories
 * @param excludeArchived - Whether to exclude archived repositories
 * @param includePrivate - Whether to include private repositories (requires token)
 * @param excludedRepos - Array of repository names to exclude (case-insensitive)
 * @param includeContributions - Whether to include repos you contributed to but don't own
 * @param excludeContributions - Whether to exclude contributed repos (if includeContributions is true)
 */
export async function fetchGitHubRepos(
  username: string,
  token?: string,
  excludeForks: boolean = true,
  excludeArchived: boolean = true,
  includePrivate: boolean = false,
  excludedRepos: string[] = [],
  includeContributions: boolean = true,
  excludeContributions: boolean = false
): Promise<Project[]> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }

    if (token) {
      headers.Authorization = `token ${token}`
    }

    // Determine affiliation based on whether to include contributions
    let affiliation = 'owner'
    if (token && includeContributions) {
      affiliation = 'owner,collaborator,organization_member'
    }

    // If token is provided and we want private repos, use authenticated endpoint
    // This returns all repos (public + private) for the authenticated user
    const endpoint = token && includePrivate
      ? `https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=${affiliation}`
      : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`

    const response = await axios.get<GitHubRepo[]>(endpoint, { headers })

    let repos = response.data
    
    // Mark contributed repos (repos where owner is not the username)
    // For public repos without token, we can't determine contributions, so mark as owned
    const userLower = username.toLowerCase()
    repos = repos.map((repo) => ({
      ...repo,
      isContributed: token && repo.owner?.login 
        ? repo.owner.login.toLowerCase() !== userLower 
        : false,
    }))

    // Filter out forks and archived repos if requested
    if (excludeForks) {
      repos = repos.filter((repo) => !repo.fork)
    }
    if (excludeArchived) {
      repos = repos.filter((repo) => !repo.archived)
    }
    
    // Filter out excluded repositories (case-insensitive)
    if (excludedRepos.length > 0) {
      const excludedLower = excludedRepos.map((name) => name.toLowerCase())
      repos = repos.filter(
        (repo) => !excludedLower.includes(repo.name.toLowerCase())
      )
    }
    
    // Filter out contributed repos if requested
    if (excludeContributions) {
      repos = repos.filter((repo) => !repo.isContributed)
    }

    // Transform to Project format
    const projects: Project[] = repos.map((repo) => {
      // Use custom description if available, otherwise use GitHub description
      const repoNameLower = repo.name.toLowerCase()
      const customDesc = Object.keys(customDescriptions).find(
        (key) => key.toLowerCase() === repoNameLower
      )
      const description = customDesc
        ? customDescriptions[customDesc]
        : repo.description || 'No description available'
      
      // Get tech stack if available
      const techStackKey = Object.keys(techStacks).find(
        (key) => key.toLowerCase() === repoNameLower
      )
      const techStack = techStackKey ? techStacks[techStackKey] : undefined
      
      const demoKey = Object.keys(demoLinks).find(
        (key) => key.toLowerCase() === repoNameLower
      )
      const demoUrl = demoKey ? demoLinks[demoKey] : repo.homepage || null

      const experienceKey = Object.keys(projectExperienceLinks).find(
        (key) => key.toLowerCase() === repoNameLower
      )
      const experienceLink = experienceKey ? projectExperienceLinks[experienceKey] : undefined
      const blogKey = Object.keys(projectBlogLinks).find(
        (key) => key.toLowerCase() === repoNameLower
      )
      const blogLink = blogKey ? projectBlogLinks[blogKey] : null

      return {
        id: repo.id,
        name: repo.name,
        description,
        url: repo.html_url,
        demoUrl,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
        private: repo.private,
        isContributed: repo.isContributed || false,
        owner: repo.owner.login,
        techStack,
        experienceLink,
        blogLink,
      }
    })

    return projects
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`GitHub user "${username}" not found`)
      }
      if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Consider using a personal access token.')
      }
    }
    throw error
  }
}

