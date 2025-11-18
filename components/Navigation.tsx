'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { assetPath } from '@/lib/assetPath'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme
  const isDark = currentTheme === 'dark'

  const renderThemeIcon = () => {
    if (!mounted) {
      return <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    }
    if (isDark) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95 5.636 18.364m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    )
  }

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500/60 shadow-lg group-hover:scale-105 transition-transform">
                <Image
                  src={assetPath('/images/jackie-liang-headshot.jpg')}
                  alt="Jackie Liang headshot"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-primary-800 dark:group-hover:from-primary-300 dark:group-hover:to-primary-400">
                Jackie Liang
              </span>
            </Link>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="w-10 h-10 rounded-full border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md flex items-center justify-center transition-all disabled:opacity-50"
              aria-label="Toggle theme"
              disabled={!mounted}
            >
              {renderThemeIcon()}
            </button>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full px-2 py-2 border border-slate-200/50 dark:border-slate-800/50">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 relative group ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!isActive && (
                    <span className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

