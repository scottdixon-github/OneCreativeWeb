import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function TextReveal({ text, className = '', delay = 0, stagger = 0.03 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  )
}
