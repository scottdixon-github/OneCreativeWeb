import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FileText,
  ShieldCheck,
  Scale,
  CreditCard,
  Code2,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import ParticleField from '../components/ParticleField.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedOrb from '../components/AnimatedOrb.jsx'
import SEO from '../components/SEO.jsx'

export default function Terms() {
  const [activeSection, setActiveSection] = useState(null)

  const sections = [
    {
      id: 'agreement',
      title: '1. Agreement to Terms',
      icon: Scale,
      content: [
        'By accessing our website (onecreativeweb.com) or engaging One Creative Web .com ("Company," "we," "our," or "us") for web development, design, maintenance, or consulting services, you agree to be bound by these Terms of Service.',
        'If you are entering into this agreement on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms.',
        'If you do not agree to all terms and conditions set forth herein, you must immediately discontinue use of our site and services.',
      ],
    },
    {
      id: 'services',
      title: '2. Scope of Services & Project Proposals',
      icon: Code2,
      content: [
        'One Creative Web .com provides custom web development, e-commerce solutions, web applications, responsive UI/UX design, performance optimization, and related digital services.',
        'All client projects are governed by an individual Statement of Work (SOW), project quote, or formal proposal detailing project deliverables, milestones, technical specifications, and delivery timelines.',
        'Any modification, feature request, or change in project scope outside of the agreed SOW requires written mutual approval and may be subject to additional fees or adjusted delivery timelines ("Change Orders").',
      ],
    },
    {
      id: 'payments',
      title: '3. Pricing, Deposits & Payment Terms',
      icon: CreditCard,
      content: [
        'Project pricing is specified in the applicable proposal. Unless agreed otherwise in writing, fixed-price projects require an initial deposit (typically 50%) prior to project kickoff, with remaining payments tied to agreed milestones and final launch.',
        'Invoices are due upon receipt or within the net payment terms specified on the invoice (typically 14 calendar days). Late payments may incur a finance charge of 1.5% per month or the maximum rate permitted by law.',
        'Final website files, database credentials, server deployments, and domain transfers will be released upon receipt of full payment of all outstanding invoices.',
      ],
    },
    {
      id: 'ip-ownership',
      title: '4. Intellectual Property & Ownership Rights',
      icon: ShieldCheck,
      content: [
        'Client Ownership: Upon receipt of full and final payment, you own all rights, title, and interest in the custom code, custom graphics, and unique design layouts created specifically for your project.',
        'Pre-Existing & Open-Source Tools: Code libraries, frameworks (such as React, Vite, TailwindCSS), open-source packages, and reusable proprietary agency utilities remain the property of their respective owners or licensors, granted to you under standard perpetual, non-exclusive license terms.',
        'Portfolio Rights: One Creative Web .com retains the right to display completed project screenshots, design previews, and links in our portfolio, case studies, and marketing materials, unless a formal Non-Disclosure Agreement (NDA) specifies otherwise.',
      ],
    },
    {
      id: 'client-responsibilities',
      title: '5. Client Responsibilities & Asset Submission',
      icon: CheckCircle2,
      content: [
        'Timely Deliverables: You agree to provide all required text, images, brand guidelines, API credentials, and third-party account access needed to complete the project in a timely manner.',
        'Copyright & Legal Compliance: You warrant that all content, logos, artwork, audio, and trademarks provided to us are either owned by you or that you possess full legal authorization to use them.',
        'Delays: Project timelines depend heavily on prompt feedback. Delays of more than 30 business days without communication may result in project archiving or rescheduling fees.',
      ],
    },
    {
      id: 'revisions',
      title: '6. Review, Revisions & Project Acceptance',
      icon: Clock,
      content: [
        'Included Revisions: Each milestone includes a designated number of review rounds (typically 2 to 3 iterations) within the defined project scope.',
        'Acceptance Period: Upon milestone completion or staging site presentation, you will have ten (10) business days to test and provide written feedback. If no feedback or punch-list items are submitted within this period, deliverables are deemed accepted.',
      ],
    },
    {
      id: 'hosting-third-party',
      title: '7. Hosting, Maintenance & Third-Party Services',
      icon: ExternalLink,
      content: [
        'Third-Party Providers: We frequently integrate external APIs, payment gateways (such as Stripe), hosting platforms (such as Vercel, AWS, Cloudflare), and plugins. We are not liable for outages, policy shifts, pricing changes, or disruptions caused by external third-party providers.',
        'Post-Launch Warranty: We provide a 30-day bug-fix warranty following production deployment covering defects or regressions in custom code authored by us. Ongoing maintenance, security patches, and feature updates require an active maintenance agreement.',
      ],
    },
    {
      id: 'warranties-liability',
      title: '8. Warranties, Disclaimers & Limitation of Liability',
      icon: AlertCircle,
      content: [
        'Services are provided on an "as is" and "as available" basis. While we adhere to industry best practices in web architecture, accessibility, and cybersecurity, we make no guarantees of specific search engine rankings, sales volumes, or uninterrupted site operation.',
        'To the fullest extent permitted by law, One Creative Web .com shall not be liable for any indirect, incidental, consequential, special, or punitive damages (including lost profits, lost revenue, or data loss) arising out of or related to our services.',
        'Our aggregate liability for any and all claims related to a project shall not exceed the total fees actually paid by you to One Creative Web .com for that specific project during the six (6) months preceding the claim.',
      ],
    },
    {
      id: 'termination',
      title: '9. Cancellation & Termination',
      icon: HelpCircle,
      content: [
        'Either party may terminate an active project upon written notice if the other party breaches a material term and fails to cure such breach within fourteen (14) days.',
        'In the event of early termination, you will be invoiced for all work performed and billable hours incurred up to the effective termination date. Pre-paid deposits for unperformed work will be refunded pro-rata, minus non-refundable third-party licensing expenses.',
      ],
    },
    {
      id: 'governing-law',
      title: '10. Governing Law & Jurisdiction',
      icon: Scale,
      content: [
        'These Terms of Service and any project disputes shall be governed by and construed in accordance with the laws of the State of South Carolina, United States, without regard to conflict of law principles.',
        'Any legal action or proceeding arising out of or relating to these Terms shall be instituted exclusively in the state or federal courts located in Charleston County, South Carolina.',
      ],
    },
  ]

  return (
    <div className="noise-bg pt-32 sm:pt-36">
      <SEO
        title="Terms of Service"
        description="Review the Terms of Service for One Creative Web .com. Learn about our project scopes, payment terms, intellectual property ownership, and client agreements."
        keywords="terms of service, web development terms, One Creative Web terms, client agreement, website development contract"
        canonical="https://www.onecreativeweb.com/terms"
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ParticleField particleCount={30} connectionDistance={85} />
        <FloatingShapes />
        <AnimatedOrb className="right-[15%] top-[10%]" size="h-64 w-64" color="brand" />
        <AnimatedOrb className="left-[10%] bottom-[10%]" size="h-56 w-56" color="accent" delay={3} />

        <div className="container-max relative">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/60 px-5 py-2.5 text-sm font-semibold text-brand backdrop-blur-sm shadow-sm">
              <FileText className="h-4 w-4" />
              Legal Documentation
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-[1.1] text-content sm:text-5xl lg:text-6xl text-balance">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-content-muted text-pretty">
              Please read these terms carefully before engaging our services. They outline our
              commitments, project agreements, intellectual property ownership, and service guidelines.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-sunken/60 px-4 py-1.5 text-xs font-semibold text-content-muted">
              <span>Last Updated: October 2026</span>
              <span>•</span>
              <span>Effective Immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Highlights Banner */}
      <section className="relative border-y border-line bg-surface-sunken/60 py-8">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: 'You Own Your Code',
                desc: 'Upon full payment, custom design and code are 100% owned by your company.',
              },
              {
                icon: FileText,
                title: 'Clear SOW Agreements',
                desc: 'Every project is scoped in advance with milestones and transparent pricing.',
              },
              {
                icon: Clock,
                title: '30-Day Bug Warranty',
                desc: 'Post-launch code warranty included on all production releases.',
              },
              {
                icon: Scale,
                title: 'Fair & Transparent',
                desc: 'Clear revision rounds, milestones, and mutual confidentiality protections.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-content">{title}</h2>
                  <p className="mt-1 text-xs text-content-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-3xl border border-line bg-surface-elevated/70 p-6 backdrop-blur-md shadow-sm">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-content">
                  Table of Contents
                </h2>
                <nav className="mt-4 space-y-1.5">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`block rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        activeSection === section.id
                          ? 'bg-brand/10 text-brand font-semibold'
                          : 'text-content-muted hover:bg-surface-sunken hover:text-content'
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 border-t border-line pt-6">
                  <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-accent/10 p-4">
                    <div className="flex items-center gap-2 font-display text-xs font-bold text-content">
                      <HelpCircle className="h-4 w-4 text-brand" />
                      Have Questions?
                    </div>
                    <p className="mt-1.5 text-xs text-content-muted leading-relaxed">
                      Need custom contract terms, an enterprise MSA, or an NDA prior to discussion?
                    </p>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                    >
                      Contact Our Team <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Terms Articles */}
            <div className="space-y-8 lg:col-span-8">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="card p-6 sm:p-8 scroll-mt-28"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/15 to-accent/15 text-brand ring-1 ring-brand/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="font-display text-lg font-bold text-content sm:text-xl">
                        {section.title}
                      </h2>
                    </div>

                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-content-muted">
                      {section.content.map((paragraph, idx) => (
                        <p key={idx} className="text-pretty">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.article>
                )
              })}

              {/* Contact & Inquiries Card */}
              <div className="card-organic border border-brand/30 bg-gradient-to-br from-brand/10 via-surface-elevated to-accent/10 p-8 text-center sm:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-glow-brand">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-content">
                  Legal Notices & Contact Information
                </h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-content-muted">
                  Questions regarding these Terms of Service or formal notices should be directed to:
                </p>
                <div className="mt-4 font-display text-base font-bold text-brand">
                  hello@onecreativeweb.com
                </div>
                <p className="mt-1 text-xs text-content-subtle">
                  One Creative Web .com • Charleston, South Carolina, USA
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Link to="/contact" className="btn-primary text-sm">
                    Get in Touch
                  </Link>
                  <Link to="/privacy" className="btn-secondary text-sm">
                    Read Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
