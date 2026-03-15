import { apiClient } from '../../../shared/lib/api-client'
import type { AuthUser } from '../../../shared/context/auth-context'

export async function getMe(): Promise<AuthUser> {
  const res = await apiClient.get<AuthUser>('/api/v1/auth/me')
  return res.data
}
