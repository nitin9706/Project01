import { Activity, Clock, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { ProjectCardGrid } from "./ProjectCards";

const stats = [
  {
    label: "Total Projects",
    value: "3",
    icon: FolderKanban,
    accent: "text-[var(--accent-primary)]",
  },
  {
    label: "Active Deployments",
    value: "2",
    icon: Activity,
    accent: "text-[var(--text-success)]",
  },
  {
    label: "Avg Deploy Time",
    value: "5s",
    icon: Clock,
    accent: "text-[var(--accent-light)]",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--accent-light)] backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
            Project workspace
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Dashboard
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Manage and deploy your connected repositories
          </p>
        </div>

        <Link
          to="/projects/create"
          style={{ background: "var(--gradient-primary)" }}
          className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-[var(--text-white)] shadow-[var(--shadow-primary)] transition hover:scale-[1.03]"
        >
          New Project
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
              <Icon size={22} className={accent} />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Your Projects
        </h2>
        <p className="text-sm text-[var(--text-muted)]">3 repositories connected</p>
      </div>

      <ProjectCardGrid />
    </DashboardLayout>
  );
}


