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
          <h1 className="text-3xl font-bold text-gray-900">Wallets</h1>
          <p className="text-gray-500 mt-1">Manage your financial accounts</p>
        </div>
        <button
          onClick={handleOpenForm}
          className="px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
        >
          + New Wallet
        </button>
      </div>

      {/* Table - Always Visible */}
      <WalletTable
        wallets={wallets}
        isLoading={isLoading}
        onEdit={handleEditWallet}
        onDelete={(wallet) => setDeleteConfirmWallet(wallet)}
      />

      {/* Mobile Card Alternative (shown only on very small screens if preferred) */}
      {/* Currently disabled - table is responsive on all sizes */}

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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setDeleteConfirmWallet(null)}>
          <div
            className="bg-white rounded-lg shadow-lg max-w-sm w-full border border-gray-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Wallet?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteConfirmWallet.name}</span>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmWallet(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWallet(deleteConfirmWallet)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors font-medium text-sm"
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
