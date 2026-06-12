import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => (
  <section
    className="border-t border-(--border-primary)"
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
        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-(--accent-primary)"
      >
        Get started
        <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);
