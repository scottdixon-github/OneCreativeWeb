import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cwi-cookie-consent')
    if (consent === null) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cwi-cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cwi-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-surface-elevated/95 p-5 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-sm font-bold text-content">Cookie Preferences</h2>
            <p className="text-sm text-content-muted">
              We use cookies to enhance your experience, analyze site traffic, and serve personalized content.{' '}
              <a href="#" className="underline hover:text-brand">Learn more</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="rounded-full border border-line-strong bg-surface-sunken px-4 py-2 text-sm font-semibold text-content transition hover:bg-surface-elevated"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-glow-brand transition hover:bg-brand/90"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="flex h-8 w-8 items-center justify-center rounded-full text-content-muted hover:text-content hover:bg-surface-sunken sm:hidden"
              aria-label="Close cookie notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
