import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

export function setAuthToken(token: string): void {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearAuthToken(): void {
  delete apiClient.defaults.headers.common['Authorization']
}
