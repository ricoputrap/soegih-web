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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <div
        className="fixed inset-0 overflow-auto bg-white flex items-center justify-center px-4 py-12"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        <div className="w-full max-w-[360px]">
          {/* Brand */}
          <div className="mb-10">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: '#1A7A4A', letterSpacing: '0.2em' }}
            >
              Soegih
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
              {heading}
            </h1>
            <p className="text-sm text-gray-400">{subheading}</p>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <div className="mt-6">{footer}</div>
        </div>
      </div>
    </>
  )
}
