import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll()
  const opacity = useTransform(scrollY, (y) => (y > 100 ? 1 : 0))

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand via-accent to-brand"
      style={{ scaleX: scrollYProgress, opacity }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}
