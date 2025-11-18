'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

export default function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="about"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            About
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-10">
            <div className="relative w-full max-w-[20rem] md:max-w-[26rem] mx-auto aspect-[2/3] md:aspect-[9/12]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-primary-500/20 blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-primary-500/30 dark:border-primary-400/30 shadow-2xl">
                <Image
                  src="/images/jackie-liang-fullbody.jpg"
                  alt="Jackie Liang"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 shadow-sm text-center md:text-left">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Let’s build something impactful.</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  I’m open to full-stack internships, product-focused SWE roles, and opportunities to tackle large-scale data or
                  AI-driven problems. If you’re building tools that help people and need someone who can ship fast with polish, let’s chat.
                </p>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium">
                  <a
                    href="https://www.linkedin.com/in/jackie-liang-1abc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-primary-200/60 dark:border-primary-700/60 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/jackieliang5985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'JavaScript',
                    'TypeScript',
                    'React',
                    'Next.js',
                    'Node.js',
                    'Python',
                    'Git',
                    'Docker',
                    'AWS',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200/50 dark:border-primary-700/30 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm a passionate software developer with expertise in building scalable web applications.
                I love turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open
                source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 shadow-sm">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-primary-500/40 shadow-md">
                <Image
                  src="/images/utoronto-coa.svg.png"
                  alt="University of Toronto Crest"
                  fill
                  className="object-contain p-4"
                  sizes="96px"
                />
              </div>
              <div className="text-left">
                <p className="text-sm uppercase tracking-wide text-primary-600 dark:text-primary-300 font-semibold">
                  University of Toronto (ASIP)
                </p>
                <p className="text-base text-slate-700 dark:text-slate-200 font-medium">
                  B.Sc. in Computer Science
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

