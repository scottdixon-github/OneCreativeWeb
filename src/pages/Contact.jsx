import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, User, Building,
} from 'lucide-react'
import { services } from '../data/services.js'
import ParticleField from '../components/ParticleField.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedOrb from '../components/AnimatedOrb.jsx'
import TiltCard from '../components/TiltCard.jsx'
import GradientBorderCard from '../components/GradientBorderCard.jsx'

import CatMascot from '../components/CatMascot.jsx'
import GearFactory from '../components/GearFactory.jsx'

const blobVariants = {
  animate: {
    borderRadius: [
      '42% 58% 70% 30% / 45% 45% 55% 55%',
      '70% 30% 46% 54% / 30% 60% 40% 70%',
      '30% 70% 70% 30% / 60% 40% 60% 40%',
      '42% 58% 70% 30% / 45% 45% 55% 55%',
    ],
    transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
  },
}

// Pre-calculate SVG gear teeth and spiral path for the watch balance wheel
const gearTeeth = Array.from({ length: 30 }).map((_, i) => {
  const angle = (i * 360) / 30
  const angleRad = (angle * Math.PI) / 180
  const x1 = 100 + 82 * Math.cos(angleRad - 0.05)
  const y1 = 100 + 82 * Math.sin(angleRad - 0.05)
  const x2 = 100 + 92 * Math.cos(angleRad)
  const y2 = 100 + 92 * Math.sin(angleRad)
  const x3 = 100 + 82 * Math.cos(angleRad + 0.05)
  const y3 = 100 + 82 * Math.sin(angleRad + 0.05)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)}`
}).join(' ')

const generateSpiral = () => {
  let path = 'M 100 100'
  for (let theta = 0; theta < Math.PI * 10; theta += 0.1) {
    const r = 1.2 * theta
    const x = 100 + r * Math.cos(theta)
    const y = 100 + r * Math.sin(theta)
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return path
}
const spiralPath = generateSpiral()

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const budgets = ['< $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000+']

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@creativeweb.inc', href: 'mailto:hello@creativeweb.inc' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' },
  ]

  const inputClass =
    'w-full rounded-2xl border border-line-strong bg-surface-sunken/50 px-4 py-3.5 text-content placeholder-content-subtle outline-none transition-all duration-300 focus:border-brand focus:ring-2 focus:ring-brand/20'

  return (
    <div className="noise-bg pt-36">
      <section className="relative overflow-hidden section-padding">
        <ParticleField particleCount={40} connectionDistance={90} />
        <FloatingShapes />
        {/* Ticking escapement watch gear instead of the blue background blob */}
        <motion.div
          animate={{
            rotate: [0, -160, -160, 0, 160, 160, 0],
          }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute left-[5%] top-[10%] -z-10 h-80 w-80 text-brand/20 dark:text-brand/10 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="gear-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Background glow */}
            <circle cx="100" cy="100" r="100" fill="url(#gear-glow)" className="blur-xl" />

            <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.45">
              {/* Outer rims */}
              <circle cx="100" cy="100" r="82" />
              <circle cx="100" cy="100" r="54" />

              {/* Teeth */}
              <path d={gearTeeth} />

              {/* Balance spokes */}
              <line x1="100" y1="18" x2="100" y2="182" />
              <line x1="18" y1="100" x2="182" y2="100" />
              
              {/* Hairspring spiral */}
              <path d={spiralPath} strokeWidth="1.0" opacity="0.6" />

              {/* Center Hub */}
              <circle cx="100" cy="100" r="10" fill="currentColor" />
            </g>
          </svg>
        </motion.div>
        <AnimatedOrb className="right-[5%] bottom-[10%]" size="h-64 w-64" color="accent" delay={3} />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute right-[5%] bottom-[10%] -z-10 h-64 w-64 bg-glow-accent"
          style={{ animationDelay: '7s' }}
        />

        <div className="container-max relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/50 px-5 py-2.5 text-sm font-medium text-brand backdrop-blur-sm">
              <MessageSquare className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-content sm:text-5xl lg:text-6xl text-balance">
              Let's build{' '}
              <span className="gradient-text">together</span>
            </h1>
            <p className="mt-8 text-lg text-content-muted text-pretty">
              Tell us about your project and we'll get back to you within 24 hours with a free
              consultation and quote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <GearFactory />
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="card-organic relative overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-brand/10 to-accent/10">
                <CatMascot size={95} className="relative z-10" />
                <p className="mt-4 text-center text-sm font-medium text-content-muted">
                  Let's chat! Our cat helper is ready to listen.
                </p>
              </div>

              {contactInfo.map((info) => {
                const InfoIcon = info.icon
                return (
                  <TiltCard key={info.label} intensity={5}>
                    <a
                      href={info.href}
                      className="card-organic flex items-center gap-4 p-6 hover:border-brand/40 hover:shadow-lg hover:shadow-glow-brand"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/15 to-accent/15 ring-1 ring-brand/20">
                        <InfoIcon className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <div className="text-xs text-content-subtle">{info.label}</div>
                        <div className="font-semibold text-content">{info.value}</div>
                      </div>
                    </a>
                  </TiltCard>
                )
              })}

              <div className="card-organic p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-content">
                  Response Time
                </h3>
                <p className="mt-2 text-sm text-content-muted text-pretty">
                  We respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <TiltCard intensity={4}>
                  <div className="card-organic flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent/15 to-brand/15 ring-1 ring-accent/20">
                      <CheckCircle2 className="h-10 w-10 text-accent" />
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-bold text-content">
                      Message Sent!
                    </h3>
                    <p className="mt-3 max-w-md text-content-muted text-pretty">
                      Thanks for reaching out, {form.name || 'there'}! We'll get back to you within
                      24 hours. Check your inbox for a confirmation email.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
                      }}
                      className="btn-secondary mt-8"
                    >
                      Send Another Message
                    </button>
                  </div>
                </TiltCard>
              ) : (
                <GradientBorderCard className="rounded-[2.5rem]">
                  <form onSubmit={handleSubmit} className="card-organic space-y-5 p-5 sm:p-8 rounded-[2.5rem]">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content">
                          <User className="h-4 w-4 text-brand" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content">
                          <Mail className="h-4 w-4 text-brand" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content">
                        <Building className="h-4 w-4 text-brand" />
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your company (optional)"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-content">
                          Service Needed *
                        </label>
                        <select
                          name="service"
                          required
                          value={form.service}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="other">Other / Not sure</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-content">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select a range</option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content">
                        <MessageSquare className="h-4 w-4 text-brand" />
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      Send Message
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </GradientBorderCard>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
