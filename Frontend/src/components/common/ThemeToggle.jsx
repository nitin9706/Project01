import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] backdrop-blur-xl transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] ${className}`}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}


