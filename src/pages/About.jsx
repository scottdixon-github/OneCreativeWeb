import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users, Target, Heart, Zap, ArrowRight, Code2, Palette, Rocket, ShieldCheck, Award,
} from 'lucide-react'
import { stats } from '../data/services.js'
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

export default function About() {
  const values = [
    { icon: Target, title: 'Mission-Driven', description: 'We exist to help businesses succeed online with exceptional digital experiences.' },
    { icon: Heart, title: 'Client-Centric', description: 'Your success is our success. We go above and beyond to deliver results that matter.' },
    { icon: Zap, title: 'Innovation First', description: 'We stay at the cutting edge of web technologies to give you a competitive edge.' },
    { icon: ShieldCheck, title: 'Quality Guaranteed', description: 'Every project meets our rigorous standards for performance, security, and design.' },
  ]

  const team = [
    { name: 'Alex Thompson', role: 'Founder & Lead Developer', icon: Code2 },
    { name: 'Maya Patel', role: 'Head of Design', icon: Palette },
    { name: 'Jordan Lee', role: 'Senior Full-Stack Engineer', icon: Zap },
    { name: 'Sam Rivera', role: 'Project Manager', icon: Rocket },
  ]

  return (
    <div className="noise-bg pt-36">
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <ParticleField particleCount={35} connectionDistance={90} />
        <FloatingShapes />
        <AnimatedOrb className="right-[15%] top-[10%]" size="h-72 w-72" color="brand" />
        <AnimatedOrb className="left-[10%] bottom-[10%]" size="h-56 w-56" color="accent" delay={3} />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute right-[15%] top-[10%] -z-10 h-72 w-72 bg-glow-brand"
        />
        <div className="container-max relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-elevated/50 px-5 py-2.5 text-sm font-medium text-brand backdrop-blur-sm">
              <Users className="h-4 w-4" />
              About Us
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-content sm:text-6xl text-balance">
              We're{' '}
              <span className="gradient-text">Creative Web Inc.</span>
            </h1>
            <p className="mt-8 text-lg text-content-muted text-pretty">
              A team of passionate developers, designers, and engineers dedicated to building
              exceptional web experiences. Since 2013, we've helped over 150 businesses launch
              and grow their digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden border-y border-line bg-surface-sunken/50">
        <AnimatedOrb className="left-[20%] top-[10%]" size="h-32 w-32" color="accent" delay={2} />
        <div className="container-max relative px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl font-extrabold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-content-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden section-padding">
        <FloatingShapes />
        <AnimatedOrb className="right-[5%] top-[20%]" size="h-48 w-48" color="brand" delay={4} />
        <div className="container-max relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-brand" />
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                What Drives Us
              </span>
              <div className="h-px w-12 bg-brand" />
            </div>
            <h2 className="font-display text-4xl font-bold text-content sm:text-5xl text-balance">
              Our{' '}
              <span className="gradient-text">values</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const ValueIcon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={i % 2 === 1 ? 'lg:mt-8' : ''}
                >
                  <TiltCard intensity={6}>
                    <div className="card-organic p-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-brand/15 to-accent/15 ring-1 ring-brand/20">
                        <ValueIcon className="h-8 w-8 text-brand" />
                      </div>
                      <h3 className="mt-6 font-display text-lg font-bold text-content">{value.title}</h3>
                      <p className="mt-2 text-sm text-content-muted text-pretty">{value.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden border-y border-line bg-surface-sunken/50 section-padding">
        <AnimatedOrb className="left-[5%] bottom-[10%]" size="h-64 w-64" color="accent" delay={5} />
        <AnimatedOrb className="right-[10%] top-[15%]" size="h-40 w-40" color="brand" delay={1} />
        <div className="container-max relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-brand" />
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                The People
              </span>
              <div className="h-px w-12 bg-brand" />
            </div>
            <h2 className="font-display text-4xl font-bold text-content sm:text-5xl text-balance">
              Meet the{' '}
              <span className="font-serif italic font-medium text-accent">team</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => {
              const MemberIcon = member.icon
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={i % 2 === 1 ? 'lg:mt-8' : ''}
                >
                  <TiltCard intensity={6}>
                    <div className="card-organic p-8 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-brand to-accent shadow-lg shadow-glow-brand">
                        <MemberIcon className="h-9 w-9 text-white" />
                      </div>
                      <h3 className="mt-6 font-display text-lg font-bold text-content">{member.name}</h3>
                      <p className="mt-1 text-sm text-brand">{member.role}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GradientBorderCard className="rounded-[3rem]">
              <div className="relative overflow-hidden rounded-[3rem] bg-surface-elevated p-12 text-center sm:p-16">
                <motion.div
                  variants={blobVariants}
                  animate="animate"
                  className="absolute -right-20 -top-20 h-64 w-64 bg-glow-brand"
                />
                <FloatingShapes />
                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-accent shadow-lg shadow-glow-brand">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="mt-8 font-display text-4xl font-bold text-content text-balance">
                    Let's work{' '}
                    <span className="gradient-text">together</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-lg text-content-muted text-pretty">
                    Ready to start your next project? We'd love to hear from you.
                  </p>
                  <Link to="/contact" className="btn-primary mt-8">
                    Get in Touch
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
