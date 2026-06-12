import { Link } from "react-router-dom";
import DashboardLayout from "../components/ProjectsPage/DashboardLayout";
import ProjectForm from "../components/ProjectsPage/ProjectForm";

export default function CreateProject() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg py-4">
        <Link
          to="/dashboard"
          className="mb-6 inline-block text-sm text-(--text-secondary) hover:text-(--text-primary)"
        >
          ← Back to projects
        </Link>

        <div className="rounded-xl border border-(--border-primary) bg-(--bg-card) p-7 shadow-(--shadow-card)">
          <h1 className="text-2xl font-semibold tracking-tight">Add a repo</h1>
          <p className="mt-1 text-sm text-(--text-secondary)">
            Paste a public GitHub URL.
          </p>
          <div className="mt-6">
            <ProjectForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
