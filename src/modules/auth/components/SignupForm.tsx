import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthContext } from '../../../shared/context/auth-context'
import { signup } from '../services/auth.service'
import './auth.css'

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
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <p className="auth-brand">Soegih</p>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Start tracking your finances with clarity</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="auth-form-body">
            {errors.root && (
              <p role="alert" className="auth-root-error">
                {errors.root.message}
              </p>
            )}

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Email</label>
              <div className="auth-input-wrap">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`auth-input${errors.email ? ' error' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p id="email-error" role="alert" className="auth-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className={`auth-input${errors.password ? ' error' : ''}`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p id="password-error" role="alert" className="auth-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`auth-input${errors.confirmPassword ? ' error' : ''}`}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p id="confirm-error" role="alert" className="auth-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`auth-submit${isSubmitting ? ' loading' : ''}`}
            >
              {isSubmitting ? 'Creating account…' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
