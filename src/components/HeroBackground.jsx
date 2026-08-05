import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

export default function HeroBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const heroImage = isDark
    ? 'https://images.unsplash.com/photo-1758843425923-9cad18eb2b7a?fm=jpg&q=80&w=2000&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1773751392342-17d8ae9e9f93?fm=jpg&q=80&w=2000&auto=format&fit=crop'

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Hero background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover transition-opacity duration-1000"
          loading="eager"
        />
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(10, 10, 18, 0.7) 0%, rgba(10, 10, 18, 0.85) 50%, rgba(10, 10, 18, 0.95) 100%)'
              : 'linear-gradient(180deg, rgba(250, 248, 244, 0.6) 0%, rgba(250, 248, 244, 0.8) 50%, rgba(250, 248, 244, 0.92) 100%)',
          }}
        />
      </div>

      {/* Layered mesh gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 20% 40%, rgba(79, 70, 229, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(45, 212, 191, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 50% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 55%),
              radial-gradient(ellipse 90% 70% at 70% 60%, rgba(79, 70, 229, 0.06) 0%, transparent 60%),
              linear-gradient(180deg, rgba(10, 10, 18, 0) 0%, rgba(10, 10, 18, 0.5) 100%)
            `
            : `
              radial-gradient(ellipse 80% 60% at 20% 40%, rgba(79, 70, 229, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(13, 148, 136, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 50% 80%, rgba(168, 85, 247, 0.04) 0%, transparent 55%),
              radial-gradient(ellipse 90% 70% at 70% 60%, rgba(79, 70, 229, 0.03) 0%, transparent 60%),
              linear-gradient(180deg, rgba(250, 248, 244, 0) 0%, rgba(250, 248, 244, 0.5) 100%)
            `,
        }}
      />

      {/* Aurora glow orbs */}
      <motion.div
        className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full opacity-60 blur-[100px]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[5%] top-[30%] h-[400px] w-[400px] rounded-full opacity-50 blur-[80px]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      <motion.div
        className="absolute left-[40%] bottom-[10%] h-[350px] w-[350px] rounded-full opacity-40 blur-[90px]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />

      {/* Central orbital ring focal point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-[300px] w-[300px] rounded-full border border-line-strong opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-line-strong opacity-15"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-16 rounded-full border border-brand/20 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
