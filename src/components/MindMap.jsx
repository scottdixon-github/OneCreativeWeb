import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { publishVase, clearVase, consumeImpulse } from '../lib/heroScene.js'

const STALK_COUNT = 7
const FAN_SPREAD = 1.05

function buildBouquet() {
  const stalks = []
  for (let i = 0; i < STALK_COUNT; i++) {
    const t = i / (STALK_COUNT - 1)
    const baseAngle = -Math.PI / 2 + (t - 0.5) * 2 * FAN_SPREAD
    const leafCount = 2 + Math.floor(Math.random() * 3)
    const leaves = []
    for (let j = 0; j < leafCount; j++) {
      const along = 0.35 + (j / leafCount) * 0.55 + Math.random() * 0.08
      leaves.push({
        along,
        side: (j % 2 === 0 ? 1 : -1) * (0.35 + Math.random() * 0.3),
        size: 8 + Math.random() * 6,
        aspect: 0.4 + Math.random() * 0.25,
        tilt: (Math.random() - 0.5) * 0.5,
        hueShift: Math.random(),
        phase: Math.random() * Math.PI * 2,
      })
    }
    stalks.push({
      baseAngle,
      length: 110 + Math.random() * 70,
      phase: Math.random() * Math.PI * 2,
      swaySpeed: 0.35 + Math.random() * 0.3,
      swayAmount: 0.06 + Math.random() * 0.05,
      curveDir: (Math.random() - 0.5) * 20,
      tipLeaf: {
        size: 11 + Math.random() * 6,
        aspect: 0.42 + Math.random() * 0.2,
        tilt: (Math.random() - 0.5) * 0.4,
        hueShift: Math.random(),
        phase: Math.random() * Math.PI * 2,
      },
      leaves,
    })
  }
  return stalks
}

function drawLeaf(ctx, x, y, angle, size, aspect, tilt, hueShift, isDark, flutter) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle + tilt + flutter)

  const w = size * aspect
  const h = size

  const g = ctx.createLinearGradient(0, 0, 0, -h * 2)
  if (isDark) {
    const base = hueShift > 0.5 ? '45, 212, 191' : '74, 222, 128'
    g.addColorStop(0, `rgba(${base}, 0.55)`)
    g.addColorStop(0.6, `rgba(${base}, 0.85)`)
    g.addColorStop(1, `rgba(${hueShift > 0.5 ? '134, 239, 172' : '45, 212, 191'}, 0.95)`)
  } else {
    const base = hueShift > 0.5 ? '13, 148, 136' : '22, 163, 74'
    g.addColorStop(0, `rgba(${base}, 0.5)`)
    g.addColorStop(0.6, `rgba(${base}, 0.75)`)
    g.addColorStop(1, `rgba(${hueShift > 0.5 ? '5, 150, 105' : '13, 148, 136'}, 0.9)`)
  }

  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(w, -h * 0.4, w * 1.1, -h * 1.4, 0, -h * 2)
  ctx.bezierCurveTo(-w * 1.1, -h * 1.4, -w, -h * 0.4, 0, 0)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = isDark ? 'rgba(236, 253, 245, 0.35)' : 'rgba(6, 78, 59, 0.3)'
  ctx.lineWidth = 0.7
  ctx.beginPath()
  ctx.moveTo(0, -h * 0.15)
  ctx.quadraticCurveTo(w * 0.08, -h, 0, -h * 1.9)
  ctx.stroke()

  ctx.lineWidth = 0.4
  for (let v = 0.3; v < 1.6; v += 0.35) {
    ctx.beginPath()
    ctx.moveTo(0, -h * v)
    ctx.quadraticCurveTo(w * 0.5, -h * (v + 0.15), w * 0.75, -h * (v + 0.3))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, -h * v)
    ctx.quadraticCurveTo(-w * 0.5, -h * (v + 0.15), -w * 0.75, -h * (v + 0.3))
    ctx.stroke()
  }

  ctx.restore()
}

