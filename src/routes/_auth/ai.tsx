import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/ai')({
  component: () => <div>AI Chat (placeholder)</div>,
})
