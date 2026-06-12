import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import ThemeToggle from "../common/ThemeToggle";
import ProfileAvatar from "../common/ProfileAvatar";
import { useAuth } from "../../context/useAuthHook";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow" },
  { label: "Platform", href: "#platform" },
  { label: "FAQ", href: "#faq" },
];

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const { user, loading, isAuthenticated } = useAuth();

  const closeNav = () => setNavOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-primary) bg-(--bg-navbar) backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: "var(--accent-primary)" }}
          >
            D
          </div>

          <span className="text-sm font-semibold">Deployify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-(--text-secondary) transition hover:text-(--text-primary)"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="h-9! w-9! rounded-lg!" />

          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-(--bg-muted)" />
          ) : isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              title={user?.name || user?.email}
            >
              <ProfileAvatar name={user?.name || user?.email} size={32} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-(--border-primary) px-4 py-2 text-sm text-(--text-secondary) transition hover:bg-white/10 hover:text-(--text-primary)"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-white sm:inline-flex"
                style={{ background: "var(--accent-primary)" }}
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setNavOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-primary) md:hidden"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <div className="border-t border-(--border-primary) px-6 py-4 md:hidden">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeNav}
              className="block py-2.5 text-sm text-(--text-secondary)"
            >
              {item.label}
            </a>
          ))}

          {!loading && !isAuthenticated && (
            <div className="mt-4 flex gap-2 border-t border-(--border-primary) pt-4">
              <Link
                to="/login"
                onClick={closeNav}
                className="flex-1 rounded-lg border border-(--border-primary) py-2 text-center text-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeNav}
                className="flex-1 rounded-lg py-2 text-center text-sm font-medium text-white"
                style={{ background: "var(--accent-primary)" }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
