import { describe, it, expect, vi } from 'vitest'
import { apiClient } from '../../../shared/lib/api-client'
import { getMe } from './me.service'

vi.mock('../../../shared/lib/api-client', () => ({ apiClient: { get: vi.fn() } }))

describe('getMe', () => {
  it('calls GET /api/v1/auth/me', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { id: '1', email: 'a@b.com' } })
    const result = await getMe()
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/auth/me')
    expect(result.id).toBe('1')
  })
})
