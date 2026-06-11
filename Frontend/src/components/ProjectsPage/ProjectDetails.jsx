import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { getDeployment, deleteDeployment } from "../../Api/dataGet.js";

const logLines = [
  { text: "$ git clone <repo-url>", className: "text-[var(--accent-light)]" },
  { text: "Cloning repository...", className: "text-[var(--terminal-text)]" },
  { text: "$ npm install", className: "text-[var(--accent-light)]" },
  {
    text: "Installing dependencies...",
    className: "text-[var(--terminal-text)]",
  },
  { text: "$ npm run build", className: "text-[var(--accent-light)]" },
  {
    text: "vite building for production...",
    className: "text-[var(--terminal-text)]",
  },
  { text: "✓ Build finished", className: "text-[var(--text-success)]" },
];

export function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getDeployment(id);
        if (response.success) {
          setProject(response.data);
        } else {
          setError(response.message || "Couldn't load this project");
        }
      } catch (err) {
        setError(err.message || "Couldn't load this project");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-[var(--text-secondary)]">Loading...</p>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-600">
          {error || "Project not found"}
        </div>
      </DashboardLayout>
    );
  }

  // Helper renderers for deployment and project shapes
  const title = project.projectName || project.name || "Untitled";
  const repoUrl = project.RepoInfo?.repoUrl || project.archiveUrl || null;
  const details = [
    ["Deployment ID", project.deploymentId || project.deployment_id || "—"],
    ["Status", project.status || "unknown"],
    ["URL", project.url || "—"],
    [
      "Deployed at",
      project.deployedAt
        ? new Date(project.deployedAt).toLocaleString()
        : project.updatedAt
          ? new Date(project.updatedAt).toLocaleString()
          : "—",
    ],
  ];

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      console.log("Deleting project:", id);
      await deleteDeployment(id);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <DashboardLayout>
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

          <button
            onClick={handleDelete}
            className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>

        {repoUrl && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{repoUrl}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-[var(--border-primary)] px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--terminal-red)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--terminal-yellow)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--terminal-green)]" />
            <span className="ml-2 text-xs text-[var(--text-muted)]">
              build output
            </span>
          </div>
          <div className="max-h-80 space-y-2 overflow-auto bg-[var(--bg-terminal)] p-5 text-[13px]">
            {Array.isArray(project.buildLogs) && project.buildLogs.length > 0
              ? project.buildLogs.map((line, idx) => (
                  <p key={idx} className="text-[var(--terminal-text)]">
                    {line}
                  </p>
                ))
              : logLines.map((line) => (
                  <p key={line.text} className={line.className}>
                    {line.text}
                  </p>
                ))}
            <p className="pt-2 text-xs text-[var(--text-muted)]">
              Real-time logs aren't hooked up yet.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <h2 className="text-sm font-semibold">Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-[var(--text-muted)]">{label}</dt>
                  <dd className="mt-0.5 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-muted)] p-5 text-sm">
            <p className="font-medium text-[var(--text-primary)]">Live URL</p>
            <p className="mt-2 text-[var(--text-secondary)]">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent-primary)]"
                >
                  {project.url}
                </a>
              ) : (
                "Not available yet. The deploy service will publish a URL when deployment succeeds."
              )}
            </p>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-red-500/20 bg-[var(--bg-card)] p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-red-500">Delete Project?</h2>

            <p className="mt-4 text-[var(--text-secondary)]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              This action cannot be undone. All deployment data, logs, and
              project information will be permanently removed.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="rounded-lg border border-[var(--border-primary)] px-5 py-2.5 text-sm hover:bg-[var(--bg-muted)]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
