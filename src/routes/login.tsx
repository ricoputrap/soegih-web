import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '../modules/auth/components/LoginForm'

export const Route = createFileRoute('/login')({
  component: LoginForm,
})
