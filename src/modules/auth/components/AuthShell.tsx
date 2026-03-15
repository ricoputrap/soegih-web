import type { ReactNode } from 'react'

interface AuthShellProps {
  heading: string
  subheading: string
  children: ReactNode
  footer: ReactNode
}

export function AuthShell({ heading, subheading, children, footer }: AuthShellProps) {
  return (
    <>
      {/* Load Syne (display) + Instrument Sans (body) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="fixed inset-0 overflow-auto"
        style={{ background: '#F5F0E8', fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {/* Subtle dot-grid texture */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #00000010 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative min-h-full flex">
          {/* ── Left panel ─────────────────────────────────────────── */}
          <div
            className="hidden lg:flex lg:w-[42%] flex-col justify-between p-14"
            style={{ borderRight: '3px solid #0A0A0A' }}
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center"
                style={{
                  background: '#0A0A0A',
                  border: '2px solid #0A0A0A',
                  boxShadow: '3px 3px 0 #0A0A0A',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#F5F0E8]">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                  <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                </svg>
              </div>
              <span className="text-[#0A0A0A] font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                SOEGIH
              </span>
            </div>

            {/* Hero copy */}
            <div className="space-y-6">
              <div
                className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase"
                style={{ background: '#0A0A0A', color: '#F5F0E8', letterSpacing: '0.15em' }}
              >
                Personal Finance
              </div>
              <h2
                className="text-5xl leading-[1.05] text-[#0A0A0A]"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              >
                Know where<br />every rupiah<br />goes.
              </h2>
              <p className="text-[#3D3D3D] text-base leading-relaxed max-w-[280px]">
                Track wallets, categorize spending, and parse transactions with AI — all in one place.
              </p>

              {/* Feature list with hard-border tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Wallets', 'Categories', 'AI Chat', 'Dashboard'].map((f) => (
                  <span
                    key={f}
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5"
                    style={{
                      border: '2px solid #0A0A0A',
                      boxShadow: '2px 2px 0 #0A0A0A',
                      background: '#F5F0E8',
                      color: '#0A0A0A',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#888] font-medium tracking-widest uppercase">
              © 2026 Soegih
            </p>
          </div>

          {/* ── Right panel – form ──────────────────────────────────── */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
            <div className="w-full max-w-[420px]">
              {/* Mobile brand */}
              <div className="flex items-center gap-3 mb-10 lg:hidden">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ background: '#0A0A0A', border: '2px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#F5F0E8]">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                  </svg>
                </div>
                <span className="text-[#0A0A0A] font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                  SOEGIH
                </span>
              </div>

              {/* Form card */}
              <div
                style={{
                  background: '#FDFAF4',
                  border: '3px solid #0A0A0A',
                  boxShadow: '6px 6px 0 #0A0A0A',
                }}
              >
                {/* Card header stripe */}
                <div
                  className="px-8 py-5"
                  style={{ borderBottom: '3px solid #0A0A0A', background: '#0A0A0A' }}
                >
                  <h1
                    className="text-xl text-[#F5F0E8] uppercase tracking-wider"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                  >
                    {heading}
                  </h1>
                  <p className="text-xs text-[#999] mt-0.5 tracking-wide">{subheading}</p>
                </div>

                {/* Form body */}
                <div className="px-8 py-7">
                  {children}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 text-center">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
