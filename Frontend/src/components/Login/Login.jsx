import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../Api/queryHooks.js";
import { useAuth } from "../../context/useAuthHook.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();

  const inputClass =
    "w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)]";

  const senddata = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginMutation.mutateAsync({ email, password });
      const user = response?.data?.user || response?.user || response;
      if (user) {
        setUser(user);
        navigate("/dashboard");
      } else {
        setError(response?.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-primary) px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary)"
        >
          ← Back home
        </Link>

        <div className="rounded-xl border border-(--border-primary) bg-(--bg-card) p-7 shadow-(--shadow-card)">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
          <p className="mt-1 text-sm text-(--text-secondary)">
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
              className="w-full rounded-lg py-3 text-sm font-medium text-(--text-white) disabled:opacity-50"
              style={{ background: "var(--accent-primary)" }}
            >
              {loading ? "One sec..." : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-(--text-secondary)">
            No account?{" "}
            <Link
              to="/register"
              className="font-medium text-(--accent-primary) hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
