import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function GridPattern({ className = '', dotSize = 1.5, gap = 32, fadeRadius = 0.6 }) {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const dpr = window.devicePixelRatio
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const isDark = theme === 'dark'
      const dotColor = isDark ? 'rgba(129, 140, 248, 0.15)' : 'rgba(79, 70, 229, 0.08)'
      const accentColor = isDark ? 'rgba(45, 212, 191, 0.1)' : 'rgba(13, 148, 136, 0.06)'

      const centerX = width / 2
      const centerY = height / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY) * fadeRadius

      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
          const opacity = Math.max(0, 1 - dist / maxDist)
          if (opacity <= 0) continue

          const isAccent = ((x / gap) + (y / gap)) % 7 === 0
          ctx.beginPath()
          ctx.arc(x, y, dotSize * opacity, 0, Math.PI * 2)
          ctx.fillStyle = isAccent ? accentColor : dotColor
          ctx.fill()
        }
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [theme, dotSize, gap, fadeRadius])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
