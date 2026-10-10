import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  Cookie,
  UserCheck,
  Globe,
  Bell,
  Mail,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Database,
  FileCheck,
} from 'lucide-react'
import ParticleField from '../components/ParticleField.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedOrb from '../components/AnimatedOrb.jsx'
import SEO from '../components/SEO.jsx'

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(null)

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction & Overview',
      icon: ShieldCheck,
      content: [
        'One Creative Web .com ("Company," "we," "our," or "us") is dedicated to protecting your privacy and personal data. This Privacy Policy details how we collect, use, disclose, and safeguard your information when you visit onecreativeweb.com or engage us for web development, design, and digital agency services.',
        'We adhere to the fundamental principle of data minimization: we only collect information necessary to provide high-quality services, respond to project inquiries, and ensure website security and performance.',
        'By using our website or submitting information through our contact and quote forms, you consent to the practices described in this Privacy Policy.',
      ],
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: Database,
      content: [
        'Personal Information You Provide Directly: When you fill out our contact form, request a project quote, or email us, you may provide your name, business email address, company name, phone number, project budget range, and project specifications.',
        'Client Project Materials: In the course of building your custom website or web application, you may share brand assets, text copy, imagery, API keys, or technical specifications. These materials are treated with strict confidentiality.',
        'Technical & Device Data: When you browse our site, our servers automatically log technical metadata including IP addresses, browser types, operating systems, referring URLs, pages viewed, and access timestamps.',
        'We do NOT collect sensitive personal data such as social security numbers, medical records, or biometric information.',
      ],
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      icon: Eye,
      content: [
        'To Respond & Provide Quotes: Delivering customized consultations, scoping proposals, and responding to inquiries submitted through our website.',
        'To Deliver Services: Designing, developing, testing, deploying, and supporting custom websites, e-commerce stores, and web applications.',
        'To Communicate: Sending project updates, invoices, milestone reviews, and customer service notices.',
        'To Maintain Security & Performance: Monitoring website traffic for malicious activity, DDoS prevention, debugging technical errors, and optimizing page load speeds.',
        'We never sell, rent, or trade your personal information to third-party data brokers or marketing list aggregators.',
      ],
    },
    {
      id: 'cookies',
      title: '4. Cookies & Tracking Technologies',
      icon: Cookie,
      content: [
        'Essential Cookies: Required for core site functionality, including remembering your dark/light theme preference and maintaining session integrity.',
        'Cookie Preference Storage: We store your cookie consent preferences in local browser storage ("cwi-cookie-consent") so you are not repeatedly prompted.',
        'Analytics & Performance: We may use lightweight, privacy-focused analytics to evaluate visitor trends, high-performing service pages, and mobile responsiveness. You can decline optional cookies at any time via our Cookie Preferences banner.',
        'You can also control or delete cookies through your browser settings. Note that disabling essential cookies may affect visual display preferences.',
      ],
    },
    {
      id: 'third-parties',
      title: '5. Third-Party Service Providers',
      icon: Server,
      content: [
        'We partner with reputable infrastructure providers to operate our business securely:',
        '• Hosting & CDN Infrastructure: Fast, secure edge delivery via providers such as Vercel and Cloudflare.',
        '• Email & Communication Routing: Secure transactional email delivery for inquiry routing and client correspondence.',
        '• Payment Processing: For invoice settlement, transactions are processed securely through certified PCI-compliant gateways (such as Stripe). We do not store credit card numbers on our servers.',
        'All third-party vendors are contractually bound to maintain rigorous data privacy standards and process data solely on our instructions.',
      ],
    },
    {
      id: 'security',
      title: '6. Data Security & Storage',
      icon: Lock,
      content: [
        'We employ robust administrative, technical, and physical safeguards to protect personal information against unauthorized access, destruction, loss, or alteration.',
        'All web traffic is transmitted via HTTPS with modern Transport Layer Security (TLS/SSL) encryption.',
        'Internal access to project credentials and client materials is restricted on a strict need-to-know basis and protected by multi-factor authentication (MFA).',
      ],
    },
    {
      id: 'retention',
      title: '7. Data Retention Guidelines',
      icon: FileCheck,
      content: [
        'We retain inquiry information and project records only for as long as necessary to fulfill the purposes outlined in this Policy, comply with legal accounting obligations, or maintain active client relationships.',
        'If you request deletion of your information, we will securely purge your personal records from our active systems, except where retention is legally required (e.g., tax receipts or signed contracts).',
      ],
    },
    {
      id: 'user-rights',
      title: '8. Your Rights & Choices',
      icon: UserCheck,
      content: [
        'Regardless of your location, you have meaningful rights regarding your personal information:',
        '• Right to Access: Request a copy of the personal information we hold about you.',
        '• Right to Rectification: Request correction of inaccurate or incomplete records.',
        '• Right to Erasure ("Right to be Forgotten"): Request deletion of your personal data from our databases.',
        '• Right to Opt-Out: Decline optional cookies or unsubscribe from any communication updates at any time.',
        'To exercise any of these rights, email us at hello@onecreativeweb.com and we will respond promptly within thirty (30) days.',
      ],
    },
    {
      id: 'california-gdpr',
      title: '9. Notice for California (CCPA/CPRA) & European (GDPR) Residents',
      icon: Globe,
      content: [
        'California Residents: Under the California Consumer Privacy Act (CCPA/CPRA), California residents have specific rights regarding disclosure, deletion, and non-discrimination. We confirm that One Creative Web .com does not sell personal information or share personal information for cross-context behavioral advertising.',
        'European Economic Area (EEA) & UK Residents: Under the General Data Protection Regulation (GDPR), we process data under lawful bases including contract fulfillment (responding to project requests), legitimate interests (site security and optimization), and explicit consent (opt-in cookies).',
      ],
    },
    {
      id: 'children',
      title: '10. Children\'s Privacy',
      icon: Bell,
      content: [
        'Our website and services are intended exclusively for adults, businesses, and professionals. We do not knowingly collect personal information from children under the age of 16. If we become aware that an individual under 16 has submitted personal data, we will immediately delete it.',
      ],
    },
    {
      id: 'policy-updates',
      title: '11. Updates to This Policy',
      icon: CheckCircle,
      content: [
        'We may periodically update this Privacy Policy to reflect changes in our legal obligations, service offerings, or security practices.',
        'When changes are published, the "Last Updated" date at the top of this page will be revised. We encourage you to review this policy periodically.',
      ],
    },
  ]

  return (
    <div className="noise-bg pt-32 sm:pt-36">
      <SEO
        title="Privacy Policy"
        description="Learn how One Creative Web .com collects, protects, and respects your personal information. Read our transparent privacy and data protection policy."
        keywords="privacy policy, data protection, website privacy, One Creative Web privacy, GDPR, CCPA, cookies policy"
        canonical="https://www.onecreativeweb.com/privacy"
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
              <ShieldCheck className="h-4 w-4" />
              Privacy & Data Protection
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-[1.1] text-content sm:text-5xl lg:text-6xl text-balance">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-content-muted text-pretty">
              Your privacy is paramount. We believe in transparency, minimal data collection,
              and enterprise-grade security for every client and visitor.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-sunken/60 px-4 py-1.5 text-xs font-semibold text-content-muted">
              <span>Last Updated: October 2026</span>
              <span>•</span>
              <span>Effective Immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Privacy Principles Grid */}
      <section className="relative border-y border-line bg-surface-sunken/60 py-8">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Lock,
                title: 'Never Sold or Shared',
                desc: 'We never sell your data or share it with third-party advertisers.',
              },
              {
                icon: ShieldCheck,
                title: 'Data Minimization',
                desc: 'We only collect details strictly necessary to quote and build your project.',
              },
              {
                icon: Server,
                title: 'Encrypted Security',
                desc: 'All communications and site interactions are protected by TLS/SSL encryption.',
              },
              {
                icon: UserCheck,
                title: 'You Are in Control',
                desc: 'Request access, corrections, or total deletion of your data at any time.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
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
                  Privacy Sections
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
                      Privacy Inquiries
                    </div>
                    <p className="mt-1.5 text-xs text-content-muted leading-relaxed">
                      Need a data deletion request or have questions about how your information is handled?
                    </p>
                    <a
                      href="mailto:hello@onecreativeweb.com"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                    >
                      Email hello@onecreativeweb.com <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Privacy Policy Articles */}
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-brand/15 text-accent ring-1 ring-accent/20">
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

              {/* Data Protection Contact Card */}
              <div className="card-organic border border-accent/30 bg-gradient-to-br from-accent/10 via-surface-elevated to-brand/10 p-8 text-center sm:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-md shadow-glow-accent">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-content">
                  Data Protection Officer & Contact
                </h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-content-muted">
                  To request data access, update your records, or make an inquiry under GDPR / CCPA, contact:
                </p>
                <div className="mt-4 font-display text-base font-bold text-brand">
                  hello@onecreativeweb.com
                </div>
                <p className="mt-1 text-xs text-content-subtle">
                  One Creative Web .com • Charleston, South Carolina, USA
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Link to="/contact" className="btn-primary text-sm">
                    Contact Our Agency
                  </Link>
                  <Link to="/terms" className="btn-secondary text-sm">
                    View Terms of Service
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
