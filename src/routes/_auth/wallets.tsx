import { createFileRoute } from '@tanstack/react-router'
import { WalletPage } from '../../modules/wallet/pages/WalletPage'

export const Route = createFileRoute('/_auth/wallets')({
  component: WalletPage,
})
