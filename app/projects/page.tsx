import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import ProjectsClient from './ProjectsClient'
import { fetchGitHubRepos } from '@/lib/github'
import { excludedRepos } from '@/data/excludedRepos'

function ProjectsLoading() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            Projects
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

async function ProjectsLoader() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-username'
  const token = process.env.GITHUB_TOKEN
  
  try {
    const projects = await fetchGitHubRepos(
      username,
      token,
      true, // excludeForks
      true, // excludeArchived
      !!token, // includePrivate
      excludedRepos,
      true, // includeContributions
      false // excludeContributions
    )
    
    return <ProjectsClient initialProjects={projects} />
  } catch (error) {
    console.error('Error loading projects:', error)
    return (
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="text-red-600 dark:text-red-400">
            Failed to load projects. Please try again later.
          </div>
        </div>
      </section>
    )
  }
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsLoader />
      </Suspense>
    </main>
  )
}

