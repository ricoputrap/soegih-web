import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthContext } from '../../../shared/context/auth-context'
import { signup } from '../services/auth.service'
import { AuthShell } from './AuthShell'

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

const inputBase =
  'w-full px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#AAAAAA] outline-none transition-all bg-white font-medium'
const inputBorder = 'border-2 border-[#0A0A0A] shadow-[3px_3px_0_#0A0A0A] focus:shadow-[1px_1px_0_#0A0A0A] focus:translate-x-[2px] focus:translate-y-[2px]'
const inputError = 'border-2 border-[#D00000] shadow-[3px_3px_0_#D00000]'

export function SignupForm() {
  const { persistAuth } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup({ email: data.email, password: data.password })
      persistAuth(response.token, response.user)
      navigate({ to: '/dashboard' })
    } catch {
      setError('root', { message: 'Failed to create account. Try a different email.' })
    }
  }

  return (
    <AuthShell
      heading="Create Account"
      subheading="Start tracking your finances for free"
      footer={
        <p className="text-sm text-[#555]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#0A0A0A] underline underline-offset-2 decoration-2 hover:decoration-[#D4A017] transition-all"
          >
            Sign in →
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {errors.root && (
          <div
            role="alert"
            className="flex items-start gap-3 px-4 py-3 text-sm font-medium text-[#0A0A0A]"
            style={{ border: '2px solid #D00000', background: '#FFF0F0', boxShadow: '3px 3px 0 #D00000' }}
          >
            <span className="text-[#D00000] font-bold text-base leading-none mt-0.5">!</span>
            {errors.root.message}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#0A0A0A]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputBase} ${errors.email ? inputError : inputBorder}`}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs font-semibold text-[#D00000]">
              ↳ {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#0A0A0A]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`${inputBase} ${errors.password ? inputError : inputBorder}`}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" role="alert" className="text-xs font-semibold text-[#D00000]">
              ↳ {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#0A0A0A]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            className={`${inputBase} ${errors.confirmPassword ? inputError : inputBorder}`}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p id="confirm-error" role="alert" className="text-xs font-semibold text-[#D00000]">
              ↳ {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[#0A0A0A] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            style={{
              background: '#F5C518',
              border: '2.5px solid #0A0A0A',
              boxShadow: '4px 4px 0 #0A0A0A',
              fontFamily: "'Syne', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '2px 2px 0 #0A0A0A'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translate(2px, 2px)'
              }
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '4px 4px 0 #0A0A0A'
              ;(e.currentTarget as HTMLButtonElement).style.transform = ''
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating account…
              </>
            ) : (
              'Create Account →'
            )}
          </button>
        </div>
      </form>
    </AuthShell>
  )
}
