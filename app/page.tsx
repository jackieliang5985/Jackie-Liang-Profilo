'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

export default function Home() {
  type Phase = 'loading' | 'transition' | 'done'
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)

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
    if (progress >= 100 && phase === 'loading') {
      // Hold at 100% briefly so the bar visibly completes
      const timer = setTimeout(() => {
        setPhase('transition')
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, phase])

  useEffect(() => {
    if (phase === 'transition') {
      // Shorter delay so hero content appears quickly after the photo animation
      const timer = setTimeout(() => {
        setPhase('done')
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero phase={phase} progress={progress} />
    </main>
  )
}

