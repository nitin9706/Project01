export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-zinc-400 mb-6">Login to your deployment platform</p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

          <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
