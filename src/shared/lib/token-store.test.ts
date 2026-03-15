import { describe, it, expect } from 'vitest'
import { getToken, setToken, clearToken } from './token-store'

describe('token-store', () => {
  it('stores and retrieves token', () => {
    setToken('abc123')
    expect(getToken()).toBe('abc123')
  })

  it('clears token', () => {
    setToken('abc123')
    clearToken()
    expect(getToken()).toBeNull()
  })
})
