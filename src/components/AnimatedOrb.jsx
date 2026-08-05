import { motion } from 'framer-motion'

const colorMap = {
  brand: {
    gradient: 'from-brand to-accent',
    shadow: 'shadow-glow-brand',
  },
  accent: {
    gradient: 'from-accent to-brand',
    shadow: 'shadow-glow-accent',
  },
}

export default function AnimatedOrb({
  className = '',
  size = 'h-40 w-40',
  color = 'brand',
  delay = 0,
  duration = 8,
  blur = 'blur-3xl',
}) {
  const { gradient, shadow } = colorMap[color] || colorMap.brand

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${size} ${blur} bg-gradient-to-br ${gradient} ${shadow} ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  )
}
