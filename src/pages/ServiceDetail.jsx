import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Clock, DollarSign, Sparkles,
} from 'lucide-react'
import { services } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
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

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <div className="noise-bg pt-36">
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <ParticleField particleCount={35} connectionDistance={90} />
        <FloatingShapes />
        <AnimatedOrb className="left-[10%] top-[5%]" size="h-72 w-72" color="brand" />
        <AnimatedOrb className="right-[8%] bottom-[10%]" size="h-56 w-56" color="accent" delay={3} />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute left-[10%] top-[5%] -z-10 h-72 w-72 bg-glow-brand"
        />
        <div className="container-max relative">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-content-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand/15 to-accent/15 ring-1 ring-brand/20">
                <Icon className="h-10 w-10 text-brand" />
              </div>
              <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.05] text-content sm:text-6xl text-balance">
                {service.title}
              </h1>
              <p className="mt-5 text-xl text-content-muted text-pretty">{service.tagline}</p>
              <p className="mt-6 text-content leading-relaxed text-pretty">{service.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface-elevated px-5 py-4">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-xs text-content-subtle">Starting at</div>
                    <div className="font-semibold text-content">{service.startingPrice}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface-elevated px-5 py-4">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-xs text-content-subtle">Delivery</div>
                    <div className="font-semibold text-content">{service.deliveryTime}</div>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn-primary mt-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GradientBorderCard className="card-organic rounded-[2.5rem]">
                <div className="card-organic relative overflow-hidden p-8 rounded-[2.5rem]">
                  <motion.div
                    variants={blobVariants}
                    animate="animate"
                    className="absolute -right-12 -top-12 h-40 w-40 bg-glow-brand"
                  />
                  <div className="relative">
                    <h3 className="font-display text-xl font-bold text-content">What's Included</h3>
                    <ul className="mt-6 space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                            <Check className="h-3.5 w-3.5 text-accent" />
                          </div>
                          <span className="text-content-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GradientBorderCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights & Tech */}
      <section className="relative overflow-hidden border-y border-line bg-surface-sunken/50 section-padding">
        <AnimatedOrb className="left-[5%] top-[20%]" size="h-40 w-40" color="brand" delay={4} />
        <AnimatedOrb className="right-[10%] bottom-[15%]" size="h-48 w-48" color="accent" delay={1} />
        <div className="container-max relative">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-12 bg-brand" />
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Highlights
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-content text-balance">
                Key <span className="gradient-text">highlights</span>
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {service.highlights.map((h) => {
                  const HighlightIcon = h.icon
                  return (
                    <TiltCard key={h.label} intensity={6}>
                      <div className="card-organic p-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand/15 to-accent/15 ring-1 ring-brand/20">
                          <HighlightIcon className="h-7 w-7 text-brand" />
                        </div>
                        <div className="mt-4 text-sm font-medium text-content-muted">{h.label}</div>
                      </div>
                    </TiltCard>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-12 bg-brand" />
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Stack
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-content text-balance">
                Technologies we{' '}
                <span className="font-serif italic font-medium text-accent">use</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line-strong bg-surface-elevated px-5 py-3 text-sm font-medium text-content"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand" />
            <h2 className="font-display text-2xl font-bold text-content">Other Services</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ServiceCard service={s} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
