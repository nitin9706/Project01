import { useState } from "react";
import { createDeployment } from "../../Api/dataGet.js";

export default function ProjectForm() {
  const [repoUrl, setRepoUrl] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:ring-2 focus:ring-[var(--glow-primary)]";

  const deploy = () => {
    // createDeployment(repoUrl);
    console.log(repoUrl);
  };

  return (
    <form
      className="w-full space-y-6"
      onSubmit={(e) => {
        deploy();
        e.preventDefault();
      }}
    >
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
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Framework
        </label>
        <select className={inputClass}>
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
        style={{ background: "var(--gradient-primary)" }}
        className="w-full rounded-2xl px-6 py-3.5 font-semibold text-[var(--text-white)] shadow-[var(--shadow-primary)] transition hover:scale-[1.02]"
      >
        Create Project
      </button>
    </form>
  );
}


