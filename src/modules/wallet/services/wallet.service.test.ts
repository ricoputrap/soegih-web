import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '../../../shared/lib/api-client'
import { getWallets, createWallet, updateWallet, deleteWallet } from './wallet.service'

vi.mock('../../../shared/lib/api-client', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() } }))

const mockWallet = { id: '1', user_id: 'u1', name: 'Cash', balance: '100', type: 'cash' as const }

beforeEach(() => vi.clearAllMocks())

describe('getWallets', () => {
  it('calls GET /api/v1/wallets', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: [mockWallet] })
    const result = await getWallets()
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/wallets')
    expect(result).toEqual([mockWallet])
  })
})

describe('createWallet', () => {
  it('calls POST /api/v1/wallets', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockWallet })
    await createWallet({ name: 'Cash', type: 'cash', balance: 0 })
    expect(apiClient.post).toHaveBeenCalledWith('/api/v1/wallets', { name: 'Cash', type: 'cash', balance: 0 })
  })
})

describe('updateWallet', () => {
  it('calls PATCH /api/v1/wallets/:id', async () => {
    vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: mockWallet })
    await updateWallet('1', { name: 'Bank' })
    expect(apiClient.patch).toHaveBeenCalledWith('/api/v1/wallets/1', { name: 'Bank' })
  })
})

describe('deleteWallet', () => {
  it('calls DELETE /api/v1/wallets/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
    await deleteWallet('1')
    expect(apiClient.delete).toHaveBeenCalledWith('/api/v1/wallets/1')
  })
})
