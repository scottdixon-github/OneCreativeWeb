import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase } from 'lucide-react'
import { portfolioProjects } from '../data/services.js'
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

export default function Portfolio() {
  return (
    <div className="noise-bg pt-36">
      <section className="relative overflow-hidden section-padding">
        <ParticleField particleCount={40} connectionDistance={90} />
        <FloatingShapes />
        <AnimatedOrb className="left-[5%] top-[15%]" size="h-64 w-64" color="brand" />
        <AnimatedOrb className="right-[10%] top-[40%]" size="h-80 w-80" color="accent" delay={3} />

        <div className="container-max relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/50 px-5 py-2.5 text-sm font-medium text-brand backdrop-blur-sm">
              <Briefcase className="h-4 w-4" />
              Our Work
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-content sm:text-6xl text-balance">
              Our{' '}
              <span className="gradient-text">portfolio</span>
            </h1>
            <p className="mt-8 text-lg text-content-muted text-pretty">
              A selection of projects we've delivered across custom websites, web applications,
              e-commerce, and more.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={i % 3 === 1 ? 'lg:mt-12' : i % 3 === 2 ? 'lg:mt-6' : ''}
              >
                <TiltCard intensity={10}>
                  <div className="card-organic group overflow-hidden p-0 hover:border-brand/40 hover:shadow-2xl hover:shadow-glow-brand">
                    <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                      <div className={`absolute inset-4 ${project.shape} bg-white/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6`} />
                      <div className="absolute bottom-5 left-5">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-display text-lg font-bold text-content">{project.title}</h3>
                      <p className="mt-2 text-sm text-content-muted text-pretty">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-surface-sunken px-3 py-1 text-xs text-content-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GradientBorderCard className="mt-20 rounded-[3rem]">
              <div className="relative overflow-hidden rounded-[3rem] bg-surface-elevated p-12 text-center sm:p-16">
                <motion.div
                  variants={blobVariants}
                  animate="animate"
                  className="absolute -right-16 -top-16 h-56 w-56 bg-glow-brand"
                />
                <motion.div
                  variants={blobVariants}
                  animate="animate"
                  className="absolute -bottom-20 -left-12 h-64 w-64 bg-glow-accent"
                  style={{ animationDelay: '5s' }}
                />
                <FloatingShapes />
                <div className="relative">
                  <h2 className="font-display text-3xl font-bold text-content text-balance">
                    Your project could be{' '}
                    <span className="font-serif italic font-medium text-accent">next.</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-content-muted text-pretty">
                    Let's create something remarkable together.
                  </p>
                  <Link to="/contact" className="btn-primary mt-8">
                    Start Your Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </GradientBorderCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
