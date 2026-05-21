import { SectionHeading } from "@/components/portfolio/section-heading";
import type { About } from "@/lib/portfolio";

type Props = {
  about: About;
  title: string;
};

export function AboutSection({ about, title }: Props) {
  return (
    <section id="sobre" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-5 space-y-4 text-slate-600 leading-relaxed dark:text-slate-400">
        <p>{about.headline}</p>
        <p>{about.description}</p>
      </div>
    </section>
  );
}
