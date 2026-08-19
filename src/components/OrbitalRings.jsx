import { motion } from 'framer-motion'

export default function OrbitalRings({ className = '', ringCount = 3 }) {
  const rings = Array.from({ length: ringCount }, (_, i) => ({
    size: 200 + i * 120,
    duration: 30 + i * 10,
    direction: i % 2 === 0 ? 1 : -1,
    delay: i * 2,
  }))

  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`} aria-hidden="true">
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-line-strong"
          style={{ width: ring.size, height: ring.size }}
          animate={{ rotate: 360 * ring.direction }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: ring.delay,
          }}
        />
      ))}
    </div>
  )
}
