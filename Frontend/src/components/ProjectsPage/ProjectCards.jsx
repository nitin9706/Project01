import { ExternalLink, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "1",
    name: "portfolio-app",
    repo: "github.com/user/portfolio-app",
    framework: "React",
    status: "Running",
    updated: "2 mins ago",
  },
  {
    id: "2",
    name: "api-gateway",
    repo: "github.com/user/api-gateway",
    framework: "Node.js",
    status: "Building",
    updated: "12 mins ago",
  },
  {
    id: "3",
    name: "marketing-site",
    repo: "github.com/user/marketing-site",
    framework: "Next.js",
    status: "Stopped",
    updated: "1 day ago",
  },
];

const statusStyles = {
  Running: "border-(--border-accent) bg-(--glow-primary) text-(--text-success)",
  Building: "border-(--border-accent) bg-(--glow-primary) text-(--accent-light)",
  Stopped: "border-(--border-primary) bg-(--bg-card) text-(--text-muted)",
};

export default function ProjectCard({ project = projects[0] }) {
  const statusClass =
    statusStyles[project.status] ?? statusStyles.Stopped;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-[28px] border border-(--border-primary) bg-(--bg-card) p-6 backdrop-blur-xl transition hover:border-(--border-accent) hover:shadow-(--shadow-primary)"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-(--text-primary) transition group-hover:text-(--accent-light)">
            {project.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-(--text-secondary)">
            <GitBranch size={14} />
            {project.repo}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-(--border-primary) pt-4 text-sm">
        <span className="rounded-xl border border-(--border-primary) bg-(--bg-secondary) px-3 py-1 text-(--text-secondary)">
          {project.framework}
        </span>
        <span className="flex items-center gap-1 text-(--text-muted)">
          {project.updated}
          <ExternalLink
            size={14}
            className="opacity-0 transition group-hover:opacity-100"
          />
        </span>
      </div>
    </Link>
  );
}

export function ProjectCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
