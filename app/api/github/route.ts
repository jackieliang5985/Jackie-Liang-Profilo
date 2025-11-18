import { NextRequest, NextResponse } from 'next/server'
import { fetchGitHubRepos } from '@/lib/github'
import { excludedRepos } from '@/data/excludedRepos'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json(
      { error: 'Username parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Get token from environment variable (optional)
    const token = process.env.GITHUB_TOKEN
    const excludeForks = searchParams.get('excludeForks') !== 'false'
    const excludeArchived = searchParams.get('excludeArchived') !== 'false'
    const includePrivate = searchParams.get('includePrivate') === 'true' && !!token
    const includeContributions = searchParams.get('includeContributions') !== 'false'
    const excludeContributions = searchParams.get('excludeContributions') === 'true'

    const projects = await fetchGitHubRepos(
      username,
      token,
      excludeForks,
      excludeArchived,
      includePrivate,
      excludedRepos,
      includeContributions,
      excludeContributions
    )

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error in GitHub API route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}

