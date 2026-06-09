import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PlusCircle } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { logoutUser } from "../../Api/dataGet.js";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects/create", label: "Create Project", icon: PlusCircle },
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
    <header className="sticky top-0 z-40 border-b border-[var(--border-primary)] bg-[var(--bg-navbar)]/80 px-4 py-4 backdrop-blur-2xl lg:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div
              style={{ background: "var(--gradient-primary)" }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-[var(--text-white)]"
            >
              D
            </div>
            <span className="hidden text-lg font-semibold tracking-wide text-[var(--text-primary)] sm:block">
              Deployify
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <p className="hidden text-sm text-[var(--text-secondary)] lg:block">
          Manage deployments, logs, and project settings
        </p>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-xl transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:hidden mt-4`}>
        <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-secondary)]/95 p-4 shadow-[var(--shadow-primary)] backdrop-blur-xl">
          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to || pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--accent-light)]"
                      : "text-[var(--text-secondary)] hover:border hover:border-[var(--border-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-[var(--accent-primary)]" : ""}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border-primary)] pt-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
