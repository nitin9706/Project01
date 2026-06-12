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

function StatusBadge({ status }) {
  const isAvailable = status === "available";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isAvailable
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-(--bg-muted) text-(--text-muted)"
      }`}
    >
      {isAvailable ? "Available" : "Planned"}
    </span>
  );
}
export const PlatformSection = () => {
  return (
    <section
      id="platform"
      className="scroll-mt-20 border-y border-(--border-primary) bg-(--bg-secondary) py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div id="product" className="scroll-mt-20 max-w-2xl">
          <p className="text-sm font-medium text-(--accent-primary)">
            Platform
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Current capabilities
          </h2>
          <p className="mt-3 text-(--text-secondary)">
            Transparent view of what is live today and what is on the roadmap.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-(--border-primary) bg-(--bg-card)">
          <div className="grid grid-cols-[1fr_auto] border-b border-(--border-primary) bg-(--bg-muted) px-5 py-3 text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
            <span>Capability</span>
            <span>Status</span>
          </div>
          {platformRows.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 text-sm ${
                i !== platformRows.length - 1
                  ? "border-b border-(--border-primary)"
                  : ""
              }`}
            >
              <span className="text-(--text-primary)">{row.name}</span>
              <StatusBadge status={row.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
