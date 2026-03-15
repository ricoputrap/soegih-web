import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/transactions')({
  component: () => <div>Transactions (placeholder)</div>,
})
