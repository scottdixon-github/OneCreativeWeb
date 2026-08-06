import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

function furTufts(ctx, cx, cy, rx, ry, color, count, seed, alpha) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 1.4
  ctx.lineCap = 'round'
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const jitter = (rand() - 0.5) * 0.15
    const len = 4 + rand() * 7
    const px = cx + Math.cos(a) * rx
    const py = cy + Math.sin(a) * ry
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(px + Math.cos(a + jitter) * len, py + Math.sin(a + jitter) * len)
    ctx.stroke()
  }
  ctx.restore()
}

function fluffyEllipse(ctx, cx, cy, rx, ry, fill, seed) {
  ctx.save()
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.fill()
  furTufts(ctx, cx, cy, rx * 0.96, ry * 0.96, fill, Math.floor((rx + ry) * 0.8), seed, 0.8)
  ctx.restore()
}

function drawEar(ctx, x, y, angle, outer, inner, twitch) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle + twitch)
  ctx.fillStyle = outer
  ctx.beginPath()
  ctx.moveTo(-13, 0)
  ctx.lineTo(0, -26)
  ctx.lineTo(13, 0)
  ctx.closePath()
  ctx.fill()
  furTufts(ctx, 0, -8, 11, 12, outer, 10, Math.floor(x + y), 0.7)
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.moveTo(-7, -2)
  ctx.lineTo(0, -18)
  ctx.lineTo(7, -2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawStripe(ctx, x, y, w, arc, color, alpha) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 3.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - w, y)
  ctx.quadraticCurveTo(x, y + arc, x + w, y)
  ctx.stroke()
  ctx.restore()
}

