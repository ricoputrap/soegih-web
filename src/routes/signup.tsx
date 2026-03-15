import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '../modules/auth/components/SignupForm'

export const Route = createFileRoute('/signup')({
  component: SignupForm,
})
