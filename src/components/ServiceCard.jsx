import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

export default function ServiceCard({ service }) {
  const Icon = service.icon

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-surface-elevated p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-glow-brand"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-accent/15 ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-brand" />
        </div>
        <span className="rounded-full bg-surface-sunken px-3.5 py-1 text-xs font-semibold text-content border border-line">
          {service.startingPrice}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold text-content">{service.title}</h3>
      <p className="mt-1.5 text-sm font-medium text-content-muted">{service.tagline}</p>

      <ul className="mt-4 flex-1 space-y-2">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm font-medium text-content-muted">
            <Check className="h-4 w-4 flex-shrink-0 text-accent stroke-[2.5]" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-brand transition-all duration-300 group-hover:gap-2.5">
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
      </div>
    </Link>
  )
}