function drawVase(ctx, x, y, isDark, tilt) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(tilt)

  const g = ctx.createLinearGradient(-24, 0, 24, 0)
  if (isDark) {
    g.addColorStop(0, 'rgba(63, 63, 70, 0.95)')
    g.addColorStop(0.35, 'rgba(113, 113, 122, 0.95)')
    g.addColorStop(0.55, 'rgba(161, 161, 170, 0.95)')
    g.addColorStop(0.8, 'rgba(82, 82, 91, 0.95)')
    g.addColorStop(1, 'rgba(39, 39, 42, 0.95)')
  } else {
    g.addColorStop(0, 'rgba(180, 83, 9, 0.9)')
    g.addColorStop(0.35, 'rgba(217, 119, 6, 0.9)')
    g.addColorStop(0.55, 'rgba(245, 158, 11, 0.9)')
    g.addColorStop(0.8, 'rgba(194, 100, 10, 0.9)')
    g.addColorStop(1, 'rgba(146, 64, 14, 0.9)')
  }

  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(-11, 0)
  ctx.lineTo(11, 0)
  ctx.bezierCurveTo(13, 10, 26, 18, 27, 38)
  ctx.bezierCurveTo(28, 58, 16, 68, 0, 68)
  ctx.bezierCurveTo(-16, 68, -28, 58, -27, 38)
  ctx.bezierCurveTo(-26, 18, -13, 10, -11, 0)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = isDark ? 'rgba(212, 212, 216, 0.5)' : 'rgba(120, 53, 15, 0.4)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(-11, 0)
  ctx.lineTo(11, 0)
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(0, 1.5, 11, 3, 0, 0, Math.PI, true)
  ctx.stroke()

  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.35)'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo(-14, 22)
  ctx.bezierCurveTo(-19, 32, -19, 46, -12, 56)
  ctx.stroke()

  ctx.restore()
}

function drawTable(ctx, x, topY, isDark) {
  ctx.save()

  ctx.beginPath()
  ctx.ellipse(x, topY + 96, 46, 8, 0, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.14)'
  ctx.fill()

  const legG = ctx.createLinearGradient(x - 8, 0, x + 8, 0)
  if (isDark) {
    legG.addColorStop(0, '#52525b')
    legG.addColorStop(0.3, '#a1a1aa')
    legG.addColorStop(0.5, '#e4e4e7')
    legG.addColorStop(0.7, '#a1a1aa')
    legG.addColorStop(1, '#3f3f46')
  } else {
    legG.addColorStop(0, '#9ca3af')
    legG.addColorStop(0.3, '#d1d5db')
    legG.addColorStop(0.5, '#f9fafb')
    legG.addColorStop(0.7, '#d1d5db')
    legG.addColorStop(1, '#6b7280')
  }

  ctx.fillStyle = legG
  ctx.beginPath()
  ctx.moveTo(x - 5, topY + 8)
  ctx.lineTo(x + 5, topY + 8)
  ctx.lineTo(x + 7, topY + 86)
  ctx.lineTo(x - 7, topY + 86)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x, topY + 90, 26, 7, 0, 0, Math.PI * 2)
  ctx.fillStyle = legG
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(212, 212, 216, 0.4)' : 'rgba(75, 85, 99, 0.35)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.ellipse(x, topY + 90, 26, 7, 0, 0, Math.PI * 2)
  ctx.stroke()

  const topG = ctx.createLinearGradient(x - 52, 0, x + 52, 0)
  if (isDark) {
    topG.addColorStop(0, '#3f3f46')
    topG.addColorStop(0.25, '#71717a')
    topG.addColorStop(0.45, '#d4d4d8')
    topG.addColorStop(0.6, '#f4f4f5')
    topG.addColorStop(0.75, '#a1a1aa')
    topG.addColorStop(1, '#27272a')
  } else {
    topG.addColorStop(0, '#6b7280')
    topG.addColorStop(0.25, '#9ca3af')
    topG.addColorStop(0.45, '#e5e7eb')
    topG.addColorStop(0.6, '#ffffff')
    topG.addColorStop(0.75, '#d1d5db')
    topG.addColorStop(1, '#4b5563')
  }

  ctx.beginPath()
  ctx.ellipse(x, topY + 4, 52, 10, 0, 0, Math.PI * 2)
  ctx.fillStyle = topG
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x, topY, 52, 10, 0, 0, Math.PI * 2)
  const surfaceG = ctx.createLinearGradient(x - 52, topY - 10, x + 52, topY + 10)
  if (isDark) {
    surfaceG.addColorStop(0, '#52525b')
    surfaceG.addColorStop(0.4, '#a1a1aa')
    surfaceG.addColorStop(0.55, '#e4e4e7')
    surfaceG.addColorStop(0.75, '#71717a')
    surfaceG.addColorStop(1, '#3f3f46')
  } else {
    surfaceG.addColorStop(0, '#9ca3af')
    surfaceG.addColorStop(0.4, '#e5e7eb')
    surfaceG.addColorStop(0.55, '#ffffff')
    surfaceG.addColorStop(0.75, '#d1d5db')
    surfaceG.addColorStop(1, '#6b7280')
  }
  ctx.fillStyle = surfaceG
  ctx.fill()

  ctx.strokeStyle = isDark ? 'rgba(244, 244, 245, 0.35)' : 'rgba(255, 255, 255, 0.6)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.ellipse(x, topY - 1, 44, 7.5, 0, Math.PI * 1.1, Math.PI * 1.9)
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(x, topY, 52, 10, 0, 0, Math.PI * 2)
  ctx.strokeStyle = isDark ? 'rgba(212, 212, 216, 0.3)' : 'rgba(75, 85, 99, 0.3)'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.restore()
}

