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
        <AnimatedOrb className="left-[10%] top-[5%]" size="h-72 w-72" color="brand" />
        <AnimatedOrb className="right-[5%] bottom-[10%]" size="h-64 w-64" color="accent" delay={3} />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute left-[10%] top-[5%] -z-10 h-72 w-72 bg-glow-brand"
        />
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
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-content sm:text-6xl text-balance">
              Let's build{' '}
              <span className="gradient-text">together</span>
            </h1>
            <p className="mt-8 text-lg text-content-muted text-pretty">
              Tell us about your project and we'll get back to you within 24 hours with a free
              consultation and quote.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
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
                  <form onSubmit={handleSubmit} className="card-organic space-y-5 p-8 rounded-[2.5rem]">
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
