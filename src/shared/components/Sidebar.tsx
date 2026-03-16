import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../context/auth-context";
import { logout } from "../../modules/auth/services/auth.service";

const mainMenuItems = [
  { label: "Dashboard", to: "/dashboard", icon: "📊" },
  { label: "Wallets", to: "/wallets", icon: "👝" },
  { label: "Categories", to: "/categories", icon: "🏷️" },
  { label: "Transactions", to: "/transactions", icon: "💸" },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ open = true, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthContext();

  const isActive = (to: string) => {
    return (
      location.pathname === to || location.pathname.startsWith(to.split("/")[1])
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore — clear locally regardless
    } finally {
      clearAuth();
      navigate({ to: "/login" });
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`flex flex-col fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-sm transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center font-bold text-sm text-white shadow-md">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Soegih
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {mainMenuItems.map((item) => {
              const active = isActive(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-teal-50 text-teal-700 font-medium border border-teal-200/60"
                        : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-lg w-5">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-200/80 p-4 bg-slate-50/50 space-y-3">
          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            data-testid="logout-button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-red-600 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign Out</span>
          </button>

          {/* User Email */}
          <div className="px-3 py-2 text-center border-t border-slate-200/60">
            <div className="text-xs text-slate-500 font-medium">
              {user?.email}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
