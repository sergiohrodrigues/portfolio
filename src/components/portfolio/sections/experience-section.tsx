import { SectionHeading } from "@/components/portfolio/section-heading";
import type { Experience } from "@/lib/portfolio";

type Props = {
  experiences: Experience[];
  title: string;
};

export function ExperienceSection({ experiences, title }: Props) {
  return (
    <section id="experiencia" className="scroll-mt-24 pb-14">
      <SectionHeading title={title} />
      <div className="mt-6 space-y-4">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="rounded-lg border border-slate-200 bg-white p-5 transition-colors dark:border-white/10 dark:bg-[#161c2e]"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              {experience.period}
            </p>
            <h3 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">
              {experience.role}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">
              {experience.company}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {experience.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