export default function Cat() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const blinkRef = useRef({ next: 2.5, until: 0 })
  const twitchRef = useRef({ next: 5, until: 0 })
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const posRef = useRef({ x: null, y: null })
  const scrollRef = useRef(0)
  const mistRef = useRef(null)
  const lastTimeRef = useRef(0)
  const lastDrawRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const isDark = theme === 'dark'

    const resize = () => {
      dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight }
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = dimensionsRef.current.width * dpr
      canvas.height = dimensionsRef.current.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const pos = posRef.current
      const { width, height } = dimensionsRef.current
      if (pos.x === null) {
        pos.x = width * 0.17
        pos.y = height * 0.58
      } else {
        pos.x = Math.min(Math.max(pos.x, 80), width - 80)
        pos.y = Math.min(Math.max(pos.y, 140), height - 80)
      }
    }

    const getScale = () => Math.min(dimensionsRef.current.width / 1400, 1) * 0.9 + 0.35

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    resize()
    handleScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    if (!mistRef.current) {
      mistRef.current = Array.from({ length: 18 }, () => ({
        ox: (Math.random() - 0.5) * 140,
        oy: (Math.random() - 0.5) * 110,
        rise: 70 + Math.random() * 110,
        size: 12 + Math.random() * 22,
        alpha: 0.08 + Math.random() * 0.12,
        drift: (Math.random() - 0.5) * 40,
      }))
    }

    const orange = isDark ? '#e8a15c' : '#f2a65a'
    const orangeLight = isDark ? '#f0b57a' : '#f7bd7d'
    const stripe = isDark ? '#b06a28' : '#c97a2b'
    const cream = isDark ? '#f7ecd9' : '#fdf3e0'
    const innerEar = '#ee9f8f'
    const pink = '#e8888a'
    const amber = isDark ? '#e5b34d' : '#d9a13f'
    const dark = '#2b1c10'

    const animate = (timestamp) => {
      if (timestamp - lastDrawRef.current < 32) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastDrawRef.current = timestamp

      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)
      const now = performance.now()
      if (!lastTimeRef.current) lastTimeRef.current = now
      const rawDt = (now - lastTimeRef.current) / 1000
      const dt = Math.min(rawDt, 0.05)
      lastTimeRef.current = now
      timeRef.current += dt * 2
      const t = timeRef.current

      const scale = getScale()
      const pos = posRef.current

      const x = pos.x
      const y = pos.y

      if (scrollRef.current >= height * 0.55) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const breathe = 1 + Math.sin(t * 1.8) * 0.018
      const headBob = Math.sin(t * 1.8 + 0.6) * 1.5

      const blink = blinkRef.current
      if (t > blink.next) {
        blink.until = t + 0.16
        blink.next = t + 2.2 + Math.random() * 3.5
      }
      const eyesOpen = t > blink.until

      const twitch = twitchRef.current
      if (t > twitch.next) {
        twitch.until = t + 0.35
        twitch.next = t + 4 + Math.random() * 5
      }
      const earTwitch = t < twitch.until ? Math.sin((t - (twitch.until - 0.35)) * 28) * 0.15 : 0

      const tailSway = Math.sin(t * 2) * 0.18

      if (isDark) {
        const lampGlow = ctx.createRadialGradient(x, y - 30, 30 * scale, x, y - 30, 280 * scale)
        lampGlow.addColorStop(0, 'rgba(255, 220, 140, 0.35)')
        lampGlow.addColorStop(0.4, 'rgba(255, 190, 90, 0.12)')
        lampGlow.addColorStop(1, 'rgba(255, 150, 50, 0)')
        ctx.fillStyle = lampGlow
        ctx.fillRect(0, 0, width, height)
      }

      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      ctx.beginPath()
      ctx.ellipse(0, 62, 58, 10, 0, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)'
      ctx.fill()

      ctx.save()
      ctx.translate(42, 42)
      ctx.rotate(tailSway * 0.3)
      for (let i = 0; i < 5; i++) {
        const a = -0.4 + i * 0.35
        const r = 30 - i * 2.5
        const tx = Math.cos(a + tailSway * (i * 0.12)) * r * 0.55
        const ty = 12 - i * 9
        fluffyEllipse(ctx, tx, ty, 13 - i, 11 - i * 0.7, i % 2 === 0 ? orange : stripe, 100 + i)
      }
      ctx.restore()

      fluffyEllipse(ctx, -28, 30, 26, 26 * breathe, orange, 5)
      fluffyEllipse(ctx, 28, 30, 26, 26 * breathe, orange, 9)

      drawStripe(ctx, -34, 18, 9, 10, stripe, 0.55)
      drawStripe(ctx, -36, 30, 8, 9, stripe, 0.5)
      drawStripe(ctx, 34, 18, 9, 10, stripe, 0.55)
      drawStripe(ctx, 36, 30, 8, 9, stripe, 0.5)

      fluffyEllipse(ctx, 0, 8, 26, 34 * breathe, cream, 13)

      fluffyEllipse(ctx, -11, 40, 9, 20, orangeLight, 17)
      fluffyEllipse(ctx, 11, 40, 9, 20, orangeLight, 21)
      drawStripe(ctx, -11, 30, 6, 5, stripe, 0.45)
      drawStripe(ctx, 11, 30, 6, 5, stripe, 0.45)

      fluffyEllipse(ctx, -12, 56, 11, 7, cream, 25)
      fluffyEllipse(ctx, 12, 56, 11, 7, cream, 29)

      ctx.save()
      ctx.translate(0, -48 + headBob)
      ctx.rotate(Math.sin(t * 0.7) * 0.04)

      drawEar(ctx, -22, -18, -0.28, orange, innerEar, earTwitch)
      drawEar(ctx, 22, -18, 0.28, orange, innerEar, 0)

      fluffyEllipse(ctx, 0, 0, 34, 32, orange, 43)

      drawStripe(ctx, 0, -22, 5, 5, stripe, 0.6)
      drawStripe(ctx, -8, -24, 4, 4, stripe, 0.5)
      drawStripe(ctx, 8, -24, 4, 4, stripe, 0.5)
      drawStripe(ctx, -26, -6, 6, 6, stripe, 0.45)
      drawStripe(ctx, 26, -6, 6, 6, stripe, 0.45)

      fluffyEllipse(ctx, 0, 10, 13, 9, cream, 57)

      if (eyesOpen) {
        for (const side of [-1, 1]) {
          ctx.fillStyle = amber
          ctx.beginPath()
          ctx.ellipse(side * 13, -6, 7.5, 7, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = dark
          ctx.beginPath()
          ctx.ellipse(side * 13, -6, 2, 5.5, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(255,255,255,0.85)'
          ctx.beginPath()
          ctx.arc(side * 13 - 2, -8.5, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        ctx.strokeStyle = dark
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        for (const side of [-1, 1]) {
          ctx.beginPath()
          ctx.arc(side * 13, -8, 6, 0.15 * Math.PI, 0.85 * Math.PI)
          ctx.stroke()
        }
      }

      ctx.fillStyle = pink
      ctx.beginPath()
      ctx.moveTo(0, 5)
      ctx.lineTo(4.5, 9.5)
      ctx.quadraticCurveTo(0, 12, -4.5, 9.5)
      ctx.closePath()
      ctx.fill()

      ctx.strokeStyle = dark
      ctx.lineWidth = 1.6
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 11)
      ctx.quadraticCurveTo(0, 15, -5, 16)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 11)
      ctx.quadraticCurveTo(0, 15, 5, 16)
      ctx.stroke()

      ctx.strokeStyle = isDark ? 'rgba(247, 236, 217, 0.75)' : 'rgba(90, 70, 50, 0.55)'
      ctx.lineWidth = 1
      const whiskerSway = Math.sin(t * 2.2) * 1.5
      for (const side of [-1, 1]) {
        for (let w = 0; w < 3; w++) {
          const wy = 6 + w * 4
          const spread = (w - 1) * 5 + whiskerSway
          ctx.beginPath()
          ctx.moveTo(side * 10, wy)
          ctx.quadraticCurveTo(side * 26, wy + spread * 0.4, side * 40, wy + spread)
          ctx.stroke()
        }
      }

      ctx.fillStyle = 'rgba(244, 114, 182, 0.2)'
      ctx.beginPath()
      ctx.ellipse(-22, 6, 6, 3.5, 0, 0, Math.PI * 2)
      ctx.ellipse(22, 6, 6, 3.5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      ctx.restore()

      if (fade > 0.01) {
        const mistAlpha = Math.sin(fade * Math.PI)
        const mistColor = isDark ? '255, 255, 255' : '235, 235, 245'
        for (const puff of mistRef.current) {
          ctx.beginPath()
          ctx.arc(
            x + puff.ox + puff.drift * fade,
            y + puff.oy - puff.rise * fade,
            puff.size * (0.6 + fade),
            0,
            Math.PI * 2
          )
          ctx.fillStyle = `rgba(${mistColor}, ${puff.alpha * mistAlpha})`
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  )
}
