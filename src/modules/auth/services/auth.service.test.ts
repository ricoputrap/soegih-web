import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '../../../shared/lib/api-client'
import { login, signup, logout } from './auth.service'

vi.mock('../../../shared/lib/api-client', () => ({
  apiClient: { post: vi.fn() },
}))

const mockPost = vi.mocked(apiClient.post)

beforeEach(() => vi.clearAllMocks())

describe('login', () => {
  it('calls POST /api/v1/auth/login with credentials', async () => {
    mockPost.mockResolvedValueOnce({ data: { token: 'jwt', user: { id: '1', email: 'a@b.com' } } })
    const result = await login({ email: 'a@b.com', password: 'pass' })
    expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/login', { email: 'a@b.com', password: 'pass' })
    expect(result.token).toBe('jwt')
  })
})

describe('signup', () => {
  it('calls POST /api/v1/auth/signup with credentials', async () => {
    mockPost.mockResolvedValueOnce({ data: { token: 'jwt', user: { id: '1', email: 'a@b.com' } } })
    await signup({ email: 'a@b.com', password: 'pass' })
    expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/signup', { email: 'a@b.com', password: 'pass' })
  })
})

describe('logout', () => {
  it('calls POST /api/v1/auth/logout', async () => {
    mockPost.mockResolvedValueOnce({ data: {} })
    await logout()
    expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/logout')
  })
})
