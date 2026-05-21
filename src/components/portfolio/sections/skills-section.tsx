import { SectionHeading } from "@/components/portfolio/section-heading";
import { SkillIcon } from "@/components/portfolio/skill-icon";
import type { Skill } from "@/lib/portfolio";

type Props = {
  skills: Skill[];
  title: string;
};

export function SkillsSection({ skills, title }: Props) {
  return (
    <section id="habilidades" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-6 flex flex-wrap gap-5">
        {skills.map((skill) => (
          <SkillIcon key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
