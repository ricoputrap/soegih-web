import type { ReactNode } from 'react'

export function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: string
  error?: string
  errorId: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-medium"
        style={{ fontSize: '14px', color: '#111827' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" style={{ fontSize: '13px', color: '#DC2626' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function AuthInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props
  return (
    <input
      {...rest}
      className="auth-field-input w-full"
      style={{
        background: '#FFFFFF',
        border: hasError ? '1px solid #DC2626' : '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '14px',
        color: '#111827',
        outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: 'inherit',
      }}
    />
  )
}

export function SubmitButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean
  label: string
  loadingLabel: string
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="auth-submit-btn w-full font-medium flex items-center justify-center gap-2"
      style={{
        background: '#2D7A7F',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '11px 20px',
        fontSize: '14px',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'opacity 0.15s, background 0.15s',
        fontFamily: 'inherit',
        fontWeight: 500,
      }}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}

import type React from 'react'
