import { motion } from 'framer-motion'

export default function FloatingShapes({ className = '' }) {
  const shapes = [
    { type: 'circle', size: 'h-20 w-20', pos: 'left-[8%] top-[15%]', delay: 0, duration: 8 },
    { type: 'ring', size: 'h-16 w-16', pos: 'right-[12%] top-[25%]', delay: 2, duration: 10 },
    { type: 'triangle', size: 'h-14 w-14', pos: 'left-[15%] bottom-[20%]', delay: 4, duration: 9 },
    { type: 'circle', size: 'h-10 w-10', pos: 'right-[8%] bottom-[30%]', delay: 1, duration: 7 },
    { type: 'square', size: 'h-8 w-8', pos: 'left-[45%] top-[10%]', delay: 3, duration: 11 },
    { type: 'ring', size: 'h-12 w-12', pos: 'right-[40%] bottom-[15%]', delay: 5, duration: 8 },
    { type: 'diamond', size: 'h-6 w-6', pos: 'left-[60%] top-[60%]', delay: 2.5, duration: 9 },
    { type: 'circle', size: 'h-4 w-4', pos: 'right-[25%] top-[50%]', delay: 4.5, duration: 6 },
  ]

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg rotate-45',
    ring: 'rounded-full border-2 border-current',
    triangle: 'clip-path-triangle',
    diamond: 'rounded-sm rotate-45',
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.pos} ${shape.size} ${
            shape.type === 'ring' ? '' : 'bg-brand/10'
          } ${shapeStyles[shape.type] || ''}`}
          style={shape.type === 'ring' ? { borderColor: 'var(--brand)' } : undefined}
          animate={{
            rotate: shape.type === 'square' || shape.type === 'diamond' ? [45, 90, 45] : [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
