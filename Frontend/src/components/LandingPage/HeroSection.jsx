import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="landing-hero border-b border-(--border-primary)">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-(--text-primary) md:text-5xl md:leading-[1.1]">
            GitHub deployments,
            <br className="hidden sm:block" />
            managed in one place
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-(--text-secondary) md:text-lg">
            Deployify connects to your repository, runs the build, and keeps
            every project organized on a single dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects/create"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white"
              style={{ background: "var(--accent-primary)" }}
            >
              Start deploying
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-lg border border-(--border-primary) bg-(--bg-card) px-5 py-2.5 text-sm font-medium text-(--text-primary)"
            >
              Log in to dashboard
            </Link>
          </div>
        </div>

        {/* Product preview */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-primary)">
            <div className="flex items-center justify-between border-b border-(--border-primary) px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-(--terminal-red)" />
                <div className="h-2 w-2 rounded-full bg-(--terminal-yellow)" />
                <div className="h-2 w-2 rounded-full bg-(--terminal-green)" />
                <span className="ml-2 text-xs text-(--text-muted)">
                  app.deployify.io/dashboard
                </span>
              </div>
              <span className="rounded-md bg-(--bg-muted) px-2 py-0.5 text-xs font-medium text-(--accent-primary)">
                Live
              </span>
            </div>

            <div className="grid md:grid-cols-[200px_1fr]">
              <div className="hidden border-r border-(--border-primary) bg-(--bg-muted) p-4 md:block">
                <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                  Menu
                </p>
                <div className="mt-3 space-y-1">
                  <div className="rounded-md bg-(--bg-card) px-3 py-2 text-xs font-medium text-(--accent-primary)">
                    Projects
                  </div>
                  <div className="rounded-md px-3 py-2 text-xs text-(--text-secondary)">
                    Add repo
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Your projects</p>
                    <p className="text-xs text-(--text-muted)">
                      2 repositories
                    </p>
                  </div>
                  <div
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                    style={{ background: "var(--accent-primary)" }}
                  >
                    Add project
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      name: "portfolio-site",
                      branch: "main",
                      status: "Active",
                    },
                    {
                      name: "dashboard-ui",
                      branch: "main",
                      status: "Active",
                    },
                  ].map((project) => (
                    <div
                      key={project.name}
                      className="rounded-lg border border-(--border-primary) p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{project.name}</p>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-(--text-muted)">
                        {project.branch}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
