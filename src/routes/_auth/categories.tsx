import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/categories')({
  component: () => <div>Categories (placeholder)</div>,
})
