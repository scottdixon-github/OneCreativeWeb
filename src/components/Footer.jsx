import { Link } from 'react-router-dom'
import { Code2, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const sections = [
    {
      title: 'Services',
      links: [
        { name: 'Custom Websites', path: '/services/custom-website-development' },
        { name: 'E-Commerce', path: '/services/e-commerce-solutions' },
        { name: 'Web Apps', path: '/services/web-application-development' },
        { name: 'Mobile Design', path: '/services/responsive-mobile-design' },
        { name: 'UI/UX Design', path: '/services/ui-ux-design' },
        { name: 'SEO & Performance', path: '/services/seo-performance-optimization' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
        { name: 'Get a Quote', path: '/contact' },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface-sunken">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-glow-brand organic-blob opacity-50" />
      <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-glow-accent organic-blob-2 opacity-50" />

      <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-content">
                Creative<span className="gradient-text">Web</span> <span className="text-sm font-semibold text-brand">Inc.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-content-muted">
              Full-featured web development services. We build custom websites, apps, and
              e-commerce solutions that drive results.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/scottdixon-github', label: 'GitHub' },
                { icon: Mail, href: 'mailto:hello@onecreativeweb.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-content-muted transition-all hover:border-brand hover:text-brand hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-content">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm font-medium text-content-muted transition-colors hover:text-brand"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-content">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium text-content-muted">
                <Mail className="h-4 w-4 text-brand" />
                hello@onecreativeweb.com
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-content-muted">
                <Phone className="h-4 w-4 text-brand" />
                (312) 956-7549
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-content-muted">
                <MapPin className="h-4 w-4 text-brand" />
                Charleston, South Carolina
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm font-medium text-content-muted">
            © {year} Creative Web Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm font-medium text-content-muted hover:text-brand">
              Privacy Policy
            </a>
            <a href="#" className="text-sm font-medium text-content-muted hover:text-brand">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
