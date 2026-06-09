import { ExternalLink, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDeployment } from "../../Api/dataGet.js";

const statusStyles = {
  Running:
    "border-[var(--border-accent)] bg-[var(--glow-primary)] text-[var(--text-success)]",
  Building:
    "border-[var(--border-accent)] bg-[var(--glow-primary)] text-[var(--accent-light)]",
  Queued:
    "border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-muted)]",
  Stopped:
    "border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-muted)]",
};

export default function ProjectCard({ project }) {
  const statusClass = statusStyles[project.status] ?? statusStyles.Stopped;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 backdrop-blur-xl transition hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-primary)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-light)]">
            {project.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
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

      <div className="flex items-center justify-between border-t border-[var(--border-primary)] pt-4 text-sm">
        <span className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-1 text-[var(--text-secondary)]">
          {project.framework}
        </span>
        <span className="flex items-center gap-1 text-[var(--text-muted)]">
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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const response = getAllDeployment();
    if (Array.isArray(response)) {
      setProjects(response);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
