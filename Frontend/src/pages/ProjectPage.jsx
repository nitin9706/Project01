import { GitBranch } from "lucide-react";
import DashboardLayout from "../components/ProjectsPage/DashboardLayout";
import ProjectForm from "../components/ProjectsPage/ProjectForm";

export default function CreateProject() {
  return (
    <DashboardLayout>
      <div className="relative mx-auto flex max-w-2xl flex-col items-center py-8">
        <div className="w-full rounded-[40px] border border-(--border-primary) bg-(--bg-card)/80 p-8 shadow-(--shadow-primary) backdrop-blur-xl sm:p-10">
          <div className="mb-2 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--border-accent) bg-(--glow-primary) text-(--accent-primary)">
              <GitBranch size={28} />
            </div>
          </div>

          <h1
            className="mb-2 text-center text-4xl font-extrabold tracking-tight"
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Project
          </h1>
          <p className="mb-8 text-center text-(--text-secondary)">
            Connect your GitHub repository and deploy to production.
          </p>

          <ProjectForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
