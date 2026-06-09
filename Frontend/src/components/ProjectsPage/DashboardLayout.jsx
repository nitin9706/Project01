import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
      style={{ backgroundImage: "var(--gradient-background)" }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--glow-primary)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--glow-secondary)] blur-3xl" />

      <div className="relative flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}


