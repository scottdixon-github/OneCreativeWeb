import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { drawCatBody } from '../lib/catDraw.js'

/**
 * Small idle version of the hero cat, sized to fit inside a decorative blob.
 * Breathes, blinks, twitches its ears and follows the cursor with its eyes.
 */
export default function CatMascot({ size = 120, className = '' }) {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const blinkRef = useRef({ next: 2.5, until: 0 })
  const twitchRef = useRef({ next: 5, until: 0 })
  const lookRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const isDark = theme === 'dark'

    const isMobile = window.innerWidth < 640
    const displaySize = Math.min(size, isMobile ? 100 : size)
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = displaySize * dpr
    canvas.height = displaySize * dpr
    canvas.style.width = `${displaySize}px`
    canvas.style.height = `${displaySize}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      lookRef.current = { x: (dx / dist) * 2.2, y: (dy / dist) * 1.6 }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let last = 0
    const animate = (timestamp) => {
      animationRef.current = requestAnimationFrame(animate)
      if (timestamp - last < 40) return
      last = timestamp

      timeRef.current += 0.08
      const t = timeRef.current

      const blink = blinkRef.current
      if (t > blink.next) {
        blink.until = t + 0.16
        blink.next = t + 2.2 + Math.random() * 3.5
      }
      const twitch = twitchRef.current
      if (t > twitch.next) {
        twitch.until = t + 0.35
        twitch.next = t + 4 + Math.random() * 5
      }
      const earTwitch =
        t < twitch.until ? Math.sin((t - (twitch.until - 0.35)) * 28) * 0.15 : 0

      ctx.clearRect(0, 0, displaySize, displaySize)
      // The cat spans roughly -80..+72 vertically at scale 1.
      const scale = displaySize / 152
      drawCatBody(ctx, {
        x: displaySize / 2,
        y: displaySize * 0.56,
        scale,
        t,
        isDark,
        walkProgress: 1,
        walking: false,
        lookDX: lookRef.current.x,
        lookDY: lookRef.current.y,
        eyesOpen: t > blink.until,
        earTwitch,
        shadow: false,
      })
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [theme, size])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
