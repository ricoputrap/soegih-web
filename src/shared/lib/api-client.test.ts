import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('api-client', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('attaches Authorization header when token is set', async () => {
    const { setAuthToken, apiClient } = await import('./api-client')
    setAuthToken('test-jwt-token')
    const config = apiClient.defaults.headers.common['Authorization']
    expect(config).toBe('Bearer test-jwt-token')
  })

  it('removes Authorization header when token is cleared', async () => {
    const { setAuthToken, clearAuthToken, apiClient } = await import('./api-client')
    setAuthToken('test-jwt-token')
    clearAuthToken()
    expect(apiClient.defaults.headers.common['Authorization']).toBeUndefined()
  })
})
