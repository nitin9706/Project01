import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Deployments", href: "#deployments" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const newLocal =
    "min-h-screen overflow-x-hidden bg-(--bg-primary) text-[var(--text-primary)]";
  const newLocal_1 =
    "absolute left-20 top-20 h-37.5 w-37.5 rounded-full bg-[var(--glow-primary)] blur-3xl";
  const newLocal_2 =
    "rounded-2xl border border-(--border-primary) bg-(--bg-card) px-7 py-4 font-semibold text-[var(--text-primary)] backdrop-blur-xl";
  return (
    <div
      className={newLocal}
      style={{
        backgroundImage: "var(--gradient-background)",
      }}
    >
      {/* Background Glow */}
      <div className={newLocal_1} />

      <div className="absolute bottom-0 right-0 h-31.25 w-31.25 rounded-full bg-(--glow-secondary) blur-3xl" />

      {/* Navbar */}
      <motion.nav className="fixed left-1/2 top-3 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
        <div className="rounded-[28px] border border-(--border-primary) bg-[var(--bg-navbar)]/95 px-4 py-4 shadow-[var(--shadow-primary)] backdrop-blur-2xl max-md:py-4 max-md:pb-0 ">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                style={{
                  background: "var(--gradient-primary)",
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-[var(--text-white)]"
              >
                D
              </div>

              <div className="leading-tight">
                <h1 className="text-lg font-semibold tracking-wide">
                  Deployify
                </h1>

                <p className="text-xs text-[var(--text-secondary)]">
                  Deployment Platform
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-1 backdrop-blur-xl md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                to={`/login`}
                className="hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-xl transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] md:inline-flex"
              >
                Login
              </Link>

              <Link
                to={`/register`}
                style={{
                  background: "var(--gradient-primary)",
                }}
                className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-[var(--text-white)] shadow-[var(--shadow-primary)] transition hover:scale-[1.03] hidden md:inline-flex"
              >
                Start Free
              </Link>

              <button
                onClick={() => setNavOpen((open) => !open)}
                aria-expanded={navOpen}
                aria-controls="home-nav-mobile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition hover:bg-white/10 md:hidden"
              >
                {navOpen ? <X size={18} /> : <Menu size={18} />}
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            </div>
          </div>

          <div
            id="home-nav-mobile"
            className={`mt-4 overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--bg-card)]/95 p-4 text-sm text-[var(--text-secondary)] backdrop-blur-xl transition-all duration-300 md:hidden ${navOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className="rounded-2xl px-4 py-2 transition hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 pb-24 pt-24 lg:pt-32 lg:grid-cols-2"
      >
        {/* Left */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--border-accent) bg-(--bg-card) px-4 py-2 text-sm text-(--accent-light) backdrop-blur-xl max-md:mt-10">
            <span className="h-2 w-2 rounded-full bg-(--accent-primary) " />
            Modern DevOps Infrastructure
          </div>

          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            Deploy apps
            <motion.span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="block"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              without pain.
            </motion.span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-(--text-secondary)">
            A modern deployment platform with GitHub integration, Docker
            deployments, realtime logs, CI/CD pipelines, and cloud-native
            infrastructure.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={`/projects/create`}
              style={{ background: "var(--gradient-primary)" }}
              className="rounded-2xl px-7 py-4 font-semibold text-(--text-white) transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320 }}
            >
              Deploy Now
            </Link>

            <motion.button
              className={newLocal_2}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              View Docs
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[var(--accent-primary)]">
                1M+
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Deployments
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[var(--accent-primary)]">
                99.9%
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Uptime
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.16, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[var(--accent-primary)]">
                5s
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Average Deploy
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-[40px] bg-[var(--glow-primary)] blur-3xl" />

          {/* Main Card */}
          <motion.div
            className="relative overflow-hidden rounded-[40px] border border-[var(--border-primary)] bg-[var(--bg-secondary)] backdrop-blur-2xl shadow-[var(--shadow-primary)]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Bar */}
            <div className="flex items-center gap-2 border-b border-[var(--border-primary)] px-6 py-4">
              <div className="h-3 w-3 rounded-full bg-[var(--terminal-red)]" />

              <div className="h-3 w-3 rounded-full bg-[var(--terminal-yellow)]" />

              <div className="h-3 w-3 rounded-full bg-[var(--terminal-green)]" />

              <p className="ml-4 text-sm text-[var(--text-secondary)]">
                deployment-terminal
              </p>
            </div>

            {/* Terminal */}
            <div className="space-y-5 bg-[var(--bg-terminal)] p-6 font-mono text-sm">
              <p className="text-[var(--accent-light)]">
                $ git clone github.com/nitin9706/app
              </p>

              <p className="text-[var(--terminal-text)]">
                Cloning repository...
              </p>

              <p className="text-[var(--accent-light)]">$ npm install</p>

              <p className="text-[var(--terminal-text)]">
                Installing dependencies...
              </p>

              <p className="text-[var(--accent-light)]">$ docker build .</p>

              <p className="text-[var(--terminal-text)]">
                Building Docker container...
              </p>

              <p className="text-[var(--text-success)]">
                ✔ Deployment successful
              </p>

              {/* Live URL */}
              <div className="rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)] p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-wider text-[var(--accent-light)]">
                  Live URL
                </p>

                <p className="mt-2 text-[var(--text-primary)]">
                  https://portfolio.deployify.app
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <hr className="mx-auto rounded-full border-gray-500 border my-12" />
      {/* Features */}
      <motion.section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">Built for modern developers</h2>

          <p className="mt-5 text-lg text-[var(--text-secondary)]">
            Everything needed for production-grade deployments.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {[
            "GitHub Integration",
            "Docker Deployments",
            "Realtime Logs",
            "CI/CD Automation",
            "Custom Domains",
            "Monitoring",
          ].map((feature, idx) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                delay: idx * 0.09,
                duration: 0.9,
                type: "spring",
                stiffness: 280,
              }}
              className="group rounded-[28px] border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 backdrop-blur-xl transition"
              whileHover={{ y: -6 }}
            >
              <div
                style={{
                  background: "var(--gradient-primary)",
                }}
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-[var(--text-white)] shadow-[var(--shadow-primary)]"
              >
                ⚡
              </div>

              <h3 className="text-2xl font-bold">{feature}</h3>

              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                Powerful cloud-native infrastructure tools for scalable
                deployments and automation.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Divider */}
      <hr className="mx-auto rounded-full border-gray-500 border my-12" />

      {/* Footer */}
      <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-footer)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex items-start gap-4">
              <div
                style={{ background: "var(--gradient-primary)" }}
                className="h-10 w-10 flex items-center justify-center rounded-2xl text-[var(--text-white)] font-bold"
              >
                D
              </div>

              <div>
                <h3 className="text-lg font-semibold">Deployify</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Modern cloud deployment platform
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Deployments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-primary)]">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--border-primary)] pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              © {new Date().getFullYear()} Deployify. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Pricing
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
