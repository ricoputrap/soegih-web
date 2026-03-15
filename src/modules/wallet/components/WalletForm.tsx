import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import type { Wallet, CreateWalletRequest, UpdateWalletRequest } from '../types/wallet.types'

const walletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required'),
  type: z.enum(['cash', 'bank', 'e_wallet', 'other']),
  balance: z.number({ invalid_type_error: 'Balance must be a number' }).min(0, 'Balance cannot be negative'),
})

type WalletFormData = z.infer<typeof walletSchema>

interface WalletFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateWalletRequest | UpdateWalletRequest) => Promise<void>
  isLoading?: boolean
  initialData?: Wallet
  isEdit?: boolean
}

export function WalletForm({ isOpen, onClose, onSubmit, isLoading = false, initialData, isEdit = false }: WalletFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    mode: 'onChange',
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type,
      balance: parseFloat(initialData.balance),
    } : undefined,
  })

  useEffect(() => {
    if (isEdit && initialData) {
      setValue('name', initialData.name)
      setValue('type', initialData.type)
      setValue('balance', parseFloat(initialData.balance))
    }
  }, [isEdit, initialData, setValue])

  const handleFormSubmit = async (data: WalletFormData) => {
    await onSubmit(data)
    reset()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full border border-gray-200 p-6 animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit Wallet' : 'Create Wallet'}</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Wallet Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Daily Cash"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              {...register('name')}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          {/* Type Field */}
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
              Wallet Type
            </label>
            <select
              id="type"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer bg-white"
              {...register('type')}
            >
              <option value="">Select a type...</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank Account</option>
              <option value="e_wallet">E-Wallet</option>
              <option value="other">Other</option>
            </select>
            {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>}
          </div>

          {/* Balance Field */}
          <div>
            <label htmlFor="balance" className="block text-sm font-semibold text-gray-700 mb-2">
              Initial Balance
            </label>
            <input
              id="balance"
              type="number"
              step="0.01"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-mono"
              {...register('balance', { valueAsNumber: true })}
            />
            {errors.balance && <p className="text-xs text-red-600 mt-1">{errors.balance.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors font-medium text-sm"
            >
              {isSubmitting || isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
