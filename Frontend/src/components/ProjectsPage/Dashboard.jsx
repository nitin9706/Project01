import { FolderKanban, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { ProjectCardGrid } from "./ProjectCards";
import { getAllDeployment } from "../../Api/dataGet.js";

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllDeployment();
        if (response.success && Array.isArray(response.data)) {
          const projects = response.data;
          setTotalProjects(projects.length);
          // consider successful deployments as active
          setActiveCount(projects.filter((p) => p.status === "success").length);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: "Projects", value: totalProjects, icon: FolderKanban },
    { label: "Active", value: activeCount, icon: Layers },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Your projects
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            {totalProjects === 0
              ? "Nothing here yet. Add a repo to get started."
              : `${totalProjects} repo${totalProjects === 1 ? "" : "s"} connected`}
          </p>
        </div>

        <Link
          to="/projects/create"
          className="inline-flex items-center justify-center rounded-[10px] px-5 py-2.5 text-sm font-semibold text-[var(--text-white)]"
          style={{ background: "var(--accent-primary)" }}
        >
          Add project
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-sm">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-[var(--radius-lg)] border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)]"
          >
            <Icon size={17} className="text-[var(--accent-primary)]" />
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {value}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>

      <ProjectCardGrid />
    </DashboardLayout>
  );
}
