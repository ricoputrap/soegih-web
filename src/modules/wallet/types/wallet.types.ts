export type WalletType = 'cash' | 'bank' | 'e_wallet' | 'other'

export interface Wallet {
  id: string
  user_id: string
  name: string
  balance: string  // API returns as string for precision
  type: WalletType
}

export interface CreateWalletRequest {
  name: string
  type: WalletType
  balance: number
}

export interface UpdateWalletRequest {
  name?: string
  type?: WalletType
  balance?: number
}
