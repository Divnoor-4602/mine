"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Initialize theme state with immediate theme detection
  const getInitialTheme = (): { theme: Theme; resolved: "light" | "dark" } => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      const initialTheme = savedTheme || defaultTheme;
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      const resolved =
        initialTheme === "system"
          ? systemTheme
          : (initialTheme as "light" | "dark");

      // Set immediately on HTML element
      document.documentElement.setAttribute("data-theme", resolved);

      return { theme: initialTheme, resolved };
    }
    return { theme: defaultTheme, resolved: "dark" };
  };

  const initial = getInitialTheme();
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    initial.resolved
  );
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = React.useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  }, []);

  // Resolve the actual theme to apply
  const resolveTheme = React.useCallback(
    (currentTheme: Theme): "light" | "dark" => {
      if (currentTheme === "system") {
        return getSystemTheme();
      }
      return currentTheme;
    },
    [getSystemTheme]
  );

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = savedTheme || defaultTheme;
    const resolved = resolveTheme(initialTheme);

    setTheme(initialTheme);
    setResolvedTheme(resolved);
    setMounted(true);

    // Set the data-theme attribute immediately
    document.documentElement.setAttribute("data-theme", resolved);
  }, [defaultTheme, storageKey, resolveTheme]);

  // Update DOM when theme changes
  useEffect(() => {
    if (!mounted) return;

    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  }, [theme, mounted, resolveTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        document.documentElement.setAttribute("data-theme", resolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted, getSystemTheme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
