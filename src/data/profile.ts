export const profile = {
  name: 'Gevorg Petrosyan',
  location: 'Yerevan, Armenia',
  email: 'petrossian.gev@gmail.com',
  phone: '+374 91 530973',
  linkedin: 'https://www.linkedin.com/in/gevorgpetrosyan-445b46232',
  github: 'https://github.com/', // TODO: confirm handle
  languages: [
    { name: 'Armenian', level: 'Native' },
    { name: 'Russian', level: 'Full professional' },
    { name: 'English', level: 'Professional working' },
  ],
} as const;

/**
 * Each track is a self-contained pitch. The landing pages read entirely from
 * here, so retargeting the site at a new kind of role is a content edit.
 */
export const tracks = {
  react: {
    slug: 'react',
    label: 'Frontend Engineer',
    headline: 'React · Next.js · TypeScript',
    tagline:
      'Five years shipping production frontends — sole developer on two consumer delivery platforms, component library author on a logistics SaaS.',
    /** The single number worth leading with. */
    proof: { value: '+30%', label: 'PageSpeed Insights, Menu Group' },
    workNote: undefined,
    cta: 'See the engineering',
    skills: {
      Languages: ['JavaScript (ES6+)', 'TypeScript'],
      'Frameworks & UI': ['React', 'Next.js', 'SCSS', 'Material-UI', 'Storybook'],
      State: ['Redux Toolkit', 'Zustand', 'MobX', 'Context API'],
      Performance: ['React Profiler', 'Core Web Vitals', 'PageSpeed Insights'],
      Integrations: ['REST APIs', 'Payment gateways', 'Deep linking', 'Mixpanel', 'GA'],
      Workflow: ['Git', 'Jira', 'Figma', 'CI/CD', 'Cloudflare Pages'],
    },
  },
  webflow: {
    slug: 'webflow',
    label: 'Webflow Developer',
    headline: 'Webflow, extended with real JavaScript',
    tagline:
      'Sites built from scratch — CMS architecture, Client-First, technical SEO — then pushed past template limits with custom tools and automation.',
    proof: { value: '20+', label: 'sites built from scratch' },
    /** Shown under "Selected work" so the shown set reads as a selection. */
    workNote:
      'Seven of them, below. These are the ones clients point people to.',
    cta: 'See all seven builds',
    skills: {
      Webflow: ['From-scratch builds', 'CMS collections', 'Client-First', 'Interactions', 'SEO setup', '301s'],
      'Custom code': ['JavaScript (ES6+)', 'TypeScript', 'Calculators', 'REST APIs', 'Cloudflare Pages'],
      Automation: ['Make', 'Mailchimp', 'Trustindex', 'Lead capture', 'Payments'],
      'Performance & SEO': ['Core Web Vitals', 'Asset optimization', 'Semantic markup', 'Metadata'],
      Analytics: ['Google Analytics', 'Mixpanel', 'Event tracking'],
      'Also builds': ['React', 'Next.js', 'Redux', 'Storybook'],
    },
  },
} as const;

export type TrackSlug = keyof typeof tracks;
