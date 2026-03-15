import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthContext } from '../../../shared/context/auth-context'
import { login } from '../services/auth.service'
import { AuthShell } from './AuthShell'
import { Field, SubmitButton, fieldInputStyle, inputClassName } from './auth-primitives'

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
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to your account"
      footer={
        <p className="text-sm text-gray-400">
          No account?{' '}
          <Link to="/signup" className="text-gray-900 font-medium hover:underline underline-offset-2">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {errors.root && (
          <p role="alert" className="text-sm text-red-600">
            {errors.root.message}
          </p>
        )}

        <Field label="Email" error={errors.email?.message} errorId="email-error">
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClassName}
            style={fieldInputStyle(!!errors.email)}
            {...register('email')}
          />
        </Field>

        <Field label="Password" error={errors.password?.message} errorId="password-error">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            style={fieldInputStyle(!!errors.password)}
            {...register('password')}
          />
        </Field>

        <div className="pt-1">
          <SubmitButton loading={isSubmitting} label="Sign in" loadingLabel="Signing in…" />
        </div>
      </form>
    </AuthShell>
  )
}
