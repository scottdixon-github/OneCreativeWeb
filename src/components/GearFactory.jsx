import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'

const PRESENT_TYPES = [
  { name: "E-Commerce", color: "#3b82f6", ribbon: "#ef4444", pattern: "stripe" },
  { name: "SaaS App", color: "#10b981", ribbon: "#f59e0b", pattern: "polka" },
  { name: "Portfolio", color: "#8b5cf6", ribbon: "#ec4899", pattern: "stars" },
  { name: "Marketing Site", color: "#f97316", ribbon: "#3b82f6", pattern: "stripe" },
  { name: "Custom SaaS", color: "#ec4899", ribbon: "#10b981", pattern: "polka" }
]

function Gear({ progress, cx, cy, r, teeth, rotateSpeed, clockwise = true }) {
  // Tooth geometry: pitch circles touch
  const gearTeeth = Array.from({ length: teeth }).map((_, i) => {
    const angle = (i * 360) / teeth
    const angleRad = (angle * Math.PI) / 180
    
    const innerR = r - 3
    const outerR = r + 3
    
    const x1 = cx + innerR * Math.cos(angleRad - 0.08)
    const y1 = cy + innerR * Math.sin(angleRad - 0.08)
    const x2 = cx + outerR * Math.cos(angleRad - 0.03)
    const y2 = cy + outerR * Math.sin(angleRad - 0.03)
    const x3 = cx + outerR * Math.cos(angleRad + 0.03)
    const y3 = cy + outerR * Math.sin(angleRad + 0.03)
    const x4 = cx + innerR * Math.cos(angleRad + 0.08)
    const y4 = cy + innerR * Math.sin(angleRad + 0.08)
    
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} L ${x4.toFixed(1)} ${y4.toFixed(1)} Z`
  }).join(' ')

  // Dynamically generate the central spiral hairspring to match the larger watch escapement gear style
  const generateSpiral = () => {
    let path = `M ${cx} ${cy}`
    const maxSpiralR = r * 0.4
    // Draw 3 complete turns
    for (let theta = 0; theta < Math.PI * 6; theta += 0.15) {
      const currentR = (theta / (Math.PI * 6)) * maxSpiralR
      const x = cx + currentR * Math.cos(theta)
      const y = cy + currentR * Math.sin(theta)
      path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return path
  }
  const spiralPath = generateSpiral()

  // 360 * rotateSpeed * 10 is always a multiple of 360, so the loop resets smoothly
  const totalAngle = 360 * rotateSpeed * 10 * (clockwise ? 1 : -1)
  const rotation = useTransform(progress, [0, 1], [0, totalAngle])

  return (
    <motion.g
      style={{ rotate: rotation, originX: `${cx}px`, originY: `${cy}px` }}
    >
      {/* Outer rim */}
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Outer teeth */}
      <path d={gearTeeth} fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
      {/* Inner concentric rim (making all gears look like the larger watch escapement sprocket) */}
      <circle cx={cx} cy={cy} r={r * 0.65} stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Spokes */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Spiral Hairspring */}
      <path d={spiralPath} stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none" />
      {/* Center hub */}
      <circle cx={cx} cy={cy} r="3.5" fill="currentColor" />
    </motion.g>
  )
}

export default function GearFactory() {
  const [presents, setPresents] = useState([])
  const progress = useMotionValue(0)

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 15,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    })
    return () => controls.stop()
  }, [])

  useEffect(() => {
    // Periodically output a new wrapped present website
    const interval = setInterval(() => {
      const type = PRESENT_TYPES[Math.floor(Math.random() * PRESENT_TYPES.length)]
      const newPresent = {
        id: Date.now(),
        name: type.name,
        color: type.color,
        ribbon: type.ribbon,
        pattern: type.pattern
      }
      setPresents((prev) => [...prev.slice(-4), newPresent])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto mt-6 w-full max-w-4xl rounded-3xl border border-line bg-surface-elevated/40 p-6 backdrop-blur-md shadow-inner overflow-hidden">
      {/* Conveyor belt background track */}
      <div className="absolute bottom-6 left-6 right-24 h-2 rounded-full bg-surface-sunken border border-line" />
      
      <svg
        viewBox="0 0 500 140"
        className="w-full h-auto text-brand/30 dark:text-brand/20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Conveyor Belt roller wheels */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none">
          <circle cx="90" cy="115" r="5" />
          <circle cx="160" cy="115" r="5" />
          <circle cx="230" cy="115" r="5" />
          <circle cx="300" cy="115" r="5" />
          <line x1="80" y1="115" x2="380" y2="115" strokeDasharray="3,3" />
        </g>

        {/* The Hopper/Funnel above the cat's head on the left */}
        <g transform="translate(10, 85)">
          {/* Glass/metal funnel cup */}
          <path
            d="M 12,5 Q 12,0 16,0 L 52,0 Q 56,0 56,5 L 44,28 Q 42,32 42,35 L 42,48 L 26,48 L 26,35 Q 26,32 24,28 Z"
            fill="color-mix(in srgb, var(--surface) 40%, transparent)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            className="dark:stroke-gray-700"
            opacity="0.9"
          />
          {/* Inner details to give it depth */}
          <ellipse cx="34" cy="2" rx="20" ry="4" fill="none" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-gray-700" />
          {/* Glowing collection status ring */}
          <circle cx="34" cy="40" r="4" fill="#10b981" opacity="0.6" className="animate-pulse" />
        </g>

        {/* Meshing gears chain going across the top (Styled like the larger watch balance wheel) */}
        <g className="text-brand/40 dark:text-brand/20">
          {/* Gear 1 */}
          <Gear progress={progress} cx={45} cy={45} r={28} teeth={18} rotateSpeed={1.0} clockwise={false} />
          {/* Gear 2 */}
          <Gear progress={progress} cx={91} cy={45} r={18} teeth={12} rotateSpeed={1.5} clockwise={true} />
          {/* Gear 3 */}
          <Gear progress={progress} cx={133} cy={45} r={24} teeth={15} rotateSpeed={1.2} clockwise={false} />
          {/* Gear 4 */}
          <Gear progress={progress} cx={181} cy={45} r={24} teeth={15} rotateSpeed={1.2} clockwise={true} />
          {/* Gear 5 */}
          <Gear progress={progress} cx={233} cy={45} r={28} teeth={18} rotateSpeed={1.0} clockwise={false} />
          {/* Gear 6 */}
          <Gear progress={progress} cx={277} cy={45} r={16} teeth={10} rotateSpeed={1.8} clockwise={true} />
          {/* Gear 7 (driving inside the box) */}
          <Gear progress={progress} cx={321} cy={45} r={28} teeth={18} rotateSpeed={1.0} clockwise={false} />
        </g>

        {/* The Output Box Machine (on the right) */}
        <g transform="translate(370, 20)">
          {/* Glass box body */}
          <rect x="0" y="0" width="100" height="90" rx="16" fill="color-mix(in srgb, var(--surface) 60%, transparent)" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-gray-700" />
          {/* Inner machinery elements */}
          <circle cx="50" cy="45" r="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" className="animate-spin" style={{ transformOrigin: '50px 45px', animationDuration: '6s' }} />
          {/* Output exit slot */}
          <path d="M 0,60 L 15,60 L 15,90 L 0,90 Z" fill="#475569" opacity="0.3" />
          {/* Exit flap */}
          <line x1="0" y1="60" x2="0" y2="90" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="50" cy="45" r="8" fill="#10b981" opacity="0.6" className="animate-pulse" />
        </g>

        {/* Animated wrapped presents that slide left and drop into the hopper */}
        <AnimatePresence>
          {presents.map((pres) => (
            <motion.g
              key={pres.id}
              initial={{ x: 375, y: 70, scale: 0, opacity: 0 }}
              animate={{ 
                x: [375, 44, 44], 
                y: [70, 70, 115],
                scale: [1, 1, 0],
                opacity: [1, 1, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 6.5, 
                ease: "linear",
                times: [0, 0.85, 1] 
              }}
            >
              {/* Box container */}
              <rect x="-18" y="10" width="36" height="30" rx="4" fill={pres.color} stroke="#ffffff" strokeWidth="1" shadow="lg" />
              
              {/* Wrapping paper patterns */}
              {pres.pattern === 'stripe' && (
                <g opacity="0.3" stroke="#ffffff" strokeWidth="2">
                  <line x1="-10" y1="10" x2="-10" y2="40" />
                  <line x1="10" y1="10" x2="10" y2="40" />
                </g>
              )}
              {pres.pattern === 'polka' && (
                <g opacity="0.45" fill="#ffffff">
                  <circle cx="-10" cy="18" r="2.5" />
                  <circle cx="10" cy="28" r="2.5" />
                  <circle cx="0" cy="22" r="2.5" />
                </g>
              )}
              {pres.pattern === 'stars' && (
                <g opacity="0.4" stroke="#ffffff" strokeWidth="1">
                  <path d="M -8 20 L -6 22 L -8 24 L -10 22 Z" fill="#ffffff" />
                  <path d="M 8 26 L 10 28 L 8 30 L 6 28 Z" fill="#ffffff" />
                </g>
              )}

              {/* Colorful ribbon crossing */}
              <rect x="-3" y="10" width="6" height="30" fill={pres.ribbon} />
              <rect x="-18" y="22" width="36" height="6" fill={pres.ribbon} />
              
              {/* Ribbon Bow at top */}
              <path d={`M -8,10 C -12,2 -2,2 -3,10 C -2,2 8,2 4,10 Z`} fill={pres.ribbon} stroke="#ffffff" strokeWidth="0.8" />

              {/* Mini White label tag with project name */}
              <g transform="translate(10, 14) rotate(15)">
                <rect x="-24" y="-8" width="48" height="15" rx="3" fill="#ffffff" stroke={pres.color} strokeWidth="1" />
                <text x="0" y="2" fill="#334155" fontSize="6.2" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  {pres.name}
                </text>
              </g>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
}
