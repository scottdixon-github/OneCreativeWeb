import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Sparkles, Star, Check, Quote, Rocket,
} from 'lucide-react'
import { services, portfolioProjects, testimonials, stats, processSteps } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedOrb from '../components/AnimatedOrb.jsx'
import TiltCard from '../components/TiltCard.jsx'
import GridPattern from '../components/GridPattern.jsx'
import OrbitalRings from '../components/OrbitalRings.jsx'
import GradientBorderCard from '../components/GradientBorderCard.jsx'
import CatMascot from '../components/CatMascot.jsx'
import TextReveal from '../components/TextReveal.jsx'
import Cat from '../components/Cat.jsx'
import MindMap from '../components/MindMap.jsx'
import HeroBackground from '../components/HeroBackground.jsx'

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

function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(max-width: 767px)')
    const on = (e) => setIsMobile(e.matches)
    setIsMobile(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])

  return (
    <div className="noise-bg">
      {/* ===== HERO ===== */}
      <section className="relative min-h-svh pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44">
        {/* Background — clipped to section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroBackground />
        </div>

        {/* Full-section canvas overlays — Cat (left) and MindMap/table (right) */}
        {!isMobile && (
          <>
            <MindMap />
            <Cat />
          </>
        )}

        {isMobile && (
          <div className="relative z-10 h-56 w-full overflow-hidden">
            <MindMap />
            <Cat />
          </div>
        )}

        <div className="relative min-h-[calc(100svh-14rem)] flex items-center">
          <div className="container-max px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/80 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-brand backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Full-Featured Web Development Services
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-[1.1] text-content sm:text-5xl lg:text-7xl text-balance">
              We knit together <br className="hidden sm:inline" />
              <span className="gradient-text">digital experiences</span>
              <br className="hidden sm:inline" />
              {' '}that feel{' '}
              <span className="fuzzy-warm-alive inline-block mt-1 sm:mt-0">warm and alive</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-content-muted text-pretty">
              Creative Web Inc. delivers custom websites, web applications, and e-commerce
              solutions tailored to your business. Choose from our full range of development
              services and let us bring your vision to life.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/services" className="btn-primary">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/portfolio" className="btn-secondary">
                View Our Work
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-content-muted">
              {['90+ Lighthouse scores', '150+ projects delivered'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent stroke-[2.5]" /> {item}
                </span>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </section>


      {/* ===== STATS TICKER BAND ===== */}
      <section className="relative border-y border-line bg-surface-sunken/80 overflow-hidden py-3">
        <GridPattern dotSize={1.5} gap={32} />
        <div className="flex w-full overflow-hidden select-none whitespace-nowrap">
          <div className="flex shrink-0 animate-marquee-reverse items-center justify-around gap-12 font-display text-sm font-bold uppercase tracking-wider text-content">
            <span className="flex items-center gap-2.5">
              <span className="text-brand">Hundreds of</span> Projects Delivered
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">98%</span> Client Satisfaction
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">5 plus</span> Years Experience
            </span>
            <span className="text-accent">•</span>
          </div>

          <div aria-hidden="true" className="flex shrink-0 animate-marquee-reverse items-center justify-around gap-12 font-display text-sm font-bold uppercase tracking-wider text-content">
            <span className="flex items-center gap-2.5">
              <span className="text-brand">Hundreds of</span> Projects Delivered
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">98%</span> Client Satisfaction
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">5 plus</span> Years Experience
            </span>
            <span className="text-accent">•</span>
          </div>

          <div aria-hidden="true" className="flex shrink-0 animate-marquee-reverse items-center justify-around gap-12 font-display text-sm font-bold uppercase tracking-wider text-content">
            <span className="flex items-center gap-2.5">
              <span className="text-brand">Hundreds of</span> Projects Delivered
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">98%</span> Client Satisfaction
            </span>
            <span className="text-accent">•</span>
            <span className="flex items-center gap-2.5">
              <span className="text-brand">5 plus</span> Years Experience
            </span>
            <span className="text-accent">•</span>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative section-padding overflow-hidden">
        <AnimatedOrb className="right-[5%] top-[10%]" size="h-56 w-56" color="accent" delay={2} />
        <div className="container-max relative">
          <ParallaxSection speed={0.3}>
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-3xl font-bold leading-tight text-content sm:text-4xl lg:text-5xl text-balance">
                  <TextReveal text="Choose your" />
                  <br />
                  <span className="gradient-text">
                    <TextReveal text="service" delay={0.3} />
                  </span>
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-content-muted text-pretty lg:pb-2"
              >
                From custom websites to complex web applications, we offer a full range of
                development services to meet your needs. Each service is fully customizable and
                delivered by our team of expert developers, designers, and engineers.
              </motion.p>
            </div>
          </ParallaxSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="relative overflow-hidden border-y border-line bg-surface-sunken/50 section-padding">
        <OrbitalRings className="opacity-40" ringCount={3} />
        <AnimatedOrb className="left-[10%] top-[30%]" size="h-48 w-48" color="brand" delay={4} />
        <AnimatedOrb className="right-[10%] bottom-[20%]" size="h-56 w-56" color="accent" delay={1} />

        <div className="container-max relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-content sm:text-4xl lg:text-5xl text-balance">
              Our <span className="gradient-text">process</span>
            </h2>
            <p className="mt-4 text-lg text-content-muted text-pretty">
              A proven workflow that ensures your project is delivered on time, on budget,
              and beyond expectations.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {i < processSteps.length - 1 && (
                  <div className="absolute left-[60%] top-8 hidden h-px w-[80%] bg-gradient-to-r from-brand/40 to-transparent lg:block" />
                )}
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-accent font-display text-2xl font-extrabold text-white shadow-lg shadow-glow-brand">
                  {step.number}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-content">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted text-pretty">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section className="relative section-padding overflow-hidden">
        <AnimatedOrb className="left-[5%] top-[20%]" size="h-64 w-64" color="brand" delay={3} />
        <div className="container-max relative">
          <ParallaxSection speed={0.3}>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl font-bold text-content sm:text-4xl lg:text-5xl text-balance">
                  Featured{' '}
                  <span className="font-serif italic font-medium text-accent">projects</span>
                </h2>
              </div>
              <Link to="/portfolio" className="btn-ghost">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ParallaxSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={i === 1 ? 'lg:mt-12' : ''}
              >
                <TiltCard intensity={10}>
                  <div className="card-organic group overflow-hidden p-0 hover:border-brand/40 hover:shadow-2xl hover:shadow-glow-brand">
                    <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                      <div className={`absolute inset-4 ${project.shape} bg-white/10 transition-transform duration-700 group-hover:scale-110`} />
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
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative overflow-hidden border-y border-line bg-surface-sunken/50 section-padding">
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute right-[10%] top-[10%] -z-10 h-64 w-64 bg-glow-accent"
        />
        <AnimatedOrb className="left-[15%] bottom-[15%]" size="h-48 w-48" color="accent" delay={5} />

        <div className="container-max relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-content sm:text-4xl lg:text-5xl text-balance">
              What our{' '}
              <span className="gradient-text">clients say</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={i % 2 === 1 ? 'md:mt-8' : ''}
              >
                <TiltCard intensity={5}>
                  <div className="card-organic p-8">
                    <Quote className="h-10 w-10 text-brand/30" />
                    <p className="mt-4 text-content leading-relaxed text-pretty">"{t.content}"</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent font-display font-bold text-white">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-content">{t.name}</div>
                        <div className="text-sm text-content-muted">{t.role}</div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact-cta" className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <GradientBorderCard className="rounded-[3rem]">
              <div className="relative overflow-hidden rounded-[3rem] bg-surface-elevated p-8 text-center sm:p-16 lg:p-20">
                <motion.div
                  variants={blobVariants}
                  animate="animate"
                  className="absolute -right-10 -top-10 h-44 w-44 flex items-center justify-center bg-surface-sunken/80 backdrop-blur-sm overflow-hidden z-10"
                  style={{ borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' }}
                >
                  <CatMascot size={140} className="relative z-10" />
                </motion.div>
                <AnimatedOrb className="right-[5%] top-[10%]" size="h-56 w-56" color="brand" delay={2} />
                <AnimatedOrb className="left-[5%] bottom-[10%]" size="h-48 w-48" color="accent" delay={5} />
                <FloatingShapes />

                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-accent shadow-lg shadow-glow-brand">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="mt-8 font-display text-3xl font-bold text-content sm:text-4xl lg:text-5xl text-balance">
                    Ready to build something{' '}
                    <span className="font-serif italic font-medium text-accent">amazing?</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-lg text-content-muted text-pretty">
                    Let's discuss your project. Get a free consultation and quote today — no
                    obligations, just expert advice.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link to="/contact" className="btn-primary">
                      Get Your Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/services" className="btn-secondary">
                      Browse All Services
                    </Link>
                  </div>
                </div>
              </div>
            </GradientBorderCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
