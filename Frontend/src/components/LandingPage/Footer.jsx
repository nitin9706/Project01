import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-(--border-primary) bg-(--bg-footer) py-12">
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
            <p className="mt-3 max-w-xs text-sm text-(--text-secondary)">
              Deployment platform for GitHub-based projects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
                <li>
                  <a href="#workflow" className="hover:text-(--text-primary)">
                    Workflow
                  </a>
                </li>
                <li>
                  <a href="#platform" className="hover:text-(--text-primary)">
                    Platform
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-(--text-primary)">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
                <li>
                  <Link to="/login" className="hover:text-(--text-primary)">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-(--text-primary)">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-(--text-muted)">
          © {new Date().getFullYear()} Deployify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
