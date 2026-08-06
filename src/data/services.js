import {
  Code2, ShoppingBag, Smartphone, Palette, Search, Zap,
  Layout, Server, ShieldCheck, Gauge, GitBranch, Cloud,
} from 'lucide-react'

export const services = [
  {
    slug: 'custom-website-development',
    icon: Code2,
    title: 'Custom Website Development',
    tagline: 'Tailor-made websites built from scratch',
    description:
      'We craft pixel-perfect, fully custom websites that reflect your brand identity. No templates — every line of code is written to meet your unique requirements.',
    features: [
      'Responsive design for all devices',
      'SEO-optimized semantic markup',
      'Accessibility (WCAG 2.1) compliant',
      'CMS integration (WordPress, Strapi, Sanity)',
      'Custom animations & micro-interactions',
      'Cross-browser compatibility',
    ],
    technologies: ['React', 'Next.js', 'Vue', 'Astro', 'TailwindCSS', 'TypeScript'],
    startingPrice: '$2,500',
    deliveryTime: '3–6 weeks',
    highlights: [
      { icon: Layout, label: 'Best Design' },
      { icon: Gauge, label: 'Performance Optimized' },
      { icon: GitBranch, label: 'Version Controlled' },
    ],
  },
  {
    slug: 'e-commerce-solutions',
    icon: ShoppingBag,
    title: 'E-Commerce Solutions',
    tagline: 'Sell smarter with powerful online stores',
    description:
      'Launch a full-featured online store with secure checkout, inventory management, and seamless payment integration. Built to scale from your first sale to millions.',
    features: [
      'Secure payment gateways (Stripe, PayPal, Apple Pay)',
      'Inventory & order management dashboard',
      'Product catalog with variants & filtering',
      'Shopping cart & wishlist functionality',
      'Customer accounts & order tracking',
      'Analytics & conversion tracking',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Medusa', 'Next.js Commerce', 'Stripe', 'Supabase'],
    startingPrice: '$4,000',
    deliveryTime: '4–8 weeks',
    highlights: [
      { icon: ShoppingBag, label: 'Full Store Setup' },
      { icon: ShieldCheck, label: 'Secure Checkout' },
      { icon: Server, label: 'Scalable Backend' },
    ],
  },
  {
    slug: 'web-application-development',
    icon: Zap,
    title: 'Web Application Development',
    tagline: 'Complex apps that scale with your business',
    description:
      'From SaaS platforms to internal tools, we build robust web applications with real-time features, authentication, and database architecture designed for growth.',
    features: [
      'User authentication & role-based access',
      'Real-time data with WebSockets',
      'REST & GraphQL API development',
      'Database design & optimization',
      'Third-party API integrations',
      'Automated testing & CI/CD pipelines',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'GraphQL', 'Docker'],
    startingPrice: '$10,000',
    deliveryTime: '6–12 weeks',
    highlights: [
      { icon: Zap, label: 'Real-time Features' },
      { icon: Cloud, label: 'Cloud Deployed' },
      { icon: ShieldCheck, label: 'Enterprise Security' },
    ],
  },
  {
    slug: 'responsive-mobile-design',
    icon: Smartphone,
    title: 'Responsive & Mobile Design',
    tagline: 'Flawless experiences on every screen size',
    description:
      'Your users are on mobile. We design and build mobile-first experiences that look stunning and perform flawlessly across phones, tablets, and desktops.',
    features: [
      'Mobile-first responsive layouts',
      'Touch-optimized interactions',
      'Progressive Web App (PWA) capabilities',
      'App-like navigation patterns',
      'Offline functionality & caching',
      'Push notification support',
    ],
    technologies: ['React', 'PWA', 'Service Workers', 'TailwindCSS', 'Framer Motion'],
    startingPrice: '$1,800',
    deliveryTime: '2–4 weeks',
    highlights: [
      { icon: Smartphone, label: 'Mobile First' },
      { icon: Gauge, label: 'Lightning Fast' },
      { icon: Zap, label: 'App-like Feel' },
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Beautiful interfaces backed by user research',
    description:
      'We design intuitive, conversion-focused interfaces. From wireframes to high-fidelity prototypes, every element is crafted with your users in mind.',
    features: [
      'User research & persona development',
      'Wireframing & user flow mapping',
      'High-fidelity Figma prototypes',
      'Design system & component library',
      'Usability testing & iteration',
      'Handoff with developer-ready specs',
    ],
    technologies: ['Figma', 'Framer', 'Adobe XD', 'Principle', 'Storybook'],
    startingPrice: '$1,500',
    deliveryTime: '2–5 weeks',
    highlights: [
      { icon: Palette, label: 'Pixel Perfect' },
      { icon: Layout, label: 'Design System' },
      { icon: Search, label: 'User Tested' },
    ],
  },
  {
    slug: 'seo-performance-optimization',
    icon: Search,
    title: 'SEO & Performance Optimization',
    tagline: 'Rank higher, load faster, convert better',
    description:
      'Get found on Google and keep users engaged. We optimize your site for search engines and peak performance with Core Web Vitals in the green.',
    features: [
      'Technical SEO audit & implementation',
      'Core Web Vitals optimization',
      'Schema markup & structured data',
      'Image & asset optimization',
      'Lighthouse score 90+ guarantee',
      'Ongoing performance monitoring',
    ],
    technologies: ['Lighthouse', 'Schema.org', 'Google Search Console', 'Analytics', 'CDN'],
    startingPrice: '$800',
    deliveryTime: '1–3 weeks',
    highlights: [
      { icon: Search, label: 'SEO Optimized' },
      { icon: Gauge, label: '90+ Lighthouse' },
      { icon: Zap, label: 'Fast Loading' },
    ],
  },
]

export const portfolioProjects = [
  {
    title: 'Nimbus Cloud Dashboard',
    category: 'Web Application',
    description: 'A real-time cloud infrastructure monitoring dashboard for DevOps teams.',
    tags: ['React', 'Node.js', 'WebSockets', 'D3.js'],
    gradient: 'from-indigo-500 to-cyan-400',
    shape: 'organic-blob',
  },
  {
    title: 'Verdant Organic Shop',
    category: 'E-Commerce',
    description: 'A full-featured organic grocery store with same-day delivery scheduling.',
    tags: ['Next.js', 'Shopify', 'Stripe', 'TailwindCSS'],
    gradient: 'from-emerald-500 to-teal-400',
    shape: 'organic-blob-2',
  },
  {
    title: 'Pulse Fitness App',
    category: 'Mobile / PWA',
    description: 'A progressive web app for workout tracking with offline support.',
    tags: ['React PWA', 'IndexedDB', 'Service Workers'],
    gradient: 'from-orange-500 to-rose-400',
    shape: 'organic-blob-3',
  },
  {
    title: 'Atlas Travel Platform',
    category: 'Custom Website',
    description: 'A luxury travel booking platform with interactive itinerary builder.',
    tags: ['Vue', 'Nuxt', 'Mapbox', 'GraphQL'],
    gradient: 'from-violet-500 to-fuchsia-400',
    shape: 'organic-blob-2',
  },
  {
    title: 'Quantum Finance Portal',
    category: 'Web Application',
    description: 'An enterprise financial dashboard with real-time market data.',
    tags: ['React', 'TypeScript', 'D3.js', 'AWS'],
    gradient: 'from-blue-500 to-sky-400',
    shape: 'organic-blob',
  },
  {
    title: 'Bloom Studio Portfolio',
    category: 'UI/UX Design',
    description: 'Award-winning portfolio site for a creative design studio.',
    tags: ['Figma', 'Framer Motion', 'GSAP'],
    gradient: 'from-rose-500 to-amber-400',
    shape: 'organic-blob-3',
  },
]

export const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, Verdant Organics',
    content:
      'Creative Web Inc. transformed our online store. Sales jumped 180% in the first quarter after launch. The team understood our vision perfectly.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'James Chen',
    role: 'CTO, Nimbus Systems',
    content:
      'The dashboard they built is a masterpiece. Real-time data, beautiful UI, and it handles thousands of concurrent users without breaking a sweat.',
    rating: 5,
    avatar: 'JC',
  },
  {
    name: 'Amelia Rodriguez',
    role: 'Founder, Pulse Fitness',
    content:
      'They turned our app idea into a stunning PWA. Offline support works flawlessly and user engagement has never been higher.',
    rating: 5,
    avatar: 'AR',
  },
  {
    name: 'David Okafor',
    role: 'Marketing Director, Atlas Travel',
    content:
      'Our new booking platform is gorgeous and converts like crazy. The interactive itinerary builder is a game-changer for our customers.',
    rating: 5,
    avatar: 'DO',
  },
]

export const stats = [
  { value: 'Hundreds of', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5 plus', label: 'Years Experience' },
  
]

export const processSteps = [
  {
    number: 'Step 1',
    title: 'Discovery & Planning',
    description:
      'We dive deep into your business goals, target audience, and project requirements to create a comprehensive roadmap.',
  },
  {
    number: 'Step 2',
    title: 'Design & Prototyping',
    description:
      'Our designers craft wireframes and interactive prototypes, refining the user experience before a single line of code is written.',
  },
  {
    number: 'Step 3',
    title: 'Development & Testing',
    description:
      'We build your product using modern technologies with rigorous testing at every stage to ensure quality and performance.',
  },
  {
    number: 'Step 4',
    title: 'Launch & Support',
    description:
      'We deploy your project to production and provide ongoing maintenance and hosting services, updates, and support to keep everything running smoothly.',
  },
]
