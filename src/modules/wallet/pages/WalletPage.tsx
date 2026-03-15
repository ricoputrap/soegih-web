import { useState } from 'react'
import { useWallets, useCreateWallet, useUpdateWallet, useDeleteWallet } from '../hooks/use-wallets'
import { WalletForm } from '../components/WalletForm'
import { WalletTable } from '../components/WalletTable'
import { WalletCard } from '../components/WalletCard'
import type { Wallet, CreateWalletRequest, UpdateWalletRequest } from '../types/wallet.types'

export function WalletPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null)
  const [deleteConfirmWallet, setDeleteConfirmWallet] = useState<Wallet | null>(null)

  const { data: wallets = [], isLoading } = useWallets()
  const createMutation = useCreateWallet()
  const updateMutation = useUpdateWallet()
  const deleteMutation = useDeleteWallet()

  const handleOpenForm = () => {
    setEditingWallet(null)
    setIsFormOpen(true)
  }

  const handleEditWallet = (wallet: Wallet) => {
    setEditingWallet(wallet)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingWallet(null)
  }

  const handleFormSubmit = async (data: CreateWalletRequest | UpdateWalletRequest) => {
    try {
      if (editingWallet) {
        await updateMutation.mutateAsync({ id: editingWallet.id, data })
      } else {
        await createMutation.mutateAsync(data as CreateWalletRequest)
      }
      handleCloseForm()
    } catch (error) {
      console.error('Failed to save wallet:', error)
    }
  }

  const handleDeleteWallet = async (wallet: Wallet) => {
    try {
      await deleteMutation.mutateAsync(wallet.id)
      setDeleteConfirmWallet(null)
    } catch (error) {
      console.error('Failed to delete wallet:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Wallets</h1>
          <p className="text-slate-400 mt-1">Manage your financial accounts</p>
        </div>
        <button
          onClick={handleOpenForm}
          className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
        >
          + New Wallet
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <WalletTable
          wallets={wallets}
          isLoading={isLoading}
          onEdit={handleEditWallet}
          onDelete={(wallet) => setDeleteConfirmWallet(wallet)}
        />
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-slate-700 border-t-amber-500 rounded-full" />
          </div>
        ) : wallets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No wallets yet. Create one to get started!</p>
          </div>
        ) : (
          wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={() => handleEditWallet(wallet)}
              onDelete={() => setDeleteConfirmWallet(wallet)}
            />
          ))
        )}
      </div>

      {/* Form Modal */}
      <WalletForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={editingWallet || undefined}
        isEdit={!!editingWallet}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmWallet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDeleteConfirmWallet(null)}>
          <div
            className="bg-slate-900 rounded-lg shadow-2xl max-w-sm w-full border border-slate-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-2">Delete Wallet?</h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete <span className="font-medium text-white">{deleteConfirmWallet.name}</span>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmWallet(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWallet(deleteConfirmWallet)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 rounded-lg bg-red-900 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors font-medium text-sm"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
