import { GitBranch, Hammer, LayoutDashboard } from "lucide-react";

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

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-(--accent-primary)">
            Workflow
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            From repository to build in three steps
          </h2>
          <p className="mt-3 text-(--text-secondary)">
            A focused pipeline designed for teams that want deployment without
            infrastructure overhead.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {workflow.map((item, index) => (
            <div key={item.title} className="relative">
              {index < workflow.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-(--border-primary) md:block" />
              )}
              <div className="rounded-xl border border-(--border-primary) bg-(--bg-card) p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--bg-muted) text-(--accent-primary)">
                  <item.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--text-secondary)">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
