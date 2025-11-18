'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { Project } from '@/lib/github'
import { formatDistanceToNow } from 'date-fns'
import { contactOnlyRepos } from '@/data/contactOnlyRepos'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { assetPath } from '@/lib/assetPath'

interface ProjectsClientProps {
  initialProjects: Project[]
}

const TOP_PROJECTS = [
  'astro',
  'sf-general-exploratory-analysis',
  'san-francisco-real-estate-application',
]

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const sortedProjects = useMemo(() => {
    const projectsCopy = [...initialProjects]
    projectsCopy.sort((a, b) => {
      const aIndex = TOP_PROJECTS.findIndex(
        (name) => name === a.name.toLowerCase()
      )
      const bIndex = TOP_PROJECTS.findIndex(
        (name) => name === b.name.toLowerCase()
      )
      const aPriority = aIndex === -1 ? Number.MAX_VALUE : aIndex
      const bPriority = bIndex === -1 ? Number.MAX_VALUE : bIndex
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      return 0
    })
    return projectsCopy
  }, [initialProjects])

  const [projects] = useState<Project[]>(sortedProjects)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(false)
  const { ref: sectionRef, isVisible } = useScrollAnimation()
  
  useEffect(() => {
    setMounted(true)
    // Trigger page animation on mount
    setTimeout(() => setIsPageVisible(true), 100)
  }, [])
  
  const toggleExpand = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (expandedProject === null) {
      document.body.style.overflow = 'unset'
      return
    }
    
    document.body.style.overflow = 'hidden'
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedProject(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [expandedProject])


  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span 
            className="inline-block px-4 py-2 bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4 transition-all duration-700"
            style={{
              opacity: isPageVisible ? 1 : 0,
              transform: isPageVisible ? 'translateY(0)' : 'translateY(-10px)',
            }}
          >
            Projects
          </span>
          <h2 
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6 transition-all duration-700"
            style={{
              opacity: isPageVisible ? 1 : 0,
              transform: isPageVisible ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.1s',
            }}
          >
            My Projects
          </h2>
          <p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-all duration-700"
            style={{
              opacity: isPageVisible ? 1 : 0,
              transform: isPageVisible ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.2s',
            }}
          >
            A collection of my recent work and open-source contributions. All projects are
            automatically synced from my GitHub repositories.
          </p>
        </div>
        {projects.length === 0 ? (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No projects found. Make sure to set NEXT_PUBLIC_GITHUB_USERNAME in your environment
            variables.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const isTopProject = TOP_PROJECTS.includes(project.name.toLowerCase())
              return (
              <div
                key={project.id}
                className={`group relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border overflow-hidden ${
                  isTopProject
                    ? 'border-primary-400/70 dark:border-primary-500/60 ring-2 ring-primary-300/60 dark:ring-primary-700/60 shadow-primary-500/30'
                    : 'border-slate-200/50 dark:border-slate-800/50 hover:border-primary-300/50 dark:hover:border-primary-700/50'
                }`}
                style={{
                  opacity: isPageVisible ? 1 : 0,
                  transform: isPageVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `opacity 0.6s ease-out ${0.3 + index * 0.1}s, transform 0.6s ease-out ${0.3 + index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-primary-50/0 to-primary-50/0 group-hover:from-primary-50/30 group-hover:via-primary-50/20 group-hover:to-primary-50/10 dark:group-hover:from-primary-900/10 dark:group-hover:via-primary-900/5 dark:group-hover:to-primary-900/0 transition-all duration-300" />
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.name}
                    </h3>
                    {isTopProject && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-primary-100 dark:from-amber-900/40 dark:to-primary-900/30 text-amber-900 dark:text-amber-200 text-xs font-semibold rounded border border-amber-200/70 dark:border-amber-700/60">
                        🏆 Top Project
                      </span>
                    )}
                    {project.isContributed && (
                      <span
                        className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded border border-blue-300 dark:border-blue-700"
                        title={`Contributed to this project (owned by ${project.owner})`}
                      >
                        🤝 Contributed
                      </span>
                    )}
                    {project.private && (
                      <span
                        className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded border border-amber-300 dark:border-amber-700"
                        title="Private repository - code is not publicly accessible"
                      >
                        🔒 Private
                      </span>
                    )}
                  </div>
                  {project.language && (
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                      {project.language}
                    </span>
                  )}
                </div>
                <p className="relative text-slate-600 dark:text-slate-300 mb-4 line-clamp-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpand(project.id)
                  }}
                  className="relative text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold mb-4 flex items-center gap-1 group/readmore"
                >
                  Read more
                  <svg className="w-4 h-4 transition-transform group-hover/readmore:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="relative flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7.707 3.293a1 1 0 00-1.414 1.414L9.586 10l-3.293 3.293a1 1 0 101.414 1.414L11 11.414l3.293 3.293a1 1 0 001.414-1.414L12.414 10l3.293-3.293a1 1 0 00-1.414-1.414L11 8.586 7.707 5.293z" />
                    </svg>
                    {project.forks}
                  </span>
                  <span className="text-xs">
                    Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                  </span>
                </div>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                <div className="relative flex flex-wrap gap-3">
                  {contactOnlyRepos.some(
                    (repo) => repo.toLowerCase() === project.name.toLowerCase()
                  ) ? (
                    <a
                      href="/contact"
                      className="group/btn flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm font-semibold cursor-pointer shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 leading-tight"
                      title="Contact me to discuss this project"
                    >
                      Contact to Discuss
                    </a>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 leading-tight"
                      title={project.private ? 'Private repository - code is not accessible' : 'View source code on GitHub'}
                    >
                      {project.private ? 'View Details' : 'View Code'}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-white dark:hover:bg-slate-800 transition-all text-sm font-semibold leading-tight"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.blogLink && (
                    <a
                      href={project.blogLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm text-primary-700 dark:text-primary-300 rounded-xl border border-primary-200/60 dark:border-primary-700/60 hover:bg-white dark:hover:bg-slate-900 transition-all text-sm font-semibold leading-tight"
                    >
                      See Blog
                    </a>
                  )}
                  {project.experienceLink && (
                    <a
                      href={project.experienceLink.href}
                      className="flex-1 min-w-[160px] flex items-center justify-center px-4 py-2.5 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm text-primary-700 dark:text-primary-300 rounded-xl border border-primary-200/60 dark:border-primary-700/60 hover:bg-white dark:hover:bg-slate-900 transition-all text-sm font-semibold leading-tight"
                    >
                      {project.experienceLink.label}
                    </a>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
      
      {mounted && expandedProject !== null && createPortal(
        <ProjectModal
          project={projects.find((p) => p.id === expandedProject) || null}
          onClose={() => setExpandedProject(null)}
        />,
        document.body
      )}
    </section>
  )
}

// Modal component - rendered via Portal to document.body for proper viewport centering
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: Project | null
  onClose: () => void 
}) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative border border-slate-200/50 dark:border-slate-800/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors z-10"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex items-start justify-between mb-6 pr-8">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {project.name}
              </h2>
              {project.isContributed && (
                <span
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded border border-blue-300 dark:border-blue-700"
                  title={`Contributed to this project (owned by ${project.owner})`}
                >
                  🤝 Contributed
                </span>
              )}
              {project.private && (
                <span
                  className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded border border-amber-300 dark:border-amber-700"
                  title="Private repository - code is not publicly accessible"
                >
                  🔒 Private
                </span>
              )}
            </div>
            {project.language && (
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded">
                {project.language}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {project.name.toLowerCase() === 'astro' && (
            <div className="mb-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
                  <Image
                    src={assetPath('/images/bramhacks-2025-team-coolie.jpg')}
                  alt="Team Coolie celebrating the BramHacks 2025 2nd-place finish"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                Team Coolie accepting the BramHacks 2025 runner-up prize for Astro Academy.
              </p>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {project.stars} stars
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7.707 3.293a1 1 0 00-1.414 1.414L9.586 10l-3.293 3.293a1 1 0 101.414 1.414L11 11.414l3.293 3.293a1 1 0 001.414-1.414L12.414 10l3.293-3.293a1 1 0 00-1.414-1.414L11 8.586 7.707 5.293z" />
              </svg>
              {project.forks} forks
            </span>
            <span>
              Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
            </span>
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Tech Stack:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.topics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Topics:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {contactOnlyRepos.some(
              (repo) => repo.toLowerCase() === project.name.toLowerCase()
            ) ? (
              <a
                href="/contact"
                onClick={() => onClose()}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium leading-tight"
              >
                Contact to Discuss
              </a>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium leading-tight"
              >
                {project.private ? 'View Details' : 'View Code'}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-medium leading-tight"
              >
                Live Demo
              </a>
            )}
            {project.blogLink && (
              <a
                href={project.blogLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-200 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors font-medium leading-tight"
              >
                See Blog
              </a>
            )}
                {project.experienceLink && (
                  <a
                    href={project.experienceLink.href}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-200 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors font-medium leading-tight"
                  >
                    {project.experienceLink.label}
                  </a>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

