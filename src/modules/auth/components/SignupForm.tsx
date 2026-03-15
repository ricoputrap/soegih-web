import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthContext } from '../../../shared/context/auth-context'
import { signup } from '../services/auth.service'
import { AuthShell } from './AuthShell'
import { Field, SubmitButton, fieldInputStyle, inputClassName } from './auth-primitives'

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
    <AuthShell
      heading="Create account"
      subheading="Start tracking your finances"
      footer={
        <p className="text-sm text-gray-400">
          Have an account?{' '}
          <Link to="/login" className="text-gray-900 font-medium hover:underline underline-offset-2">
            Sign in
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
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={inputClassName}
            style={fieldInputStyle(!!errors.password)}
            {...register('password')}
          />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message} errorId="confirm-error">
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            className={inputClassName}
            style={fieldInputStyle(!!errors.confirmPassword)}
            {...register('confirmPassword')}
          />
        </Field>

        <div className="pt-1">
          <SubmitButton loading={isSubmitting} label="Create account" loadingLabel="Creating account…" />
        </div>
      </form>
    </AuthShell>
  )
}
