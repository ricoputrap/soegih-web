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
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-base-200">
        <div className="w-full max-w-[400px]">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-base text-neutral">Soegih</span>
          </div>

          {/* Card */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body gap-6">
              <div>
                <h1 className="card-title text-2xl font-bold text-neutral">{heading}</h1>
                <p className="text-sm text-gray-500 mt-1">{subheading}</p>
              </div>

              {children}
            </div>
          </div>

          <div className="mt-5 text-center text-sm">{footer}</div>
        </div>
      </div>
    </>
  )
}
