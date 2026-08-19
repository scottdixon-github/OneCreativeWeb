import { motion } from 'framer-motion'

export default function GradientBorderCard({ children, className = '', borderWidth = 1.5 }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          background: 'linear-gradient(135deg, var(--brand), var(--accent), var(--brand))',
          backgroundSize: '200% 200%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </div>
  )
}
