"use client";

import { PortfolioNav } from "@/components/portfolio/portfolio-nav";
import { ProfileSidebar } from "@/components/portfolio/profile-sidebar";
import { AboutSection } from "@/components/portfolio/sections/about-section";
import { ExperienceSection } from "@/components/portfolio/sections/experience-section";
import { ProjectsSection } from "@/components/portfolio/sections/projects-section";
import { SkillsSection } from "@/components/portfolio/sections/skills-section";
import { labels, type Locale } from "@/lib/i18n";
import type { PortfolioData } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  data: PortfolioData;
  locale: Locale;
};

export function PortfolioView({ data, locale }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const t = labels[locale];
  const featuredProjects = data.projects.filter((project) => project.featured);
  const otherProjects = data.projects.filter((project) => !project.featured);
  const projects = [...featuredProjects, ...otherProjects];

  return (
    <div
      className={cn(
        "min-h-screen bg-cover bg-center bg-fixed text-foreground transition-colors lg:h-[100svh] lg:overflow-hidden",
        isDarkMode ? "dark bg-[#0a0e1a]" : "bg-slate-100",
      )}
      style={{
        backgroundImage: isDarkMode
          ? "url('/fundo-escuro.jpg')"
          : "url('/fundo-claro.jpg')",
      }}
    >
      <PortfolioNav labels={t} />

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-6 px-4 pb-6 pt-[76px] sm:px-6 lg:h-full lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10 lg:px-8">
        <ProfileSidebar
          data={data.profile}
          isDarkMode={isDarkMode}
          locale={locale}
          onToggleTheme={() => setIsDarkMode((current) => !current)}
        />

        <main className="scroll-smooth bg-slate-50/90 px-6 py-10 transition-colors sm:px-10 dark:bg-[#0f1421]/90 lg:min-h-0 lg:overflow-y-auto lg:px-14">
          <div className="space-y-14">
            <AboutSection about={data.about} title={t.about} />
            <SkillsSection skills={data.skills} title={t.skills} />
            <ProjectsSection
              projects={projects}
              title={t.projects}
              featuredLabel={t.featured}
              viewProjectLabel={t.viewProject}
              codeLabel={t.code}
            />
            <ExperienceSection
              experiences={data.experiences}
              title={t.experience}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
