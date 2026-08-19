import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ParticleField({ className = '', particleCount = 60, connectionDistance = 120 }) {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const isDark = theme === 'dark'
    const dotColor = isDark ? 'rgba(129, 140, 248, 0.4)' : 'rgba(79, 70, 229, 0.15)'
    const lineColor = isDark ? 'rgba(129, 140, 248, 0.12)' : 'rgba(79, 70, 229, 0.06)'
    const accentColor = isDark ? 'rgba(45, 212, 191, 0.3)' : 'rgba(13, 148, 136, 0.12)'

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 0.5,
      isAccent: Math.random() > 0.85,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      const particles = particlesRef.current

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.isAccent ? accentColor : dotColor
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [theme, particleCount, connectionDistance])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
