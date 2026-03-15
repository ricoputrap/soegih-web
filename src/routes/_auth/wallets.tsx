import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/wallets')({
  component: () => <div>Wallets (placeholder)</div>,
})
