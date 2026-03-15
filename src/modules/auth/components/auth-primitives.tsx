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
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium text-neutral">{label}</span>
      </label>
      {children}
      {error && (
        <label className="label">
          <span id={errorId} role="alert" className="label-text-alt text-error">
            {error}
          </span>
        </label>
      )}
    </div>
  )
}

export function AuthInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props
  return (
    <input
      {...rest}
      className={`input input-bordered w-full bg-white text-neutral ${
        hasError ? 'input-error' : ''
      }`}
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
      className="btn btn-primary w-full text-white font-medium"
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}

import type React from 'react'
