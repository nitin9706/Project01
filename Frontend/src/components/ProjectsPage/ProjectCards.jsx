import { ExternalLink, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDeployment } from "../../Api/dataGet.js";

const statusStyles = {
  active:
    "border-[var(--border-accent)] bg-[var(--glow-primary)] text-[var(--text-success)]",
  inactive:
    "border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-muted)]",
  building:
    "border-[var(--border-accent)] bg-[var(--glow-primary)] text-[var(--accent-light)]",
  failed: "border-[var(--border-primary)] bg-[var(--bg-card)] text-red-500",
};

export default function ProjectCard({ project }) {
  const statusClass =
    statusStyles[project.status?.toLowerCase()] ?? statusStyles.inactive;

  return (
    <Link
      to={`/projects/${project._id}`}
      className="group rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 backdrop-blur-xl transition hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-primary)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-light)]">
            {project.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
            <GitBranch size={14} />
            {project.RepoInfo?.branch || "main"}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}
        >
          {project.status || "inactive"}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border-primary)] pt-4 text-sm">
        <span className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-1 text-[var(--text-secondary)]">
          {project.BuildConfig?.framework || "Unknown"}
        </span>
        <span className="flex items-center gap-1 text-[var(--text-muted)]">
          {new Date(project.updatedAt).toLocaleDateString()}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllDeployment();
        if (response.success && Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          setProjects([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 animate-pulse"
          >
            <div className="h-6 bg-[var(--bg-secondary)] rounded-lg mb-4" />
            <div className="h-4 bg-[var(--bg-secondary)] rounded-lg w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-red-500/50 bg-red-500/10 p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">
          No projects found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
