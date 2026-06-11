import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeployment } from "../../Api/dataGet.js";

export default function ProjectForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputClass =
    "w-full rounded-[10px] border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)]";

  const deploy = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createDeployment({
        name: repoUrl.split("/").pop() || "project",
        repoUrl: repoUrl,
        framework: "React + Vite",
        status: "active",
      });

      if (response.success) {
        // If API returned created deployment doc, navigate to its details page
        const newId = response.data?.deploymentDoc?._id || response.data?.id;
        if (newId) {
          navigate(`/projects/${newId}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(response.message || "Couldn't add that repo");
      }
    } catch (err) {
      setError(err.message || "Something broke. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-5" onSubmit={deploy}>
      {error && (
        <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          GitHub repo URL
        </label>
        <input
          type="text"
          placeholder="https://github.com/you/my-app"
          className={inputClass}
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
        />
        <p className="mt-1.5 text-xs text-[var(--text-muted)]">
          Public repos only.
        </p>
      </div>

      <div className="rounded-[10px] border border-[var(--border-primary)] bg-[var(--bg-muted)] px-4 py-3.5 text-sm text-[var(--text-secondary)]">
        <p className="font-medium text-[var(--text-primary)]">
          What happens next
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-xs">
          <li>Clone the repo</li>
          <li>npm install</li>
          <li>npm run build</li>
        </ol>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[10px] py-3 text-sm font-semibold text-[var(--text-white)] disabled:opacity-50"
        style={{
          background: loading ? "var(--text-muted)" : "var(--accent-primary)",
        }}
      >
        {loading ? "Building..." : "Add project"}
      </button>
    </form>
  );
}
