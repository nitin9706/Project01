import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
export const FAQSection = () => {
  return (
    <section id="faq" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-medium text-(--accent-primary)">FAQ</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Common questions
            </h2>
            <p className="mt-3 text-(--text-secondary)">
              Quick answers before you connect your first repository.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-(--accent-primary) hover:underline"
            >
              Create free account
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-(--border-primary) rounded-xl border border-(--border-primary) bg-(--bg-card)">
            {faqs.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium marker:content-none">
                  {item.q}
                  <ChevronRight
                    size={16}
                    className="shrink-0 text-(--text-muted) transition group-open:rotate-90"
                  />
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-(--text-secondary)">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
