"use client";

import StackIcon from "tech-stack-icons";
import { useTheme } from "./theme-provider";
import React from "react";
import Image from "next/image";

type TCustomStackBadge = {
  name: string;
  icon: string;
  customIcon?: string; // Should be the filename without .svg extension
};

const CustomStackBadge = ({ name, icon, customIcon }: TCustomStackBadge) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderIcon = () => {
    if (!isMounted)
      return (
        <span
          aria-hidden
          className="size-3 shrink-0 inline-block bg-[var(--color-project-card-badge-icon-loader)] animate-pulse rounded-full"
        />
      );

    if (customIcon) {
      // Check if this is a theme-aware icon (has light/dark variants)
      const themeAwareIcons = ["expo-icon", "drizzle-icon", "resend"];
      const isThemeAware = themeAwareIcons.includes(customIcon);

      if (isThemeAware) {
        // For theme-aware icons, use the appropriate variant
        let iconVariant;
        if (customIcon === "resend") {
          // Resend uses resend-dark.svg and resend-light.svg
          iconVariant =
            resolvedTheme === "dark"
              ? `${customIcon}-dark`
              : `${customIcon}-light`;
        } else {
          // Other icons use icon-light.svg and icon.svg
          iconVariant =
            resolvedTheme === "dark" ? `${customIcon}-light` : customIcon;
        }
        return (
          <Image
            src={`/images/icons/${iconVariant}.svg`}
            alt={name}
            width={12}
            height={12}
            className="size-3"
          />
        );
      }

      // For regular custom icons
      return (
        <Image
          src={`/images/icons/${customIcon}.svg`}
          alt={name}
          width={12}
          height={12}
          className="size-3"
        />
      );
    }

    return (
      <StackIcon
        name={icon}
        className="size-3"
        variant={resolvedTheme === "dark" ? "dark" : "light"}
      />
    );
  };

  return (
    <div
      className="flex items-center gap-1 px-2.5 border-[0.3px] rounded-xl py-[2.5px] border-[var(--color-project-card-badge-border)] bg-[var(--color-project-card-badge-bg)] shadow-[var(--color-project-card-badge-shadow)] cursor-default"
      suppressHydrationWarning
    >
      {renderIcon()}
      <span className="text-xs tracking-wide text-[var(--color-text)]">
        {name}
      </span>
    </div>
  );
};

export default CustomStackBadge;
