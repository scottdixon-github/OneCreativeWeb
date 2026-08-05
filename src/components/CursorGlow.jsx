import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

export default function CursorGlow() {
  const { theme } = useTheme()
  const containerRef = useRef(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 200)
      mouseY.set(e.clientY - 200)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const isDark = theme === 'dark'

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background: isDark
            ? 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute h-[200px] w-[200px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background: isDark
            ? 'radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(13,148,136,0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
