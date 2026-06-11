import { LayoutDashboard, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Projects", icon: LayoutDashboard },
  { to: "/projects/create", label: "Add repo", icon: PlusCircle },
];

function NavLink({ to, label, icon: Icon }) {
  const { pathname } = useLocation();
  const isActive =
    to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm transition ${
        isActive
          ? "bg-[var(--bg-muted)] font-medium text-[var(--accent-primary)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-52 shrink-0 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-secondary)] p-5 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[10px] text-xs font-semibold text-[var(--text-white)]"
          style={{ background: "var(--accent-primary)" }}
        >
          D
        </div>
        <span className="font-semibold tracking-tight">Deployify</span>
      </Link>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </nav>
    </aside>
  );
}