export default function MindMap() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const bouquetRef = useRef(null)
  const vaseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, tilt: 0, teeter: 0, teeterV: 0 })
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const scrollRef = useRef(0)
  const mistRef = useRef(null)
  const lastDrawRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const isDark = theme === 'dark'

    const resize = () => {
      const section = canvas.parentElement
      const w = section ? section.clientWidth : window.innerWidth
      const h = section ? section.clientHeight : window.innerHeight
      dimensionsRef.current = { width: w, height: h }
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    resize()
    handleScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    if (!bouquetRef.current) {
      bouquetRef.current = buildBouquet()
    }

    if (!mistRef.current) {
      mistRef.current = Array.from({ length: 18 }, () => ({
        ox: (Math.random() - 0.5) * 160,
        oy: (Math.random() - 0.5) * 120,
        rise: 70 + Math.random() * 110,
        size: 12 + Math.random() * 24,
        alpha: 0.08 + Math.random() * 0.12,
        drift: (Math.random() - 0.5) * 40,
      }))
    }

    const stemColor = isDark ? 'rgba(110, 120, 105,' : 'rgba(85, 95, 80,'

    const animate = () => {
      const now = performance.now()
      if (now - lastDrawRef.current < 32) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastDrawRef.current = now

      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)
      timeRef.current += 0.032
      const t = timeRef.current

      const vase = vaseRef.current

      const textMax = Math.min(width - 32, 896)
      const textLeft = (width - textMax) / 2
      const dockX = Math.min(width - textLeft / 2, width - 90)
      const targetY = height * 0.5

      if (vase.x < -500) {
        vase.x = dockX
        vase.y = targetY
      }

      {
        const spring = 0.035
        vase.vx += (dockX - vase.x) * spring
        vase.vy += (targetY - vase.y) * spring
        vase.vx *= 0.86
        vase.vy *= 0.86
        vase.x += vase.vx
        vase.y += vase.vy

        const targetTilt = Math.max(-0.22, Math.min(0.22, vase.vx * 0.02))
        vase.tilt += (targetTilt - vase.tilt) * 0.08
      }

      {
        const impulse = consumeImpulse()
        if (impulse) vase.teeterV += impulse
        vase.teeterV += -vase.teeter * 0.22
        vase.teeterV *= 0.94
        vase.teeter += vase.teeterV
        vase.teeter = Math.max(-0.32, Math.min(0.32, vase.teeter))
      }

      publishVase(vase.x, vase.y + 34, 30)

      if (vase.x < -500) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      if (scrollRef.current >= height * 0.55) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // 1. Draw table first (solid, no tilt)
      drawTable(ctx, vase.x, vase.y + 68, isDark)

      // 2. Draw bouquet and vase tilted/teetered together
      ctx.save()
      ctx.translate(vase.x, vase.y)
      const totalTilt = vase.tilt + vase.teeter
      ctx.rotate(totalTilt)

      const mouthX = 0
      const mouthY = 0

      for (const stalk of bouquetRef.current) {
        const sway = Math.sin(t * stalk.swaySpeed + stalk.phase) * stalk.swayAmount
        const travelSway = vase.vx * 0.004
        const angle = stalk.baseAngle + sway + travelSway
        const len = stalk.length

        const tipX = mouthX + Math.cos(angle) * len
        const tipY = mouthY + Math.sin(angle) * len

        const midX = mouthX + Math.cos(angle) * len * 0.5 + stalk.curveDir
        const midY = mouthY + Math.sin(angle) * len * 0.5

        ctx.beginPath()
        ctx.moveTo(mouthX, mouthY)
        ctx.quadraticCurveTo(midX, midY, tipX, tipY)
        ctx.strokeStyle = `${stemColor} 0.55)`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()

        const tipFlutter = Math.sin(t * 2.5 + stalk.tipLeaf.phase) * 0.1
        drawLeaf(
          ctx, tipX, tipY, angle + Math.PI / 2,
          stalk.tipLeaf.size, stalk.tipLeaf.aspect, stalk.tipLeaf.tilt,
          stalk.tipLeaf.hueShift, isDark, tipFlutter
        )

        for (const leaf of stalk.leaves) {
          const alongLen = len * leaf.along
          const lx = mouthX + Math.cos(angle) * alongLen + stalk.curveDir * leaf.along * 0.8
          const ly = mouthY + Math.sin(angle) * alongLen
          const leafAngle = angle + leaf.side * 0.9
          const flutter = Math.sin(t * 3 + leaf.phase) * 0.12
          drawLeaf(
            ctx, lx, ly, leafAngle + Math.PI / 2,
            leaf.size, leaf.aspect, leaf.tilt,
            leaf.hueShift, isDark, flutter
          )
        }
      }

      drawVase(ctx, 0, 0, isDark, 0)
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      clearVase()
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-40 hidden md:block"
      aria-hidden="true"
    />
  )
}
