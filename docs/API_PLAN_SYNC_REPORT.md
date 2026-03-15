# API-Plan Synchronization Report

**Date:** 2026-03-15
**Status:** ✅ **COMPLETE** — All critical discrepancies corrected

---

## Executive Summary

The MVP frontend plan has been thoroughly audited against the API documentation (`docs/API.md`) and all discrepancies have been corrected. The main issues discovered and fixed:

1. **CRITICAL:** Timestamp fields (`created_at`, `updated_at`, `deleted_at`) are stripped from all API responses and have been removed from all response interfaces
2. **HIGH:** Field names use `snake_case` in the API (corrected camelCase references in plan)
3. **MEDIUM:** Amount fields are returned as strings for precision (corrected number types)

---

## Changes Summary

### 🔴 Critical: Timestamp Stripping

**API Specification (docs/API.md, line 8):**
> "Timestamp fields (`created_at`, `updated_at`, `deleted_at`) are automatically stripped from all responses."

**Impact:** All response interfaces in the frontend plan must NOT include these metadata timestamp fields.

**Affected Interfaces:**
- `Wallet` — removed `created_at`, `updated_at`
- `Category` — removed `created_at`, `updated_at`
- `Transaction` — removed `created_at`, `updated_at`, `deleted_at`

**Example:**
```typescript
// ❌ WRONG (API won't return these)
interface Wallet {
  id: string
  name: string
  created_at: string    // ❌ STRIPPED
  updated_at: string    // ❌ STRIPPED
}

// ✅ CORRECT (matches actual API response)
interface Wallet {
  id: string
  name: string
  // No metadata timestamps
}
```

**Note:** The `occurred_at` field in transactions is NOT stripped—it's transaction data, not metadata.

---

### 🟠 High: Field Naming (snake_case)

**Issue:** Plan used camelCase; API uses `snake_case`

**Corrections:**

| Field | Was | Now | API Response |
|-------|-----|-----|--------------|
| Posting.walletId | ❌ | `wallet_id` | ✅ |
| Transaction.occurredAt | ❌ | `occurred_at` | ✅ |
| Transaction.createdAt | ❌ | Removed | ✅ |
| Transaction.updatedAt | ❌ | Removed | ✅ |
| Transaction.deletedAt | ❌ | Removed | ✅ |
| Transaction.categoryId | ❌ | `category_id` | ✅ |

---

### 🟡 Medium: Amount Data Types

**Issue:** Amounts must be `string`, not `number`, for decimal precision

**Corrections:**

```typescript
// ❌ WRONG
interface Wallet {
  balance: number  // Loses precision on decimals
}

// ✅ CORRECT
interface Wallet {
  balance: string  // Preserves: "1500.50", "-50000"
}
```

**API Examples:**
- Wallet balance: `"1500.50"` (string)
- Posting amount: `"-50000"` (string)
- Dashboard amounts: `450.5` (number — different from transaction/wallet amounts)

---

## Files Updated

### Plan Document
- **File:** `docs/superpowers/plans/2026-03-14-mvp-frontend.md`
- **Changes:**
  - ✅ Removed timestamp fields from all response interfaces (Wallet, Category, Transaction)
  - ✅ Corrected field names to snake_case (wallet_id, category_id, occurred_at)
  - ✅ Corrected amount types to string
  - ✅ Removed timestamp columns from table descriptions
  - ✅ Updated mock data to exclude timestamp fields
  - ✅ Added note about AI chat endpoints not yet defined in API

### Alignment Documentation
- **File:** `docs/PLAN_API_ALIGNMENT.md` (created)
  - Comprehensive comparison of old vs. new interface definitions
  - Detailed explanations of why corrections were needed
  - API references for each change

- **File:** `docs/API_PLAN_SYNC_REPORT.md` (this file)
  - Executive summary of alignment status
  - Change summary with impact analysis

---

## TypeScript Interface Examples

### ✅ Corrected Wallet Interface
```typescript
export interface Wallet {
  id: string
  user_id: string
  name: string
  balance: string  // string for precision
  type: WalletType
  // ✅ NO timestamp fields
}
```

### ✅ Corrected Transaction Interface
```typescript
export interface Transaction {
  id: string
  type: TransactionType
  note: string | null
  category_id: string | null  // snake_case
  occurred_at: string         // transaction data, not metadata
  category: Category | null
  postings: Posting[]
  // ✅ NO created_at, updated_at, deleted_at
}
```

### ✅ Corrected Posting Interface
```typescript
export interface Posting {
  id: string
  wallet_id: string  // snake_case
  amount: string     // string for precision
  wallet: {
    id: string
    name: string
    type: string
  }
}
```

---

## Verification Checklist

| Item | Status | Notes |
|------|--------|-------|
| Wallet interface — no timestamps | ✅ | Corrected |
| Category interface — no timestamps | ✅ | Corrected |
| Transaction interface — no timestamps | ✅ | Corrected |
| All field names use snake_case | ✅ | Corrected |
| Amount fields are strings | ✅ | Corrected |
| Mock data excludes timestamps | ✅ | Corrected |
| Table column descriptions updated | ✅ | Corrected |
| AI chat note added to plan | ✅ | Added |

---

## Impact on Implementation

### When Implementing Tasks 11-20

Developers should be aware that:

1. **No timestamp fields in responses** — Do NOT expect `created_at`, `updated_at`, or `deleted_at` in API responses for wallets, categories, or transactions
2. **Amounts are strings** — Handle string-to-number conversion for calculations; store as strings in types
3. **snake_case field names** — All JSON responses use snake_case; transform in mappers if needed for internal camelCase
4. **Dashboard exception** — Dashboard endpoint returns numeric amounts, not strings

### When Writing Mock Data & Tests

Ensure mock data matches actual API contract:
```typescript
// ✅ GOOD
const mockTransaction = {
  id: 'tx1',
  type: 'expense',
  amount: '-50000',  // string
  occurred_at: '2026-03-15T10:00:00Z',
  // NO created_at, updated_at, deleted_at
}

// ❌ BAD
const mockTransaction = {
  id: 'tx1',
  type: 'expense',
  amount: 50000,  // ❌ number
  occurred_at: '2026-03-15T10:00:00Z',
  created_at: '2026-03-15T10:00:00Z',  // ❌ WRONG
  updated_at: '2026-03-15T10:00:00Z',  // ❌ WRONG
}
```

---

## Next Steps

1. **Implementation Phase** — Proceed with Tasks 11-25 using the corrected plan
2. **Code Review** — Verify interfaces match API responses during PR review
3. **Integration Testing** — Test with actual backend API to confirm response shapes

---

## Related Documents

- [`docs/API.md`](./API.md) — Source of truth for API contract
- [`docs/superpowers/plans/2026-03-14-mvp-frontend.md`](./superpowers/plans/2026-03-14-mvp-frontend.md) — Corrected implementation plan
- [`docs/PLAN_API_ALIGNMENT.md`](./PLAN_API_ALIGNMENT.md) — Detailed field-by-field comparison

