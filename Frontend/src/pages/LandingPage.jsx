import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  GitBranch,
  Hammer,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow" },
  { label: "Platform", href: "#platform" },
  { label: "FAQ", href: "#faq" },
];

const workflow = [
  {
    icon: GitBranch,
    title: "Connect repository",
    description: "Add a public GitHub URL from your dashboard.",
  },
  {
    icon: Hammer,
    title: "Build pipeline",
    description:
      "Dependencies install and the production build runs automatically.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage projects",
    description:
      "Track status, framework, and deployment details in one place.",
  },
];

const platformRows = [
  { name: "User accounts", status: "available" },
  { name: "Public GitHub repos", status: "available" },
  { name: "npm install & build", status: "available" },
  { name: "Project dashboard", status: "available" },
  { name: "Docker", status: "planned" },
  { name: "Custom domains", status: "planned" },
  { name: "Deploy on push", status: "planned" },
  { name: "Environment variables", status: "planned" },
  { name: "Live preview URLs", status: "planned" },
];

const faqs = [
  {
    q: "What repositories are supported?",
    a: "Public GitHub repositories. Private repo access and OAuth are not available yet.",
  },
  {
    q: "Which stack is supported?",
    a: "Only React + Vite projects — the output of create-vite with the React template. Other frameworks are not supported yet.",
  },
  {
    q: "What URL format should I use?",
    a: "github.com/owner/repository works. https:// is optional.",
  },
  {
    q: "Is there a hosted live URL?",
    a: "Projects appear on your dashboard after build. Public hosting endpoints are not available yet.",
  },
];

function StatusBadge({ status }) {
  const isAvailable = status === "available";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isAvailable
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-[var(--bg-muted)] text-[var(--text-muted)]"
      }`}
    >
      {isAvailable ? "Available" : "Planned"}
    </span>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <div className="landing-page min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-navbar)] backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ background: "var(--accent-primary)" }}
            >
              D
            </div>
            <span className="text-sm font-semibold">Deployify</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="!h-9 !w-9 !rounded-lg" />
            <Link
              to="/login"
              className="hidden text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] sm:block"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-white sm:inline-flex"
              style={{ background: "var(--accent-primary)" }}
            >
              Get started
            </Link>
            <button
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] md:hidden"
              aria-label="Toggle menu"
            >
              {navOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="border-t border-[var(--border-primary)] px-6 py-4 md:hidden">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeNav}
                className="block py-2.5 text-sm text-[var(--text-secondary)]"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex gap-2 border-t border-[var(--border-primary)] pt-4">
              <Link
                to="/login"
                onClick={closeNav}
                className="flex-1 rounded-lg border border-[var(--border-primary)] py-2 text-center text-sm"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={closeNav}
                className="flex-1 rounded-lg py-2 text-center text-sm font-medium text-white"
                style={{ background: "var(--accent-primary)" }}
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="landing-hero border-b border-[var(--border-primary)]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl md:leading-[1.1]">
              GitHub deployments,
              <br className="hidden sm:block" />
              managed in one place
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              Deployify connects to your repository, runs the build, and keeps
              every project organized on a single dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white"
                style={{ background: "var(--accent-primary)" }}
              >
                Start deploying
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)]"
              >
                Log in to dashboard
              </Link>
            </div>
          </div>

          {/* Product preview */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--shadow-primary)]">
              <div className="flex items-center justify-between border-b border-[var(--border-primary)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--terminal-red)]" />
                  <div className="h-2 w-2 rounded-full bg-[var(--terminal-yellow)]" />
                  <div className="h-2 w-2 rounded-full bg-[var(--terminal-green)]" />
                  <span className="ml-2 text-xs text-[var(--text-muted)]">
                    app.deployify.io/dashboard
                  </span>
                </div>
                <span className="rounded-md bg-[var(--bg-muted)] px-2 py-0.5 text-xs font-medium text-[var(--accent-primary)]">
                  Live
                </span>
              </div>

              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="hidden border-r border-[var(--border-primary)] bg-[var(--bg-muted)] p-4 md:block">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Menu
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="rounded-md bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--accent-primary)]">
                      Projects
                    </div>
                    <div className="rounded-md px-3 py-2 text-xs text-[var(--text-secondary)]">
                      Add repo
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Your projects</p>
                      <p className="text-xs text-[var(--text-muted)]">
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
                        className="rounded-lg border border-[var(--border-primary)] p-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{project.name}</p>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                            {project.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
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

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[var(--accent-primary)]">
              Workflow
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              From repository to build in three steps
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              A focused pipeline designed for teams that want deployment without
              infrastructure overhead.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {workflow.map((item, index) => (
              <div key={item.title} className="relative">
                {index < workflow.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-[var(--border-primary)] md:block" />
                )}
                <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-muted)] text-[var(--accent-primary)]">
                    <item.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product / Platform table */}
      <section
        id="platform"
        className="scroll-mt-20 border-y border-[var(--border-primary)] bg-[var(--bg-secondary)] py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div id="product" className="scroll-mt-20 max-w-2xl">
            <p className="text-sm font-medium text-[var(--accent-primary)]">
              Platform
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Current capabilities
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Transparent view of what is live today and what is on the roadmap.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
            <div className="grid grid-cols-[1fr_auto] border-b border-[var(--border-primary)] bg-[var(--bg-muted)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              <span>Capability</span>
              <span>Status</span>
            </div>
            {platformRows.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 text-sm ${
                  i !== platformRows.length - 1
                    ? "border-b border-[var(--border-primary)]"
                    : ""
                }`}
              >
                <span className="text-[var(--text-primary)]">{row.name}</span>
                <StatusBadge status={row.status} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-medium text-[var(--accent-primary)]">
                FAQ
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Common questions
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Quick answers before you connect your first repository.
              </p>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] hover:underline"
              >
                Create free account
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-[var(--border-primary)] rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
              {faqs.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium marker:content-none">
                    {item.q}
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-[var(--text-muted)] transition group-open:rotate-90"
                    />
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t border-[var(--border-primary)]"
        style={{ background: "var(--accent-primary)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready to deploy?
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Create an account and connect your first repository in minutes.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent-primary)]"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-footer)] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white"
                  style={{ background: "var(--accent-primary)" }}
                >
                  D
                </div>
                <span className="text-sm font-semibold">Deployify</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
                Deployment platform for GitHub-based projects.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Product
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <a
                      href="#workflow"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Workflow
                    </a>
                  </li>
                  <li>
                    <a
                      href="#platform"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Platform
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-[var(--text-primary)]">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Account
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Deployify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
