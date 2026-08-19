import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const NODE_COUNT = 26
const RAY_DISTANCE = 140
const SPRING = 0.012
const DAMPING = 0.92

class Node {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() - 0.5) * 1.5
    this.radius = Math.random() * 2.5 + 1.5
    this.pulsePhase = Math.random() * Math.PI * 2
    this.pulseSpeed = 0.02 + Math.random() * 0.02
    this.orbitRadius = 60 + Math.random() * 140
    this.orbitAngle = Math.random() * Math.PI * 2
    this.orbitSpeed = (Math.random() - 0.5) * 0.008
    this.driftPhase = Math.random() * Math.PI * 2
  }

  update(mouseX, mouseY, width, height, time) {
    this.orbitAngle += this.orbitSpeed
    this.pulsePhase += this.pulseSpeed
    this.driftPhase += 0.01

    const targetX = mouseX + Math.cos(this.orbitAngle) * this.orbitRadius
      + Math.sin(this.driftPhase) * 30
    const targetY = mouseY + Math.sin(this.orbitAngle) * this.orbitRadius * 0.7
      + Math.cos(this.driftPhase * 0.7) * 30

    this.vx += (targetX - this.x) * SPRING
    this.vy += (targetY - this.y) * SPRING

    this.vx *= DAMPING
    this.vy *= DAMPING

    this.x += this.vx
    this.y += this.vy

    if (this.x < -50) this.x = width + 50
    if (this.x > width + 50) this.x = -50
    if (this.y < -50) this.y = height + 50
    if (this.y > height + 50) this.y = -50

    this.currentRadius = this.radius * (1 + Math.sin(this.pulsePhase) * 0.35)
  }
}

export default function NodeSculpture() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const smoothMouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const isDark = theme === 'dark'

    const resize = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      const dpr = window.devicePixelRatio
      canvas.width = dimensionsRef.current.width * dpr
      canvas.height = dimensionsRef.current.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from(
        { length: NODE_COUNT },
        () => new Node(dimensionsRef.current.width, dimensionsRef.current.height)
      )
    }

    const nodeColor = isDark ? 'rgba(129, 140, 248,' : 'rgba(79, 70, 229,'
    const accentNodeColor = isDark ? 'rgba(45, 212, 191,' : 'rgba(13, 148, 136,'
    const rayColor = isDark ? 'rgba(129, 140, 248,' : 'rgba(79, 70, 229,'
    const coreRayColor = isDark ? 'rgba(45, 212, 191,' : 'rgba(13, 148, 136,'

    const animate = () => {
      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)
      timeRef.current += 1

      const smooth = smoothMouseRef.current
      const mouse = mouseRef.current
      smooth.x += (mouse.x - smooth.x) * 0.08
      smooth.y += (mouse.y - smooth.y) * 0.08

      const nodes = nodesRef.current

      for (const node of nodes) {
        node.update(smooth.x, smooth.y, width, height, timeRef.current)
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < RAY_DISTANCE) {
            const alpha = (1 - dist / RAY_DISTANCE) * 0.35
            const lineWidth = (1 - dist / RAY_DISTANCE) * 1.2

            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            gradient.addColorStop(0, `${rayColor} ${alpha})`)
            gradient.addColorStop(0.5, `${coreRayColor} ${alpha * 1.3})`)
            gradient.addColorStop(1, `${rayColor} ${alpha})`)

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = lineWidth
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        const mdx = smooth.x - node.x
        const mdy = smooth.y - node.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        const isCore = mdist < node.orbitRadius * 0.6

        const baseColor = isCore ? accentNodeColor : nodeColor
        const glowAlpha = isCore ? 0.5 : 0.25

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.currentRadius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `${baseColor} ${glowAlpha * 0.15})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `${baseColor} ${isCore ? 0.95 : 0.7})`
        ctx.fill()

        if (isCore && mdist < RAY_DISTANCE * 0.8) {
          const rayAlpha = (1 - mdist / (RAY_DISTANCE * 0.8)) * 0.25
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(smooth.x, smooth.y)
          ctx.strokeStyle = `${coreRayColor} ${rayAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      if (smooth.x > -500) {
        const corePulse = 1 + Math.sin(timeRef.current * 0.04) * 0.15
        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, 6 * corePulse, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? 'rgba(129, 140, 248, 0.6)' : 'rgba(79, 70, 229, 0.5)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, 14 * corePulse, 0, Math.PI * 2)
        ctx.strokeStyle = isDark ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme, handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  )
}
