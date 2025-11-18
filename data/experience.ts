import { ExperienceItem } from '@/components/Experience'

// Customize your experience entries here
export const experienceData: ExperienceItem[] = [
  {
    title: 'Full Stack Software Engineer Intern',
    company: 'PathwayR',
    location: 'Toronto, Canada',
    period: 'Sep 2025 – Present',
    slug: 'pathwayr',
    description: [
      'Engineered a full-stack academic networking platform with React, Vite, and Supabase (PostgreSQL, Auth, Storage, Edge Functions), delivering secure auth and role-based dashboards ready for scale.',
      'Designed and tuned a PostgreSQL schema with 15+ tables, complex foreign keys, and Row-Level Security to protect sensitive academic data while improving query efficiency by ~35%.',
      'Built an AI-powered recommendation engine in TypeScript to match students with research opportunities, decreasing manual pairing work by 70%.',
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'Supabase', 'PostgreSQL', 'Edge Functions', 'AI'],
  },
  {
    title: 'Full Stack Software Engineer Intern',
    company: 'MyHomie Homes Inc.',
    location: 'San Francisco, CA',
    period: 'May 2025 – Present',
    slug: 'myhomie-homes',
    description: [
      'Developed an ML-driven valuation pipeline with Python, Flask, PostgreSQL, and Azure, combining Gradient Boosting (85% accuracy) and Random Forest models (80% accuracy) across 7 counties.',
      'Automated data ingestion for 500K+ property records, including feature extraction, JSON-to-CSV normalization, geospatial parsing, and retraining workflows.',
      'Integrated Google Maps, Stripe, and OpenAI/Gemini APIs for geocoding, payments, and description analysis, improving reliability and reducing manual input.',
      'Shipped a RAG-based retrieval system using semantic search and ML similarity scoring, deployed on Azure with Flask REST APIs, Nginx, and systemd automation to cut review time by 40%.',
      'Launched the public-facing MyHomie experience so investors and buyers can explore valuations live.',
    ],
    technologies: ['Python', 'Flask', 'PostgreSQL', 'Azure', 'ML', 'Stripe', 'Google Maps', 'OpenAI'],
    links: [
      {
        label: 'Visit myhomie.homes',
        href: 'https://myhomie.homes/',
      },
    ],
  },
]

