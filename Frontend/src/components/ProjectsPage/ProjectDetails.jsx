import { ArrowLeft, Globe, Play } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const logLines = [
  { text: "$ git pull origin main", className: "text-[var(--accent-light)]" },
  { text: "Updating branch main...", className: "text-[var(--terminal-text)]" },
  { text: "$ npm install", className: "text-[var(--accent-light)]" },
  { text: "Installing dependencies...", className: "text-[var(--terminal-text)]" },
  { text: "$ docker build .", className: "text-[var(--accent-light)]" },
  { text: "Building Docker container...", className: "text-[var(--terminal-text)]" },
  { text: "✔ Deployment successful", className: "text-[var(--text-success)]" },
];

export default function ProjectDetails() {
  return (
    <DashboardLayout>
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent-light)]"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            portfolio-app
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            github.com/user/portfolio-app
          </p>
        </div>

        <button
          type="button"
          style={{ background: "var(--gradient-primary)" }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-[var(--text-white)] transition hover:scale-[1.03]"
        >
          <Play size={16} fill="currentColor" />
          Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-secondary)] backdrop-blur-2xl lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-[var(--border-primary)] px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-[var(--terminal-red)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--terminal-yellow)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--terminal-green)]" />
            <p className="ml-4 text-sm text-[var(--text-secondary)]">
              deployment-terminal
            </p>
          </div>

          <div className="max-h-96 space-y-3 overflow-auto bg-[var(--bg-terminal)] p-6 font-mono text-sm">
            {logLines.map((line) => (
              <p key={line.text} className={line.className}>
                {line.text}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-lg font-semibold text-[var(--text-primary)]">
              Project Info
            </h2>
            <dl className="space-y-4">
              {[
                ["Framework", "React"],
                ["Branch", "main"],
                ["Status", "Running"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {label}
                  </dt>
                  <dd
                    className={`mt-1 font-medium ${
                      label === "Status"
                        ? "text-[var(--text-success)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[28px] border border-[var(--border-accent)] bg-[var(--bg-card)] p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-[var(--accent-light)]">
              <Globe size={18} />
              <p className="text-xs uppercase tracking-wider">Live URL</p>
            </div>
            <p className="font-medium text-[var(--text-primary)]">
              https://portfolio.deployify.app
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


