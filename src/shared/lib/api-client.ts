import axios, { type AxiosError } from 'axios'
import { clearToken } from './token-store'

const AUTH_EXCLUDED_PATHS = [
  '/api/v1/auth/login',
  '/api/v1/auth/signup',
  '/api/v1/auth/logout',
]

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url ?? ''
      const isExcluded = AUTH_EXCLUDED_PATHS.some((path) => requestUrl.includes(path))

      if (!isExcluded) {
        clearToken()
        clearAuthToken()
        window.location.replace('/login')
      }
    }
    return Promise.reject(error)
  },
)

export function setAuthToken(token: string): void {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearAuthToken(): void {
  delete apiClient.defaults.headers.common['Authorization']
}
