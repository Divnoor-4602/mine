"use client";

import React from "react";
import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div
        className="rounded-full bg-[--color-background] p-2 cursor-pointer border max-w-fit animate-pulse"
        style={{ borderColor: "var(--color-theme-border)" }}
      >
        <SunIcon className="text-[--color-text] w-4 h-4" />
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-[--color-background] p-2 cursor-pointer border max-w-fit"
      style={{ borderColor: "var(--color-theme-border)" }}
      onClick={handleThemeSwitch}
    >
      {resolvedTheme === "dark" ? (
        <MoonStarsIcon className="text-[--color-text] w-4 h-4" />
      ) : (
        <SunIcon className="text-[--color-text] w-4 h-4" />
      )}
    </div>
  );
};

export default ThemeSwitch;
