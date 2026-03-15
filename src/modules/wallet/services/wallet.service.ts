import { apiClient } from '../../../shared/lib/api-client'
import type { Wallet, CreateWalletRequest, UpdateWalletRequest } from '../types/wallet.types'

export async function getWallets(): Promise<Wallet[]> {
  const res = await apiClient.get<Wallet[]>('/api/v1/wallets')
  return res.data
}

export async function getWallet(id: string): Promise<Wallet> {
  const res = await apiClient.get<Wallet>(`/api/v1/wallets/${id}`)
  return res.data
}

export async function createWallet(data: CreateWalletRequest): Promise<Wallet> {
  const res = await apiClient.post<Wallet>('/api/v1/wallets', data)
  return res.data
}

export async function updateWallet(id: string, data: UpdateWalletRequest): Promise<Wallet> {
  const res = await apiClient.patch<Wallet>(`/api/v1/wallets/${id}`, data)
  return res.data
}

export async function deleteWallet(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/wallets/${id}`)
}
