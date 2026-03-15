# Plan vs API Documentation Alignment

**Last Updated:** 2026-03-15

## Summary

The MVP frontend plan (`docs/superpowers/plans/2026-03-14-mvp-frontend.md`) has been reviewed against the API documentation (`docs/API.md`) and corrected to ensure accurate API contract definitions.

## ⚠️ CRITICAL: Timestamp Stripping

**Per API docs (line 8):** "Timestamp fields (`created_at`, `updated_at`, `deleted_at`) are automatically stripped from all responses."

This means **NO** response object should include these timestamp fields in the frontend types.

---

## Changes Made

### 1. Removed Timestamp Fields (CRITICAL)

**Issue:** The plan initially included `created_at`, `updated_at`, `deleted_at` in response interfaces, but the API strips these fields from all responses.

**Corrections:**

#### Wallet Interface
```typescript
// BEFORE
export interface Wallet {
  id: string
  user_id: string
  name: string
  balance: number
  type: WalletType
  created_at: string    // ❌ stripped by API
  updated_at: string    // ❌ stripped by API
}

// AFTER
export interface Wallet {
  id: string
  user_id: string
  name: string
  balance: string       // ✅ matches API response
  type: WalletType
  // ✅ No timestamp fields
}
```

#### Category Interface
```typescript
// BEFORE
export interface Category {
  id: string
  user_id: string
  name: string
  description: string | null
  type: CategoryType
  created_at: string    // ❌ stripped by API
  updated_at: string    // ❌ stripped by API
}

// AFTER
export interface Category {
  id: string
  user_id: string
  name: string
  description: string | null
  type: CategoryType
  // ✅ No timestamp fields
}
```

#### Transaction Interface
```typescript
// BEFORE
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  category_id: string | null
  occurred_at: string
  created_at: string           // ❌ stripped by API
  updated_at: string           // ❌ stripped by API
  deleted_at: string | null    // ❌ stripped by API
  category: Category | null
  postings: Posting[]
}

// AFTER
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  category_id: string | null
  occurred_at: string          // ✅ This is NOT a timestamp field; it's transaction data
  category: Category | null
  postings: Posting[]
  // ✅ No created_at, updated_at, deleted_at
}
```

---

### 2. Transaction Types - Field Name Corrections

**Issue:** The plan used camelCase field names (e.g., `walletId`, `occurredAt`) while the API uses `snake_case`.

**Corrections:**

#### Posting Interface
```typescript
// BEFORE
export interface Posting {
  id: string
  walletId: string          // ❌ camelCase
  amount: number            // ❌ should be string
  wallet: {
    id: string
    name: string
    type: WalletType        // ❌ WalletType not imported
  }
}

// AFTER
export interface Posting {
  id: string
  wallet_id: string         // ✅ matches API: "wallet_id"
  amount: string            // ✅ API returns as string for precision (e.g., "-50000")
  wallet: {
    id: string
    name: string
    type: string            // ✅ API returns type as string
  }
}
```

#### Transaction Interface
```typescript
// BEFORE
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  categoryId: string | null         // ❌ camelCase
  occurredAt: string                // ❌ camelCase
  createdAt: string                 // ❌ camelCase
  updatedAt: string                 // ❌ camelCase
  deletedAt: string | null          // ❌ camelCase
  category: Category | null
  postings: Posting[]
}

// AFTER
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  category_id: string | null        // ✅ matches API: "category_id"
  occurred_at: string               // ✅ matches API: "occurred_at"
  created_at: string                // ✅ matches API: "created_at"
  updated_at: string                // ✅ matches API: "updated_at"
  deleted_at: string | null         // ✅ matches API: "deleted_at"
  category: Category | null
  postings: Posting[]
}
```

#### Category Interface (nested in Transaction)
```typescript
// BEFORE
export interface Category {
  id: string
  name: string
  type: CategoryType  // ❌ unclear type definition
}

// AFTER
export interface Category {
  id: string
  name: string
  type: 'expense' | 'income'  // ✅ explicit enum
}
```

---

## API Field Reference

The corrections align with the actual API response structure from `docs/API.md` GET `/transactions` response:

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "expense",
      "note": "Coffee",
      "category_id": "...",
      "occurred_at": "2026-03-15T10:00:00.000Z",
      "created_at": "2026-03-15T10:00:00.000Z",
      "updated_at": "2026-03-15T10:00:00.000Z",
      "deleted_at": null,
      "category": { "id": "...", "name": "Food", "type": "expense" },
      "postings": [
        {
          "id": "...",
          "wallet_id": "...",
          "amount": "-50000",
          "wallet": { "id": "...", "name": "Cash", "type": "cash" }
        }
      ]
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "total_pages": 3
  }
}
```

---

## Important Notes

### Timestamp Fields — Difference Between API Metadata vs Transaction Data

The API strips **metadata timestamp fields** (`created_at`, `updated_at`, `deleted_at`) but **preserves transaction data timestamps** like `occurred_at`. These are semantically different:

| Field | Category | Stripped | Purpose |
|-------|----------|----------|---------|
| `created_at` | **Metadata** | ✅ Yes | When record was created in the system |
| `updated_at` | **Metadata** | ✅ Yes | When record was last modified |
| `deleted_at` | **Metadata** | ✅ Yes | When record was soft-deleted |
| `occurred_at` | **Transaction Data** | ❌ No | When the transaction actually occurred (user-defined) |

Frontend code must NOT expect metadata timestamps in any response object.

### AI Chat Endpoints
The plan references AI chat endpoints (`POST /api/v1/ai/chat`, `POST /api/v1/ai/chat/confirm`) that are **not yet defined in `docs/API.md`**. A note has been added to **Task 21** in the plan to clarify that these endpoints must be implemented by the backend before the frontend AI module can be completed.

### Data Type: Amounts as Strings
The API returns amounts as **string values** (e.g., `"-50000"`, `"1500.50"`) rather than numbers. This is intentional for precision (prevents floating-point rounding errors). Frontend code must handle string-to-number conversion when needed for calculations.

### Field Naming Convention
The API consistently uses `snake_case` for all JSON field names. Frontend TypeScript interfaces must match this convention exactly to avoid runtime errors during API integration.

---

## Verification Checklist

- ✅ Transaction response fields use `snake_case`
- ✅ Posting interface fields use `snake_case`
- ✅ Amount fields are defined as `string` type
- ✅ Category type is explicitly `'expense' | 'income'`
- ✅ Nested wallet object structure matches API response
- ✅ AI chat endpoints flagged as not yet defined in API docs

---

## Related Files

- **Frontend Plan:** `docs/superpowers/plans/2026-03-14-mvp-frontend.md` (Task 16-17)
- **API Documentation:** `docs/API.md` (Transactions section, lines 571-707)
