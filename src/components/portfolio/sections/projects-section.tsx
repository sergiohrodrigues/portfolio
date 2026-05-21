import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { Project } from "@/lib/portfolio";

type Props = {
  projects: Project[];
  title: string;
  featuredLabel: string;
  viewProjectLabel: string;
  codeLabel: string;
};

export function ProjectsSection({
  projects,
  title,
  featuredLabel,
  viewProjectLabel,
  codeLabel,
}: Props) {
  return (
    <section id="projetos" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            featuredLabel={featuredLabel}
            viewProjectLabel={viewProjectLabel}
            codeLabel={codeLabel}
          />
        ))}
      </div>
    </section>
  );
}
