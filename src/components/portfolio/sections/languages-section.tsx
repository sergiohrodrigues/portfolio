import { SectionHeading } from "@/components/portfolio/section-heading";
import type { Language } from "@/lib/portfolio";

type Props = {
  languages: Language[];
  title: string;
};

export function LanguagesSection({ languages, title }: Props) {
  if (languages.length === 0) {
    return null;
  }

  return (
    <section id="idiomas" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-6 flex w-fit flex-wrap gap-4">
        {languages.map((language) => (
          <div
            key={language.id}
            className="flex min-w-28 items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 transition-colors dark:border-white/10 dark:bg-[#161c2e]"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-cyan-500/10 text-sm font-bold uppercase text-cyan-700 dark:text-cyan-300">
              {language.level}
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {language.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
