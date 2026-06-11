import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Api/dataGet.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputClass =
    "w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)]";

  const senddata = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        if (response.data?.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
        }
        if (response.data?.user) {
          try {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          } catch (e) {}
        }
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          ← Back home
        </Link>

        <div className="rounded-[var(--radius-xl)] border border-[var(--border-primary)] bg-[var(--bg-card)] p-7 shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            To see your deployed projects.
          </p>

          <form className="mt-6 space-y-4" onSubmit={senddata}>
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 text-sm font-medium text-[var(--text-white)] disabled:opacity-50"
              style={{ background: "var(--accent-primary)" }}
            >
              {loading ? "One sec..." : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
            No account?{" "}
            <Link
              to="/register"
              className="font-medium text-[var(--accent-primary)] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
