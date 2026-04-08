import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

// ── Button ─────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary', size = 'md', loading, children, className, disabled, ...props
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1'
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-300',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], (disabled || loading) && 'opacity-60 cursor-not-allowed', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
}


// ── Card ───────────────────────────────────────────────────────────────────

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-white rounded-xl border border-slate-200 shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('px-6 py-4 border-b border-slate-100', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('px-6 py-4', className)}>{children}</div>
}


// ── Input ──────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={clsx(
          'w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-900 placeholder-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition',
          error ? 'border-red-400' : 'border-slate-200',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Select({
  label, error, children, className, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={clsx(
          'w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-900',
          'focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition',
          error ? 'border-red-400' : 'border-slate-200',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}


// ── Status Badge ───────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  pending:            'bg-slate-100 text-slate-700',
  picked_up:          'bg-blue-100 text-blue-700',
  in_transit:         'bg-indigo-100 text-indigo-700',
  at_hub:             'bg-purple-100 text-purple-700',
  out_for_delivery:   'bg-orange-100 text-orange-700',
  delivered:          'bg-green-100 text-green-700',
  failed:             'bg-red-100 text-red-700',
  returned:           'bg-yellow-100 text-yellow-700',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  at_hub: 'At Hub',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  failed: 'Failed',
  returned: 'Returned',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      STATUS_STYLES[status] || 'bg-slate-100 text-slate-700'
    )}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────

export function StatCard({
  label, value, icon: Icon, color = 'orange'
}: {
  label: string; value: number | string; icon: React.ElementType; color?: string
}) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 text-orange-600',
    green:  'bg-green-50 text-green-600',
    blue:   'bg-blue-50 text-blue-600',
    red:    'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    slate:  'bg-slate-100 text-slate-600',
  }
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', colors[color])}>
          <Icon size={22} />
        </div>
      </div>
    </Card>
  )
}

// ── Empty State ────────────────────────────────────────────────────────────

export function EmptyState({ message = 'No data found', icon: Icon }: { message?: string; icon?: React.ElementType }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      {Icon && <Icon size={40} className="mb-3 opacity-40" />}
      <p className="text-sm">{message}</p>
    </div>
  )
}

// ── Loading spinner ────────────────────────────────────────────────────────

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 size={28} className="animate-spin text-orange-500" />
    </div>
  )
}
