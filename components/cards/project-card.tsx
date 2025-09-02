import Link from "next/link";
import React from "react";
import { LinkIcon } from "@phosphor-icons/react";
import CustomStackBadge from "../custom-stack-badge";
import LiveLinkPreview from "../live-link-preview";
import { TProjects } from "@/constants";

const ProjectCard = ({
  title,
  description,
  githubLink,
  liveLink,
  previewImage,
  techStack,
}: TProjects) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* project header */}

      <div className="flex flex-col w-full gap-1">
        <div className="flex items-start justify-between w-full">
          <h2 className="tracking-tight font-semibold text-base text-[var(--color-text)]">
            {title}
          </h2>
          {/* view links */}
          <div className="flex items-center gap-4">
            {githubLink && (
              <Link
                className="flex items-center gap-1 text-[var(--color-project-card-description)] hover:text-[var(--color-text)]"
                href={githubLink}
                target="_blank"
              >
                <span className="text-xs text-[var(--color-project-card-description)]">
                  GitHub
                </span>
                <LinkIcon
                  size={12}
                  className="text-[var(--color-project-card-description)]"
                />
              </Link>
            )}
            {liveLink && (
              <LiveLinkPreview
                liveLink={liveLink}
                previewImage={previewImage}
                previewAlt={`${title} preview`}
              />
            )}
          </div>
        </div>
        <div className="text-sm text-[var(--color-project-card-description)]">
          {description}
        </div>
      </div>

      {/* badges */}
      <div className="flex flex-wrap gap-3 ">
        {techStack.map((tech) => (
          <CustomStackBadge
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            customIcon={tech.customIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
