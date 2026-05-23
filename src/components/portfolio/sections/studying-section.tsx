import { SectionHeading } from "@/components/portfolio/section-heading";
import { SkillIcon } from "@/components/portfolio/skill-icon";
import type { Study } from "@/lib/portfolio";

type Props = {
  studies: Study[];
  title: string;
};

export function StudyingSection({ studies, title }: Props) {
  return (
    <section id="estudando" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-6 flex w-fit flex-wrap gap-5">
        {studies.map((study) => (
          <SkillIcon key={study.id} skill={study} />
        ))}
      </div>
    </section>
  );
}
