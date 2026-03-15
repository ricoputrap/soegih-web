# Changelog

## [Unreleased]

### Added

- Project scaffolding: React 19 + Vite + TypeScript
- ESLint configuration with React Compiler enabled
- Project documentation: `project_spec.md`, `brainstorm.md`, `ARCHITECTURE.md`, `CLAUDE.md`
- TanStack Router file-based routing scaffold with auth layout guard
- Axios API client with JWT token management via Authorization header
- Sentry error tracking and replay capture initialization
- **Chunk 4: Wallet Module (Complete)** ✅
  - Wallet types and CRUD service (getWallets, createWallet, updateWallet, deleteWallet)
  - TanStack Query hooks (useWallets, useCreateWallet, useUpdateWallet, useDeleteWallet)
  - WalletForm component: modal form with React Hook Form + Zod validation
  - WalletTable component: TanStack Table with client-side sort/filter/pagination
  - WalletCard component: mobile-responsive card layout
  - WalletPage: full CRUD page with responsive desktop/mobile views
  - Delete confirmation modal with visual feedback
