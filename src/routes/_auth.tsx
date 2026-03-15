import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getToken } from '../shared/lib/token-store'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    if (!getToken()) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => <Outlet />,
})
