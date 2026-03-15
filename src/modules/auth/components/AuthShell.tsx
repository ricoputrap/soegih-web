import type { ReactNode } from 'react'

interface AuthShellProps {
  heading: string
  subheading: string
  children: ReactNode
  footer: ReactNode
}

export function AuthShell({ heading, subheading, children, footer }: AuthShellProps) {
  return (
    <div className="fixed inset-0 flex bg-[#0a0a0f] overflow-auto">
      {/* ── Left panel – brand ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-[#0a0a0f] to-[#0a0a0f]" />

        {/* Geometric orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-violet-500/8 blur-[60px] animate-[pulse_8s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-900/5 blur-[100px]" />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Soegih</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Your finances,<br />
            <span className="text-violet-400">crystal clear.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Track every transaction, understand your spending, and grow your wealth with intelligent insights.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Wallet tracking', 'AI parsing', 'Smart dashboard', 'Categories'].map((f) => (
              <span key={f} className="text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-slate-600">© 2026 Soegih. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right panel – form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Soegih</span>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm p-8 shadow-[0_0_80px_rgba(139,92,246,0.06)]">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white tracking-tight mb-1">{heading}</h1>
              <p className="text-sm text-slate-500">{subheading}</p>
            </div>

            {children}
          </div>

          <div className="mt-5 text-center">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
