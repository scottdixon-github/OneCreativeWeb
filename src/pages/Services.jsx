import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers } from 'lucide-react'
import { services } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
import ParticleField from '../components/ParticleField.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedOrb from '../components/AnimatedOrb.jsx'

export default function Services() {
  return (
    <div className="noise-bg pt-36">
      <section className="relative overflow-hidden section-padding">
        <ParticleField particleCount={40} connectionDistance={90} />
        <FloatingShapes />
        <AnimatedOrb className="left-[8%] top-[10%]" size="h-56 w-56" color="brand" />
        <AnimatedOrb className="right-[10%] top-[30%]" size="h-72 w-72" color="accent" delay={3} />

        <div className="container-max relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/50 px-5 py-2.5 text-sm font-medium text-brand backdrop-blur-sm">
              <Layers className="h-4 w-4" />
              Our Services
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-content sm:text-5xl lg:text-6xl text-balance">
              Full-featured{' '}
              <span className="gradient-text">web development</span>{' '}
              <span className="font-serif italic font-medium text-accent">services</span>
            </h1>
            <p className="mt-8 text-lg text-content-muted text-pretty">
              Choose from our comprehensive range of web development services. Each service is
              fully customizable and delivered by our team of expert developers, designers, and
              engineers.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-20 overflow-hidden rounded-3xl border border-line bg-surface-elevated p-8 text-center sm:p-14"
          >
            <AnimatedOrb className="right-[5%] top-[10%]" size="h-40 w-40" color="brand" delay={2} />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-content text-balance">
                Not sure which service you{' '}
                <span className="font-serif italic font-medium text-accent">need?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-content-muted text-pretty">
                Get in touch and we'll help you figure out the perfect solution for your project.
              </p>
              <Link to="/contact" className="btn-primary mt-8">
                Talk to an Expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
