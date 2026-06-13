import { FolderKanban, Layers, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { ProjectCardGrid } from "./ProjectCards";
import { useAllDeployments } from "../../Api/queryHooks.js";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: projectsData = [], refetch } = useAllDeployments();

  const totalProjects = Array.isArray(projectsData?.data)
    ? projectsData.data.length
    : Array.isArray(projectsData)
      ? projectsData.length
      : 0;

  const activeCount = (
    Array.isArray(projectsData?.data)
      ? projectsData.data
      : Array.isArray(projectsData)
        ? projectsData
        : []
  ).filter((p) => p.status === "success").length;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const stats = [
    { label: "Projects", value: totalProjects, icon: FolderKanban },
    { label: "Active", value: activeCount, icon: Layers },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--text-primary)">
            Your projects
          </h1>
          <p className="mt-1 text-(--text-secondary)">
            {totalProjects === 0
              ? "Nothing here yet. Add a repo to get started."
              : `${totalProjects} repo${totalProjects === 1 ? "" : "s"} connected`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-[10px] border border-(--border-primary) px-4 py-2.5 text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>

          <Link
            to="/projects/create"
            className="inline-flex items-center justify-center rounded-[10px] px-5 py-2.5 text-sm font-semibold text-(--text-white)"
            style={{ background: "var(--accent-primary)" }}
          >
            Add project
          </Link>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-sm">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg border border-(--border-primary) bg-(--bg-card) p-5 shadow-(--shadow-card)"
          >
            <Icon size={17} className="text-(--accent-primary)" />
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {value}
            </p>
            <p className="text-sm text-(--text-secondary)">{label}</p>
          </div>
        ))}
      </div>

      <ProjectCardGrid />
    </DashboardLayout>
  );
}
