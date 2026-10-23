import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (dark: boolean) => {
      root.classList.toggle("dark", dark);
      root.style.colorScheme = dark ? "dark" : "light";
      setIsDark(dark);
    };

    applyTheme(storedTheme === "dark" || (storedTheme !== "light" && systemTheme.matches));

    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("portfolio-theme") === null) applyTheme(event.matches);
    };

    systemTheme.addEventListener("change", syncWithSystem);
    return () => systemTheme.removeEventListener("change", syncWithSystem);
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setIsDark(nextTheme === "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-none border border-[var(--color-rule)] text-foreground hover:bg-secondary"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  );
}