import type { ReactNode } from "react";

export function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-medium text-sm text-gray-900 self-start">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-600 m-0 self-start"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean },
) {
  const { hasError, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full bg-white text-gray-900 rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-150 outline-none ${
        hasError ? "border border-red-600" : "border border-gray-200"
      } focus:border-teal-600 focus:ring-1 focus:ring-teal-100`}
    />
  );
}

export function SubmitButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white transition-all duration-150 ${
        loading
          ? "bg-teal-600 opacity-70 cursor-not-allowed"
          : "bg-teal-600 hover:bg-teal-700 cursor-pointer"
      }`}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

import type React from "react";
