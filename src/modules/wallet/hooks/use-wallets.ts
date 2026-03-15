import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWallets, createWallet, updateWallet, deleteWallet } from '../services/wallet.service'
import type { CreateWalletRequest, UpdateWalletRequest } from '../types/wallet.types'

export const walletKeys = {
  all: ['wallets'] as const,
}

export function useWallets() {
  return useQuery({
    queryKey: walletKeys.all,
    queryFn: getWallets,
  })
}

export function useCreateWallet() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateWalletRequest) => createWallet(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.all }),
  })
}

export function useUpdateWallet() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWalletRequest }) => updateWallet(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.all }),
  })
}

export function useDeleteWallet() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWallet(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: walletKeys.all }),
  })
}
