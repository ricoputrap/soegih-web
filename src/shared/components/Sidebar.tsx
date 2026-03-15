import { Link, useLocation } from '@tanstack/react-router'
import { useAuthContext } from '../context/auth-context'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '📊' },
  { label: 'Wallets', to: '/wallets', icon: '👝' },
  { label: 'Categories', to: '/categories', icon: '🏷️' },
  { label: 'Transactions', to: '/transactions', icon: '💸' },
  { label: 'AI Chat', to: '/ai', icon: '🤖' },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const location = useLocation()
  const { user, clearAuth } = useAuthContext()

  const isActive = (to: string) => {
    return location.pathname === to || location.pathname.startsWith(to.split('/')[1])
  }

  const handleLogout = async () => {
    clearAuth()
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-2xl transition-transform duration-300 z-50 lg:relative lg:translate-x-0 lg:shadow-sm ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">Soegih</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg w-5">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-2">
            <div className="text-xs text-slate-400 mb-1">Signed in as</div>
            <div className="text-sm font-medium text-white truncate">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="logout-button"
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-red-400 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
