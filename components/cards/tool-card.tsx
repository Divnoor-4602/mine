"use client";

import React from "react";
import { TTools } from "@/constants";
import StackIcon from "tech-stack-icons";
import { useTheme } from "../theme-provider";
import Image from "next/image";

export type TToolCard = {
  tool: TTools;
};

const ToolCard = ({ tool }: TToolCard) => {
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

    if (tool.customIcon) {
      // Check if this is a theme-aware icon (has light/dark variants)
      const themeAwareIcons = ["expo-icon", "drizzle-icon"];
      const isThemeAware = themeAwareIcons.includes(tool.customIcon);

      if (isThemeAware) {
        // For theme-aware icons, use the appropriate variant
        const iconVariant =
          resolvedTheme === "dark"
            ? `${tool.customIcon}-light`
            : tool.customIcon;
        return (
          <Image
            src={`/images/icons/${iconVariant}.svg`}
            alt={tool.name}
            width={32}
            height={32}
            className="size-8"
          />
        );
      }

      // For regular custom icons
      return (
        <Image
          src={`/images/icons/${tool.customIcon}.svg`}
          alt={tool.name}
          width={32}
          height={32}
          className="size-8"
        />
      );
    }

    return (
      <StackIcon
        name={tool.icon}
        className="size-8"
        variant={resolvedTheme === "dark" ? "dark" : "light"}
      />
    );
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      {renderIcon()}
      <span className="text-xs tracking-wide text-[var(--color-tool-card-description)]">
        {tool.name}
      </span>
    </div>
  );
};

export default ToolCard;
