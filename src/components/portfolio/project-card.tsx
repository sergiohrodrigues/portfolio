import { ProjectLink } from "@/components/portfolio/project-link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/portfolio";

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

  return (
    <Card className="border-slate-200 bg-white text-slate-950 dark:border-white/10">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base text-slate-950">
            {project.title}
          </CardTitle>
          {project.featured && (
            <Badge className="bg-emerald-500 text-xs text-white">
              {featuredLabel}
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-slate-500 leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-semibold text-cyan-700">{project.stack}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hasProjectLink && (
            <ProjectLink href={project.link} label={viewProjectLabel} />
          )}
          {hasRepoLink && <ProjectLink href={project.repo} label={codeLabel} />}
          {!hasProjectLink && !hasRepoLink && (
            <span className="text-xs text-slate-400">
              Mais detalhes em breve
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
