import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { useState } from 'react'
import type { Wallet } from '../types/wallet.types'

const walletTypeStyles: Record<string, { bg: string; text: string }> = {
  cash: { bg: 'bg-blue-900/40', text: 'text-blue-300' },
  bank: { bg: 'bg-teal-900/40', text: 'text-teal-300' },
  e_wallet: { bg: 'bg-purple-900/40', text: 'text-purple-300' },
  other: { bg: 'bg-slate-700/40', text: 'text-slate-300' },
}

const walletTypeLabels: Record<string, string> = {
  cash: 'Cash',
  bank: 'Bank',
  e_wallet: 'E-Wallet',
  other: 'Other',
}

interface WalletTableProps {
  wallets: Wallet[]
  isLoading?: boolean
  onEdit: (wallet: Wallet) => void
  onDelete: (wallet: Wallet) => void
}

export function WalletTable({ wallets, isLoading = false, onEdit, onDelete }: WalletTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const columnHelper = createColumnHelper<Wallet>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Wallet Name',
      cell: (info) => <span className="font-medium text-white">{info.getValue()}</span>,
      sortingFn: 'text',
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => {
        const type = info.getValue()
        const style = walletTypeStyles[type] || walletTypeStyles.other
        return (
          <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${style.bg} ${style.text}`}>
            {walletTypeLabels[type]}
          </span>
        )
      },
      sortingFn: 'text',
    }),
    columnHelper.accessor('balance', {
      header: 'Balance',
      cell: (info) => (
        <span className="font-mono text-amber-400">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
            parseFloat(info.getValue()),
          )}
        </span>
      ),
      sortingFn: (a, b) => parseFloat(a.original.balance) - parseFloat(b.original.balance),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(info.row.original)}
            data-testid="wallet-edit"
            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(info.row.original)}
            data-testid="wallet-delete"
            className="px-3 py-1 text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: wallets,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      return row.original.name.toLowerCase().includes(filterValue.toLowerCase())
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-slate-700 border-t-amber-500 rounded-full" />
      </div>
    )
  }

  if (wallets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No wallets yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search wallets by name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-700 rounded-lg">
        <table data-testid="wallet-table" className="w-full text-sm">
          <thead className="bg-slate-800/50 border-b border-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-slate-300 cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-xs text-slate-500">
                          {header.column.getIsSorted() === 'asc' && '↑'}
                          {header.column.getIsSorted() === 'desc' && '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-testid="wallet-row" className="hover:bg-slate-800/30 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-slate-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-slate-400">
          Page <span className="font-semibold text-white">{table.getState().pagination.pageIndex + 1}</span> of{' '}
          <span className="font-semibold text-white">{table.getPageCount()}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
