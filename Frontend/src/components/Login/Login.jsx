import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Api/dataGet.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const senddata = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        email: email,
        password: password,
      });
      if (response.success) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-5">
          {/* Left */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                style={{
                  background: "var(--gradient-primary)",
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-[var(--text-white)]"
              >
                D
              </div>

              <div className="leading-tight">
                <h1 className="text-lg font-semibold tracking-wide">
                  Deployify
                </h1>

                <p className="text-xs text-[var(--text-secondary)]">
                  Deployment Platform
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-zinc-400 mb-6">Login to your deployment platform</p>
        <form className="space-y-4" onSubmit={senddata}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-3 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <button
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition cursor-pointer active:scale-98 hover:bg-white/90 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
