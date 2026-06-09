import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeployment } from "../../Api/dataGet.js";

export default function ProjectForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [framework, setFramework] = useState("React + Vite");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputClass =
    "w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:ring-2 focus:ring-[var(--glow-primary)]";

  const deploy = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createDeployment({
        name: repoUrl.split("/").pop() || "project",
        repoUrl: repoUrl,
        framework: framework,
        status: "active",
      });

      if (response.success) {
        navigate("/dashboard");
      } else {
        setError(response.message || "Failed to create project");
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-6" onSubmit={deploy}>
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-3 py-2 rounded-xl text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          GitHub Repository
        </label>
        <input
          type="text"
          placeholder="github.com/username/repo"
          className={inputClass}
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Framework
        </label>
        <select
          className={inputClass}
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        >
          <option>React + Vite</option>
          {/* <option>Next.js</option>
          <option>Node.js</option>
          <option>Vite</option> */}
        </select>
        <p className="text-red-500 text-[13px] capitalize">
          only Serving Vite + React project currently *{" "}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading
            ? "var(--bg-secondary)"
            : "var(--gradient-primary)",
        }}
        className="w-full rounded-2xl px-6 py-3.5 font-semibold text-[var(--text-white)] shadow-[var(--shadow-primary)] transition hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
      >
        {loading ? "Creating Project..." : "Create Project"}
      </button>
    </form>
  );
}
