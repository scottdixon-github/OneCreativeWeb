import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { drawCatBody } from '../lib/catDraw.js'
import { heroScene, hitVase } from '../lib/heroScene.js'

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
  const startTimeRef = useRef(null)

  // Interactive Yarn & Rebound states
  const yarnRef = useRef({
    x: null,
    vx: 0,
    vy: 0,
    y: null,
    targetX: null,
    targetY: null,
    roll: 0,
    reboundStart: null,
    reboundDuration: 1800,
    reboundUntil: 0,
    reboundStartX: 0,
    reboundStartY: 0,
  })
  const mouseXRef = useRef(null)
  const mouseActiveRef = useRef(false)
  const threadHistoryRef = useRef([])

  // Balloon message states
  const balloonPosRef = useRef({ x: 0, y: 0 })
  const balloonShownRef = useRef(false)
  const [balloonVisible, setBalloonVisible] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  const messages = [
    'Meow, how can I help you?',
    "I'm your cat - fantastic web assistant!",
    'Need a hand with your project?',
    'I make websites purr-fect!',
    'Curious about what we do?',
    'Click here to leave a message!',
  ]

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

      const pos = posRef.current
      const { width, height } = dimensionsRef.current
      const textMax = Math.min(width - 32, 896)
      const textLeft = (width - textMax) / 2
      if (pos.x === null) {
        pos.x = Math.max(90, textLeft / 2)
        pos.y = height * 0.5
      } else {
        pos.x = Math.min(Math.max(pos.x, 80), width - 80)
        pos.y = Math.min(Math.max(pos.y, 140), height - 80)
      }
    }

    const getScale = () => Math.min(dimensionsRef.current.width / 1400, 1) * 0.9 + 0.35

    // ── Yarn ball draw function ──────────────────────────────────────────
    const drawYarn = (cx, cy, radius, roll, isDark, t) => {
      const threadColor = isDark ? '#ff9f6e' : '#c84010'
      const history = threadHistoryRef.current

      // ── Long trailing thread (drawn behind the ball) ──
      if (history.length >= 2) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const segs = history.length
        for (let i = 1; i < segs; i++) {
          const frac = i / segs
          const alpha = 0.05 + frac * 0.40
          const lw = 0.4 + frac * 1.2

          const prev = history[i - 1]
          const curr = history[i]

          const waveAmp = (1 - frac) * 12
          const waveOff = Math.sin(t * 1.8 + i * 0.4) * waveAmp

          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y + waveOff * 0.5)
          ctx.lineTo(curr.x, curr.y + waveOff)
          ctx.strokeStyle = threadColor
          ctx.globalAlpha = alpha
          ctx.lineWidth = lw
          ctx.stroke()
        }
        ctx.restore()
      }

      // Shadow
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(cx, cy + radius * 0.85, radius * 0.75, radius * 0.22, 0, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
      ctx.fill()
      ctx.restore()

      // Main ball
      const grad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.05, cx, cy, radius)
      grad.addColorStop(0, isDark ? '#ff9f6e' : '#ff8c52')
      grad.addColorStop(0.55, isDark ? '#e05a20' : '#d44e18')
      grad.addColorStop(1, isDark ? '#9a3310' : '#8b2e0e')
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.clip()

      // Wound threads
      const threadColorWound = isDark ? 'rgba(255,140,80,0.55)' : 'rgba(200,70,20,0.45)'
      const threadColorLight = isDark ? 'rgba(255,200,150,0.30)' : 'rgba(255,160,100,0.35)'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'

      for (let layer = 0; layer < 3; layer++) {
        const baseAngle = (layer / 3) * Math.PI + roll
        ctx.strokeStyle = layer === 1 ? threadColorLight : threadColorWound
        for (let i = 0; i < 8; i++) {
          const a = baseAngle + (i / 8) * Math.PI * 2
          const x1 = cx + Math.cos(a) * radius
          const y1 = cy + Math.sin(a) * radius
          const x2 = cx + Math.cos(a + Math.PI * 1.1) * radius
          const y2 = cy + Math.sin(a + Math.PI * 1.1) * radius
          const cpx = cx + Math.cos(a + Math.PI * 0.55) * radius * 0.85
          const cpy = cy + Math.sin(a + Math.PI * 0.55) * radius * 0.85
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.quadraticCurveTo(cpx, cpy, x2, y2)
          ctx.stroke()
        }
      }

      // Specular highlight
      ctx.restore()
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      const shine = ctx.createRadialGradient(
        cx - radius * 0.35, cy - radius * 0.38, 0,
        cx - radius * 0.35, cy - radius * 0.38, radius * 0.5
      )
      shine.addColorStop(0, 'rgba(255,255,255,0.38)')
      shine.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = shine
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)
      ctx.restore()

      // Short exit string
      const exitAngle = roll + 2.4
      const tailX = cx + Math.cos(exitAngle) * radius * 0.9
      const tailY = cy + Math.sin(exitAngle) * radius * 0.9
      ctx.save()
      ctx.strokeStyle = threadColor
      ctx.lineWidth = 2.2
      ctx.lineCap = 'round'
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.quadraticCurveTo(
        tailX + Math.sin(roll) * 10,
        tailY + 12,
        tailX - Math.cos(roll) * 6,
        tailY + 20
      )
      ctx.stroke()
      ctx.restore()
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    const handleMouseMove = (e) => {
      const section = canvas.parentElement
      if (!section) return
      const rect = section.getBoundingClientRect()
      
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseActiveRef.current = true
        mouseXRef.current = e.clientX
        const canvasY = e.clientY - rect.top
        yarnRef.current.targetX = e.clientX
        yarnRef.current.targetY = canvasY
        
        if (yarnRef.current.x === null) {
          yarnRef.current.x = e.clientX
          yarnRef.current.y = canvasY
        }
      } else {
        mouseActiveRef.current = false
      }
    }

    const handleMouseLeave = () => {
      mouseActiveRef.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

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

      const heroVisible = scrollRef.current < height * 0.3
      if (!startTimeRef.current && heroVisible) startTimeRef.current = now
      if (!heroVisible) startTimeRef.current = null
      const progress = startTimeRef.current ? Math.min((now - startTimeRef.current) / 5000, 1) : 0

      const baseScale = getScale()
      const scale = baseScale * (0.25 + progress * 0.75)
      const pos = posRef.current

      // ── Yarn physics calculations ──────────────────────────────────────
      const yarn = yarnRef.current
      const defaultRestX = pos.x + 80
      const yarnFloor = pos.y + 52 * scale

      const currentX = yarn.x !== null ? yarn.x : defaultRestX
      const distFromStart = Math.abs(currentX - pos.x)
      const unwindFactor = Math.min(distFromStart / (width * 0.45 || 1), 1)
      const baseRadius = 18 * scale
      const yarnR = baseRadius * (1 - unwindFactor * 0.45) // Shrink when far away

      if (yarn.x === null) {
        yarn.x = defaultRestX
        yarn.y = yarnFloor
        yarn.targetX = defaultRestX
        yarn.targetY = yarnFloor
        yarn.vy = 0
      }

      const rebounding = now < yarn.reboundUntil

      if (rebounding && yarn.reboundStart) {
        const p = (now - yarn.reboundStart) / yarn.reboundDuration
        const targetX = pos.x + 80
        if (p >= 1) {
          yarn.x = targetX
          yarn.y = yarnFloor
          yarn.vx = 0
          yarn.vy = 0
          yarn.reboundStart = null
          yarn.reboundUntil = 0
        } else {
          // Smooth step ease horizontal progress (slower, non-glitchy)
          const smooth = p * p * (3 - 2 * p)
          yarn.x = yarn.reboundStartX + (targetX - yarn.reboundStartX) * smooth

          // High parabolic arc height
          const arcHeight = 120 * scale
          const baseHeight = yarn.reboundStartY + (yarnFloor - yarn.reboundStartY) * smooth
          yarn.y = baseHeight - Math.sin(p * Math.PI) * arcHeight

          // Spin the ball as it flies back
          yarn.roll -= 0.1
        }
      } else {
        const targetGoalX = mouseActiveRef.current ? (yarn.targetX !== null ? yarn.targetX : defaultRestX) : defaultRestX

        // Horizontal spring physics
        const dxYarn = targetGoalX - yarn.x
        yarn.vx += dxYarn * 0.05
        yarn.vx *= 0.82
        yarn.x += yarn.vx

        // Vertical physics (gravity / spring lift / floor collision)
        if (yarn.y === null) {
          yarn.y = yarnFloor
        }

        const targetGoalY = mouseActiveRef.current ? (yarn.targetY !== null ? yarn.targetY : yarnFloor) : yarnFloor
        if (mouseActiveRef.current && targetGoalY < yarnFloor - 10) {
          const dyYarn = targetGoalY - yarn.y
          yarn.vy += dyYarn * 0.065
          yarn.vy *= 0.8
        } else {
          yarn.vy += 0.4 * scale
        }

        yarn.y += yarn.vy

        // Floor collision check
        if (yarn.y >= yarnFloor) {
          yarn.y = yarnFloor
          if (Math.abs(yarn.vy) > 1.2 * scale) {
            yarn.vy = -Math.abs(yarn.vy) * 0.38
          } else {
            yarn.vy = 0
          }
        }

        // Roll based on horizontal velocity
        yarn.roll += yarn.vx / (yarnR || 1) * 0.8
      }

      // Collision with the vase — bounce the ball back toward the cat
      const vaseHit = heroScene.vase
      if (vaseHit.active && vaseHit.x !== null && !rebounding) {
        const ballX = yarn.x
        const ballY = yarn.y - yarnR
        const dxV = ballX - vaseHit.x
        const dyV = ballY - vaseHit.y
        const minDist = yarnR + vaseHit.radius
        const distV = Math.hypot(dxV, dyV)
        if (distV < minDist && distV > 0) {
          const nx = dxV / distV
          const ny = dyV / distV
          const overlap = minDist - distV
          yarn.x += nx * overlap
          yarn.y += ny * overlap

          // Turn off active mouse tracking so it rolls back home
          mouseActiveRef.current = false

          // Initialize controlled parabolic arc back to the cat (1.8 seconds duration)
          yarn.reboundStartX = yarn.x
          yarn.reboundStartY = yarn.y
          yarn.reboundStart = now
          yarn.reboundDuration = 1800
          yarn.reboundUntil = now + 1800
          yarn.vx = 0
          yarn.vy = 0

          const impactSpeed = Math.max(Math.abs(yarn.vx), 8 * scale)
          hitVase(Math.sign(nx || 1) * -Math.min(impactSpeed * 0.014, 0.16))
        }
      }

      // Track thread history trail
      if (progress >= 0.3) {
        const history = threadHistoryRef.current
        history.push({ x: yarn.x, y: yarn.y - yarnR })
        const maxHistoryLength = Math.floor(8 + unwindFactor * 72)
        while (history.length > maxHistoryLength) {
          history.shift()
        }
      }

      const x = pos.x
      const y = pos.y - 200 * (1 - progress)

      // Direction cat looks — toward the yarn ball
      const headWorldY = y - 48 * scale + (-6) * scale
      const yarnAngle = Math.atan2((yarn.y - yarnR) - headWorldY, yarn.x - x)
      const lookDX = Math.cos(yarnAngle) * 2.2
      const lookDY = Math.sin(yarnAngle) * 1.6

      if (progress >= 1 && !balloonShownRef.current) {
        balloonShownRef.current = true
        balloonPosRef.current = { x, y }
        setBalloonVisible(true)
      }

      if (scrollRef.current >= height * 0.55) {
        if (balloonVisible) setBalloonVisible(false)
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      if (!balloonVisible && balloonShownRef.current && heroVisible) {
        setBalloonVisible(true)
      }

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
      const walking = progress < 1

      if (isDark) {
        const lampGlow = ctx.createRadialGradient(x, y - 30, 30 * scale, x, y - 30, 280 * scale)
        lampGlow.addColorStop(0, 'rgba(255, 220, 140, 0.35)')
        lampGlow.addColorStop(0.4, 'rgba(255, 190, 90, 0.12)')
        lampGlow.addColorStop(1, 'rgba(255, 150, 50, 0)')
        ctx.fillStyle = lampGlow
        ctx.fillRect(0, 0, width, height)
      }

      // Draw the main cat using shared module catDraw
      drawCatBody(ctx, {
        x,
        y,
        scale,
        t,
        isDark,
        walkProgress: progress,
        walking,
        lookDX,
        lookDY,
        eyesOpen,
        earTwitch,
      })

      // ── Draw yarn ball (after cat so it's in front) ──────────────────
      if (progress >= 0.3) {
        const yarnAlpha = Math.min((progress - 0.3) / 0.4, 1)
        ctx.save()
        ctx.globalAlpha = yarnAlpha
        drawYarn(yarn.x, yarn.y - yarnR, yarnR, yarn.roll, isDark, t)
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme])

  useEffect(() => {
    if (!balloonVisible) return
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, messages.length - 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [balloonVisible, messages.length])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-40 hidden md:block"
        aria-hidden="true"
        style={{ cursor: 'none' }}
      />
      {balloonVisible && (
        <button
          onClick={() => {
            const el = document.getElementById('contact-cta')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          className="absolute z-50 cursor-pointer group hidden md:block"
          style={{
            left: balloonPosRef.current.x,
            top: balloonPosRef.current.y - 150,
            transform: 'translate(-50%, -100%)',
            animation: 'cloud-float 3s ease-in-out infinite',
          }}
        >
          <svg
            viewBox="0 0 360 240"
            className="h-auto w-[300px] sm:w-[360px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="cat-cloud-fill" cx="45%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </radialGradient>
              <radialGradient id="puff-shading-1" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.75" />
              </radialGradient>
              <filter id="cat-cloud-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#334155" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Underlay / Outline with soft shadow */}
            <path
              d="
                M 55,160
                C 30,160 20,140 24,120
                C 10,108 10,86 26,72
                C 18,56 28,36 50,32
                C 56,14 76,4 100,10
                C 112,0 132,0 148,10
                C 160,0 184,0 196,12
                C 212,2 236,8 246,24
                C 268,16 290,32 292,54
                C 312,60 324,80 318,100
                C 334,112 336,136 320,150
                C 318,170 302,178 282,176
                C 260,176 244,180 230,174
                C 214,166 190,166 174,174
                C 158,182 136,182 120,174
                C 104,166 80,166 68,174
                C 50,176 48,168 55,160 Z
              "
              fill="url(#cat-cloud-fill)"
              filter="url(#cat-cloud-soft)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
              className="dark:stroke-gray-700"
            />

            {/* Overlapping cumulus puffs inside the cloud to add volume */}
            <circle cx="70" cy="112" r="38" fill="url(#puff-shading-1)" />
            <circle cx="110" cy="68" r="44" fill="url(#puff-shading-1)" />
            <circle cx="178" cy="50" r="46" fill="url(#puff-shading-1)" />
            <circle cx="242" cy="62" r="42" fill="url(#puff-shading-1)" />
            <circle cx="290" cy="106" r="38" fill="url(#puff-shading-1)" />
            
            {/* Center cover to keep the text background perfectly clean and bright */}
            <ellipse cx="180" cy="110" rx="104" ry="48" fill="#ffffff" />
            <ellipse cx="180" cy="110" rx="104" ry="48" fill="url(#cat-cloud-fill)" opacity="0.3" />

            {/* Fluffy well-defined thought circles leading to the cat */}
            <circle cx="176" cy="192" r="13"
              fill="url(#puff-shading-1)" stroke="#cbd5e1" strokeWidth="1.2"
              filter="url(#cat-cloud-soft)"
              className="dark:stroke-gray-700"
            />
            <circle cx="188" cy="214" r="9.5"
              fill="url(#puff-shading-1)" stroke="#cbd5e1" strokeWidth="1.2"
              filter="url(#cat-cloud-soft)"
              className="dark:stroke-gray-700"
            />
            <circle cx="198" cy="232" r="6.5"
              fill="url(#puff-shading-1)" stroke="#cbd5e1" strokeWidth="1.2"
              filter="url(#cat-cloud-soft)"
              className="dark:stroke-gray-700"
            />
            <circle cx="206" cy="246" r="4.2"
              fill="url(#puff-shading-1)" stroke="#cbd5e1" strokeWidth="1.2"
              filter="url(#cat-cloud-soft)"
              className="dark:stroke-gray-700"
            />

            {/* Text area */}
            <foreignObject x="38" y="20" width="284" height="148">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                className="flex h-full items-center justify-center text-center leading-snug font-bold text-gray-950 dark:text-gray-950"
                style={{ fontFamily: "'Caveat', cursive", fontSize: '1.45rem', padding: '4px 12px' }}
              >
                {messages[messageIndex]}
              </div>
            </foreignObject>
          </svg>
        </button>
      )}
    </>
  )
}
