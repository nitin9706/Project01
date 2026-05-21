import { Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--border-primary) bg-(--bg-navbar)/80 px-6 py-4 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 lg:hidden">
          <div
            style={{ background: "var(--gradient-primary)" }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-(--text-white)"
          >
            D
          </div>
          <span className="text-lg font-semibold tracking-wide">Deployify</span>
        </Link>

        <p className="hidden text-sm text-(--text-secondary) lg:block">
          Manage deployments, logs, and project settings
        </p>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-2xl border border-(--border-primary) bg-(--bg-card) px-5 py-2.5 text-sm font-medium text-(--text-secondary) backdrop-blur-xl transition hover:border-(--border-accent) hover:text-(--text-primary)"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
