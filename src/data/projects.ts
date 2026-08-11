export type Project = {
  slug: string
  name: string
  color: string
  description: string
}

export const projects: Project[] = [
  {
    slug: 'website-redesign',
    name: 'Website Redesign',
    color: 'bg-amber-400',
    description: 'Refresh the marketing site with the new brand system and a faster page-load experience.',
  },
  {
    slug: 'q3-marketing-plan',
    name: 'Q3 Marketing Plan',
    color: 'bg-emerald-400',
    description: 'Plan campaigns, content, and budget allocation for the third quarter.',
  },
  {
    slug: 'mobile-app-launch',
    name: 'Mobile App Launch',
    color: 'bg-sky-400',
    description: 'Coordinate engineering, QA, and store listings for the mobile app release.',
  },
  {
    slug: 'customer-onboarding',
    name: 'Customer Onboarding',
    color: 'bg-rose-400',
    description: 'Streamline the new customer setup flow to reduce time-to-first-value.',
  },
]
