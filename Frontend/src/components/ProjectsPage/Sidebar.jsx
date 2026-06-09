import { LayoutDashboard, PlusCircle, Rocket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects/create", label: "Create Project", icon: PlusCircle },
];

function NavLink({ to, label, icon: Icon }) {
  const { pathname } = useLocation();
  const isActive =
    to === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        isActive
          ? "border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--accent-light)] shadow-[var(--shadow-primary)]"
          : "text-[var(--text-secondary)] hover:border hover:border-[var(--border-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
      }`}
    >
      <Icon size={18} className={isActive ? "text-[var(--accent-primary)]" : ""} />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-secondary)]/60 p-6 backdrop-blur-2xl lg:flex">
      <Link to="/" className="mb-10 flex items-center gap-3">
        <div
          style={{ background: "var(--gradient-primary)" }}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-[var(--text-white)]"
        >
          D
        </div>
        <div className="leading-tight">
          <h1 className="text-lg font-semibold tracking-wide">Deployify</h1>
          <p className="text-xs text-[var(--text-secondary)]">Deployment Platform</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </nav>

      <div className="mt-auto rounded-[28px] border border-[var(--border-accent)] bg-[var(--bg-card)] p-5 backdrop-blur-xl">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--glow-primary)] text-[var(--accent-primary)]">
          <Rocket size={20} />
        </div>
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          Ready to ship?
        </p>
        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
          Connect GitHub and deploy in seconds with Docker and CI/CD.
        </p>
        <Link
          to="/projects/create"
          style={{ background: "var(--gradient-primary)" }}
          className="mt-4 block rounded-2xl px-4 py-2.5 text-center text-sm font-semibold text-[var(--text-white)] transition hover:scale-[1.02]"
        >
          New Deployment
        </Link>
      </div>
    </aside>
  );
}


