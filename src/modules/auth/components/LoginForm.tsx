import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthContext } from '../../../shared/context/auth-context'
import { login } from '../services/auth.service'
import './auth.css'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { persistAuth } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data)
      persistAuth(response.token, response.user)
      navigate({ to: '/dashboard' })
    } catch {
      setError('root', { message: 'Invalid email or password' })
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <p className="auth-brand">Soegih</p>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your personal finance dashboard</p>
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
                  autoComplete="current-password"
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`auth-submit${isSubmitting ? ' loading' : ''}`}
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  )
}
