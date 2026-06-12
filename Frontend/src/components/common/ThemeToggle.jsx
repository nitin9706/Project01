import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-(--border-primary) bg-(--bg-card) text-(--text-secondary) backdrop-blur-xl transition hover:border-(--border-accent) hover:text-(--text-primary) ${className}`}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
