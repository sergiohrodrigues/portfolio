"use client";

import { ProjectLink } from "@/components/portfolio/project-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/portfolio";
import { X } from "lucide-react";
import { useEffect, useId, useState } from "react";

type Props = {
  project: Project;
  featuredLabel: string;
  viewProjectLabel: string;
  codeLabel: string;
};

export function ProjectCard({
  project,
  featuredLabel,
  viewProjectLabel,
  codeLabel,
}: Props) {
  const hasProjectLink = project.link && project.link !== "#";
  const hasRepoLink = project.repo && project.repo !== "#";
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className="h-full cursor-pointer border-slate-200 bg-white text-slate-950 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-white/10 dark:bg-[#161c2e] dark:text-white dark:hover:border-cyan-400/70"
      >
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base text-slate-950 dark:text-white">
              {project.title}
            </CardTitle>
            {project.featured && (
              <Badge className="bg-emerald-500 text-xs text-white">
                {featuredLabel}
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-300">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            {project.stack}
          </p>
          <div
            className="mt-4 flex flex-wrap gap-2"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {hasProjectLink && (
              <ProjectLink href={project.link} label={viewProjectLabel} />
            )}
            {hasRepoLink && <ProjectLink href={project.repo} label={codeLabel} />}
            {!hasProjectLink && !hasRepoLink && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Mais detalhes em breve
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="max-h-[88vh] w-full overflow-y-auto rounded-2xl bg-white p-5 text-slate-950 shadow-2xl dark:border dark:border-white/10 dark:bg-[#161c2e] dark:text-white sm:max-w-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 id={titleId} className="text-xl font-semibold">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge className="bg-emerald-500 text-xs text-white">
                      {featuredLabel}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  {project.stack}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Fechar"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>

            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-200">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {hasProjectLink && (
                <ProjectLink href={project.link} label={viewProjectLabel} />
              )}
              {hasRepoLink && (
                <ProjectLink href={project.repo} label={codeLabel} />
              )}
              {!hasProjectLink && !hasRepoLink && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Mais detalhes em breve
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
