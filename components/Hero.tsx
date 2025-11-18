'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type HeroPhase = 'loading' | 'transition' | 'done'

interface HeroProps {
  phase?: HeroPhase
  progress?: number
}

export default function Hero({ phase = 'loading', progress = 0 }: HeroProps) {
  const router = useRouter()
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const glow2Ref = useRef<HTMLDivElement>(null)
  const trailingRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const photoRef = useRef<HTMLDivElement>(null)

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Use requestAnimationFrame for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x, y })
        
        // Direct DOM manipulation for better performance
        if (glowRef.current) {
          glowRef.current.style.left = `${x}px`
          glowRef.current.style.top = `${y}px`
        }
        if (glow2Ref.current) {
          glow2Ref.current.style.left = `${x}px`
          glow2Ref.current.style.top = `${y}px`
        }
        if (trailingRef.current) {
          trailingRef.current.style.left = `${x}px`
          trailingRef.current.style.top = `${y}px`
        }
      })
    }
  }, [])

  useEffect(() => {
    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove)
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }
  }, [handleMouseMove])

  // Calculate photo position for animation
  useEffect(() => {
    const updatePhotoPosition = () => {
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect()
        // Calculate offset from viewport center to photo center
        const centerX = rect.left + rect.width / 2 - window.innerWidth / 2
        const centerY = rect.top + rect.height / 2 - window.innerHeight / 2
        
        // Update CSS variable for animation end position
        document.documentElement.style.setProperty('--photo-end-x', `${centerX}px`)
        document.documentElement.style.setProperty('--photo-end-y', `${centerY}px`)
      }
    }
    
    // Calculate position after a brief delay to ensure layout is ready
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        updatePhotoPosition()
      })
    }, 50)
    
    // Also update on resize
    window.addEventListener('resize', updatePhotoPosition)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePhotoPosition)
    }
  }, [])

  const handleButtonClick = (buttonId: string, path: string) => {
    setActiveButton(buttonId)
    setTimeout(() => {
      router.push(path)
    }, 200)
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Main mouse tracking glow - optimized */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.25) 30%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: mousePosition.x > 0 && mousePosition.y > 0 ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Secondary glow */}
      <div
        ref={glow2Ref}
        className="pointer-events-none absolute w-[250px] h-[250px] rounded-full blur-2xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: mousePosition.x > 0 && mousePosition.y > 0 ? 0.5 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Trailing effect */}
      <div
        ref={trailingRef}
        className="pointer-events-none absolute w-24 h-24 rounded-full blur-xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%) scale(0.6)',
          opacity: mousePosition.x > 0 && mousePosition.y > 0 ? 0.3 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />


      {/* Loading overlay with photo, progress bar, and text */}
      {phase === 'loading' && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
          {/* Animated background orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Profile Photo Container - stays stationary during loading */}
            <div className="relative mb-8">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 opacity-75 blur-xl animate-pulse" />
              
            {/* Photo container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-500/50 dark:border-primary-400/50 shadow-2xl">
              <Image
                src="/images/jackie-liang-headshot.jpg"
                alt="Jackie Liang"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
              
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" style={{ animationDelay: '1s' }} />
            </div>

            {/* Name/Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 via-purple-500 to-primary-600 dark:from-primary-400 dark:via-purple-400 dark:to-primary-400 bg-clip-text text-transparent animate-pulse">
              Jackie Liang
            </h1>
            
            {/* Loading bar */}
            <div className="w-64 md:w-80 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Loading text */}
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              {progress < 100 ? `Loading... ${progress}%` : 'Welcome!'}
            </p>
          </div>
        </div>
      )}

      {/* Animated photo transition - only after loading completes */}
      {phase === 'transition' && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          style={{
            animation: 'fadeOutBackground 0.8s ease-out 0.2s forwards',
          }}
        >
          <div
            className="relative"
            style={{
              animation: 'photoToHero 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 opacity-50 blur-2xl" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-500/50 dark:border-primary-400/50 shadow-2xl">
              <Image
                src="/images/jackie-liang-headshot.jpg"
                alt="Jackie Liang"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Profile Photo - final position */}
        <div 
          ref={photoRef}
          className="mb-8"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.6s ease-out forwards' : 'none',
          }}
        >
          <div className="relative inline-block">
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 opacity-50 blur-2xl animate-pulse" />
            
            {/* Photo container */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-500/50 dark:border-primary-400/50 shadow-2xl ring-4 ring-primary-500/20">
              <Image
                src="/images/jackie-liang-headshot.jpg"
                alt="Jackie Liang"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
                priority
              />
            </div>
          </div>
        </div>
        
        <div 
          className="inline-block mb-6"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.8s ease-out 0.3s forwards' : 'none',
          }}
        >
          <span className="px-4 py-2 bg-primary-100/80 dark:bg-primary-900/30 backdrop-blur-sm text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200/50 dark:border-primary-700/50">
            Software Developer & Engineer
          </span>
        </div>
        
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 relative"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.8s ease-out 0.4s forwards' : 'none',
          }}
        >
          <span 
            className="relative bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 will-change-transform"
            style={{
              filter: mousePosition.x > 0 && mousePosition.y > 0 
                ? `drop-shadow(0 0 25px rgba(99,102,241,0.5))`
                : 'none',
              transition: 'filter 0.2s ease-out',
            }}
          >
            Hi, I'm
          </span>
          <br />
          <span 
            className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 will-change-transform"
            style={{
              filter: mousePosition.x > 0 && mousePosition.y > 0 
                ? `drop-shadow(0 0 35px rgba(99,102,241,0.6)) drop-shadow(0 0 70px rgba(139,92,246,0.4))`
                : 'none',
              transition: 'filter 0.2s ease-out',
            }}
          >
            Jackie Liang
          </span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-400 mb-4 max-w-3xl mx-auto"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.8s ease-out 0.5s forwards' : 'none',
          }}
        >
          Building digital experiences that matter
        </p>
        <p 
          className="text-lg md:text-xl text-slate-500 dark:text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.8s ease-out 0.5s forwards' : 'none',
          }}
        >
          I craft elegant solutions to complex problems, turning ideas into scalable, performant applications.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            animation: phase === 'done' ? 'fadeIn 0.8s ease-out 0.6s forwards' : 'none',
          }}
        >
          <button
            onClick={() => handleButtonClick('work', '/projects')}
            className={`group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 dark:shadow-primary-500/20 overflow-hidden transition-all duration-300 transform ${
              activeButton === 'work'
                ? 'scale-95 shadow-2xl shadow-primary-500/40'
                : 'hover:scale-105 hover:shadow-xl hover:shadow-primary-500/30 active:scale-95'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                {activeButton === 'work' && (
              <span className="absolute inset-0 bg-white opacity-20 animate-ripple"></span>
            )}
          </button>
          
          <button
            onClick={() => handleButtonClick('contact', '/contact')}
            className={`group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold overflow-hidden transition-all duration-300 transform ${
              activeButton === 'contact'
                ? 'scale-95 border-primary-300 dark:border-primary-600'
                : 'hover:scale-105 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-white dark:hover:bg-slate-800 active:scale-95'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get In Touch
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
                {activeButton === 'contact' && (
              <span className="absolute inset-0 bg-primary-100/30 dark:bg-primary-900/30 animate-ripple"></span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}