import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement, type ReactNode } from 'react'
import { useWallets } from './use-wallets'
import * as walletService from '../services/wallet.service'

vi.mock('../services/wallet.service')

function wrapper({ children }: { children: ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return createElement(QueryClientProvider, { client: qc }, children)
}

describe('useWallets', () => {
  it('returns wallet list from service', async () => {
    const mockWallets = [{ id: '1', name: 'Cash', type: 'cash' as const, balance: '100', user_id: 'u1' }]
    vi.mocked(walletService.getWallets).mockResolvedValueOnce(mockWallets)
    const { result } = renderHook(() => useWallets(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockWallets)
  })
})
