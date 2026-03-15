import { apiClient } from '../../../shared/lib/api-client'
import type { AuthResponse, LoginRequest, SignupRequest } from '../types/auth.types'

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/api/v1/auth/login', data)
  return res.data
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/api/v1/auth/signup', data)
  return res.data
}

export async function logout(): Promise<void> {
  await apiClient.post('/api/v1/auth/logout')
}
