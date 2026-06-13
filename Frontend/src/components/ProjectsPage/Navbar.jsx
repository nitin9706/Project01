import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PlusCircle } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { useLogout } from "../../Api/queryHooks.js";
import { useAuth } from "../../context/useAuthHook.jsx";
import ProfileAvatar from "../common/ProfileAvatar";

const navItems = [
  { to: "/dashboard", label: "Projects", icon: LayoutDashboard },
  { to: "/projects/create", label: "Add repo", icon: PlusCircle },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutMutation.mutateAsync();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      logout();
      navigate("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-primary)] bg-[var(--bg-navbar)] px-4 py-3 backdrop-blur-md lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-[var(--text-white)]"
              style={{ background: "var(--accent-primary)" }}
            >
              D
            </div>
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="hidden items-center gap-2 lg:flex lg:ml-auto">
          <ThemeToggle className="!h-9 !w-9 !rounded-lg" />
          <div className="relative">
            <button
              type="button"
              onClick={() => setAvatarOpen((p) => !p)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-primary)] px-2 py-1 text-sm text-[var(--text-secondary)]"
            >
              <ProfileAvatar name={user?.name || user?.email} size={32} />
            </button>

            {avatarOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
                >
                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] p-3 lg:hidden">
          <nav className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to || pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                    isActive
                      ? "bg-[var(--bg-muted)] font-medium text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-[var(--border-primary)] pt-3">
            <ThemeToggle className="!h-9 !w-9 !rounded-lg" />
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 rounded-lg border border-[var(--border-primary)] py-2 text-sm text-[var(--text-secondary)]"
            >
              {loggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
