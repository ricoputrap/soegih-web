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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '48px',
          paddingBottom: '48px',
          backgroundColor: '#F9FAFB',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Brand */}
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#2D7A7F',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: '16px', height: '16px', color: 'white' }}>
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>Soegih</span>
          </div>

          {/* Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                {heading}
              </h1>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>{subheading}</p>
            </div>

            {children}
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>{footer}</div>
        </div>
      </div>
    </>
  )
}
