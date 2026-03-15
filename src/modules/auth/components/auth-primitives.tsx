import type { ReactNode } from 'react'
import type React from 'react'

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
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-500 uppercase" style={{ letterSpacing: '0.12em' }}>
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500 pt-0.5">
          {error}
        </p>
      )}
    </div>
  )
}

export function fieldInputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: hasError ? '2px solid #ef4444' : '1.5px solid #e5e7eb',
    borderRadius: 0,
    padding: '8px 0',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    transition: 'border-color 0.15s',
  }
}

export const inputClassName = 'auth-input-underline w-full bg-transparent'

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
      className="w-full py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      style={{ background: '#1A7A4A', borderRadius: '4px' }}
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
