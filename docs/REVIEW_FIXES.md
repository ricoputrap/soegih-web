# Plan Review Fixes - API Alignment

**Date:** 2026-03-15
**Scope:** Auth, Wallet, Category, Transaction modules
**Status:** All discrepancies fixed in `docs/superpowers/plans/2026-03-14-mvp-frontend.md`

---

## Issues Found & Fixed

### 1. **CRITICAL: Transaction CreateRequest Format Mismatch**

**Problem:**
The plan used a generic `postings` array for all transaction types:
```typescript
postings: Array<{ wallet_id: string; amount: number }>
```

But the API docs require different formats:
- **Expense/Income:** flat `wallet_id`, `amount`, `category_id` fields
- **Transfer:** `from_wallet_id`, `to_wallet_id`, no category

**Fix:**
Changed to discriminated union matching API exactly:
```typescript
export interface CreateTransactionRequestExpense {
  type: 'expense' | 'income'
  amount: number
  occurred_at: string
  wallet_id: string
  category_id: string
  note?: string
}

export interface CreateTransactionRequestTransfer {
  type: 'transfer'
  amount: number
  occurred_at: string
  from_wallet_id: string
  to_wallet_id: string
  note?: string
}

export type CreateTransactionRequest = CreateTransactionRequestExpense | CreateTransactionRequestTransfer
```

---

### 2. **CRITICAL: Transaction Response Shape (CamelCase Fields)**

**Problem:**
The plan's Transaction interface used snake_case:
```typescript
category_id: string | null
occurred_at: string
created_at: string
updated_at: string
```

But API response uses camelCase and includes related objects:
```json
{
  "categoryId": "...",
  "occurredAt": "2026-03-15T...",
  "createdAt": "2026-03-15T...",
  "updatedAt": "2026-03-15T...",
  "deletedAt": null,
  "category": { "id": "...", "name": "...", "type": "..." },
  "postings": [...]
}
```

**Fix:**
Updated Transaction interface to match API response:
```typescript
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  categoryId: string | null
  occurredAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  category: Category | null
  postings: Posting[]
}
```

Updated Posting to include wallet details:
```typescript
export interface Posting {
  id: string
  walletId: string
  amount: number
  wallet: {
    id: string
    name: string
    type: WalletType
  }
}
```

---

### 3. **Transaction Service Test Updates**

Updated test payloads to match API format:
- Removed `postings` array usage
- Changed to expense format: `{ type: 'expense', amount, wallet_id, category_id, occurred_at, note }`
- Added transfer format test: `{ type: 'transfer', amount, from_wallet_id, to_wallet_id, occurred_at }`

---

### 4. **Transaction Form Zod Schema Update**

Updated to match corrected request format:
```typescript
const transactionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('expense'),
    amount: z.number().positive('Amount must be positive'),
    occurred_at: z.string(),
    wallet_id: z.string().min(1, 'Wallet is required'),
    category_id: z.string().min(1, 'Category is required'),
    note: z.string().optional(),
  }),
  z.object({
    type: z.literal('income'),
    amount: z.number().positive('Amount must be positive'),
    occurred_at: z.string(),
    wallet_id: z.string().min(1, 'Wallet is required'),
    category_id: z.string().min(1, 'Category is required'),
    note: z.string().optional(),
  }),
  z.object({
    type: z.literal('transfer'),
    amount: z.number().positive('Amount must be positive'),
    occurred_at: z.string(),
    from_wallet_id: z.string().min(1, 'Source wallet is required'),
    to_wallet_id: z.string().min(1, 'Destination wallet is required'),
    note: z.string().optional(),
  }),
])
```

---

### 5. **AI Chat Service Test Updates**

Updated confirmTransaction test to use corrected format:
```typescript
const payload = {
  parsed_transaction: {
    type: 'expense',
    amount: 50000,
    occurred_at: '2026-01-01',
    wallet_id: 'w1',
    category_id: 'c1'
  }
}
```

---

## Auth, Wallet, Category - No Changes Needed

✅ Auth types and endpoints match API
✅ Wallet types (`'cash' | 'bank' | 'e_wallet' | 'other'`) match API
✅ Category types (`'expense' | 'income'`) match API
✅ API endpoints and request/response formats align

---

## Files Modified

- `docs/superpowers/plans/2026-03-14-mvp-frontend.md` — 6 edits

## Next Steps

When implementing frontend code, use the corrected types and ensure:
1. Form submission transforms user input to the discriminated union format
2. API responses are properly typed with camelCase field names
3. Component display logic handles the correct response shapes
4. AI chat integration uses the corrected CreateTransactionRequest types
