import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PlusCircle } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { logoutUser } from "../../Api/dataGet.js";

const navItems = [
  { to: "/dashboard", label: "Projects", icon: LayoutDashboard },
  { to: "/projects/create", label: "Add repo", icon: PlusCircle },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
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
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-[var(--border-primary)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
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
