'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
  isTransitioning?: boolean
}

export default function LoadingScreen({ onComplete, isTransitioning = false }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const photoRef = useRef<HTMLDivElement>(null)
  const hasCalledCompleteRef = useRef(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100 && !hasCalledCompleteRef.current) {
      hasCalledCompleteRef.current = true
      // Wait a moment to show 100% and "Welcome!" message
      const timeoutId = setTimeout(() => {
        setIsVisible(false)
        // Small delay to ensure state updates before transition
        requestAnimationFrame(() => {
          onComplete()
        })
      }, 500) // Hold at 100% for 500ms
      
      return () => clearTimeout(timeoutId)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${
        isTransitioning ? 'animate-fadeOutBackground' : isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
    >
      {/* Animated background orbs - fade out faster */}
      <div className={`absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl ${isTransitioning ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-300`} />
      <div className={`absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl ${isTransitioning ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-300`} style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Profile Photo Container - stays in flex container, uses transform when transitioning */}
        <div 
          ref={photoRef}
          className={`relative mb-8 ${isTransitioning ? 'animate-photoToHero' : ''}`}
          style={{
            willChange: isTransitioning ? 'transform, opacity' : 'auto',
            position: isTransitioning ? 'fixed' : 'relative',
            top: isTransitioning ? '50%' : 'auto',
            left: isTransitioning ? '50%' : 'auto',
            zIndex: isTransitioning ? 101 : 'auto',
          }}
        >
          {/* Glowing ring */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 opacity-75 blur-xl ${isTransitioning ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-500`} />
          
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
          
          {/* Animated rings - fade out */}
          <div className={`absolute inset-0 rounded-full border-2 border-primary-500/30 ${isTransitioning ? 'opacity-0' : 'animate-ping'} transition-opacity duration-300`} style={{ animationDelay: '0.5s' }} />
          <div className={`absolute inset-0 rounded-full border-2 border-purple-500/30 ${isTransitioning ? 'opacity-0' : 'animate-ping'} transition-opacity duration-300`} style={{ animationDelay: '1s' }} />
        </div>
        {/* Name/Title - fade out */}
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent ${isTransitioning ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-300`}>
          Jackie Liang
        </h1>
        
        {/* Loading bar - fade out */}
        <div className={`w-64 md:w-80 h-1 bg-slate-800 rounded-full overflow-hidden mb-4 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div
            className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text - fade out */}
        <p className={`text-slate-400 text-sm font-medium ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          {progress < 100 ? `Loading... ${progress}%` : 'Welcome!'}
        </p>
      </div>
    </div>
  )
}

