import type { Wallet } from '../types/wallet.types'

const walletTypeStyles: Record<string, { bg: string; text: string }> = {
  cash: { bg: 'bg-blue-900/40', text: 'text-blue-300' },
  bank: { bg: 'bg-teal-900/40', text: 'text-teal-300' },
  e_wallet: { bg: 'bg-purple-900/40', text: 'text-purple-300' },
  other: { bg: 'bg-slate-700/40', text: 'text-slate-300' },
}

const walletTypeLabels: Record<string, string> = {
  cash: 'Cash',
  bank: 'Bank',
  e_wallet: 'E-Wallet',
  other: 'Other',
}

interface WalletCardProps {
  wallet: Wallet
  onEdit: () => void
  onDelete: () => void
}

export function WalletCard({ wallet, onEdit, onDelete }: WalletCardProps) {
  const style = walletTypeStyles[wallet.type] || walletTypeStyles.other

  return (
    <div
      data-testid="wallet-row"
      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3 hover:bg-slate-800 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg">{wallet.name}</h3>
          <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold mt-2 ${style.bg} ${style.text}`}>
            {walletTypeLabels[wallet.type]}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-3">
        <p className="text-xs text-slate-400 mb-1">Balance</p>
        <p className="text-2xl font-mono font-bold text-amber-400">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
            parseFloat(wallet.balance),
          )}
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onEdit}
          data-testid="wallet-edit"
          className="flex-1 px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors font-medium"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          data-testid="wallet-delete"
          className="flex-1 px-3 py-2 text-sm bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
