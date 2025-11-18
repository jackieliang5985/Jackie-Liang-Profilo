'use client'

import { useEffect, useState, useRef } from 'react'
import { experienceData } from '@/data/experience'

export interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  links?: {
    label: string
    href: string
  }[]
  slug?: string
}

export default function Experience() {
  const experiences = experienceData
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            Experience
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-primary-300 dark:from-primary-700 dark:via-primary-600 dark:to-primary-700" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} id={exp.slug ?? undefined} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full ring-4 ring-white dark:ring-slate-950 shadow-lg" />
                
                <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary-300/50 dark:hover:border-primary-700/50">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{exp.location}</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-slate-600 dark:text-slate-300 flex items-start gap-3"
                      >
                        <span className="text-primary-600 dark:text-primary-400 mt-1.5 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {exp.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300 bg-primary-50/80 dark:bg-primary-900/20 border border-primary-200/60 dark:border-primary-700/50 rounded-xl hover:bg-primary-100/80 dark:hover:bg-primary-900/30 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14h14" />
                          </svg>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-semibold border border-primary-200/50 dark:border-primary-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

