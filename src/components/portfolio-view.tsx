import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { labels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PortfolioData } from "@/lib/portfolio";

type Props = {
  data: PortfolioData;
  locale: Locale;
};

export function PortfolioView({ data, locale }: Props) {
  const t = labels[locale];
  const otherLocale = locale === "pt" ? "en" : "pt";
  const featuredProjects = data.projects.filter((project) => project.featured);
  const otherProjects = data.projects.filter((project) => !project.featured);

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="border-b bg-card px-5 py-8 sm:px-8 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0 lg:px-8 lg:py-12">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-7">
              <Image
                src={data.profile.avatarUrl || "/profile.svg"}
                alt={data.profile.name}
                width={320}
                height={320}
                priority
                className="aspect-square w-32 rounded-xl border object-cover sm:w-44 lg:w-full"
              />
              <Separator />
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {data.profile.name}
                </h2>
                <p className="mt-2 text-lg text-primary">{data.profile.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {data.profile.location}
                </p>
              </div>
              <p className="leading-7 text-muted-foreground">
                {data.profile.summary}
              </p>
            </div>
            <div className="grid gap-3">
              <a
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                href={`mailto:${data.profile.email}`}
              >
                {t.email}
              </a>
              <a
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                href={data.profile.linkedin}
              >
                LinkedIn
              </a>
              <a
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                href={data.profile.github}
              >
                GitHub
              </a>
              <a
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                href={data.profile.whatsapp}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </aside>

        <section className="h-auto overflow-visible px-5 py-8 sm:px-8 lg:h-screen lg:overflow-y-auto lg:px-12 lg:py-12">
          <div className="max-w-3xl space-y-14">
            <section className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {t.portfolio}
              </p>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                {data.about.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {data.about.description}
              </p>
            </section>

            <section className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">
                  {t.projects}
                </h2>
                <a
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href={`/?lang=${otherLocale}`}
                >
                  {otherLocale.toUpperCase()}
                </a>
              </div>
              <div className="grid gap-4">
                {[...featuredProjects, ...otherProjects].map((project) => (
                  <Card key={project.id} className="bg-card/70">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-3">
                        <CardTitle className="text-xl text-white">
                          {project.title}
                        </CardTitle>
                        {project.featured ? <Badge>{t.featured}</Badge> : null}
                      </div>
                      <CardDescription className="leading-7">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-primary">
                        {project.stack}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {project.link ? (
                          <a
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                            })}
                            href={project.link}
                          >
                            {t.viewProject}
                          </a>
                        ) : null}
                        {project.repo ? (
                          <a
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                            })}
                            href={project.repo}
                          >
                            {t.code}
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-semibold text-white">{t.skills}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.skills.map((skill) => (
                  <Card key={skill.id} size="sm" className="bg-card/60">
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.category}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-5 pb-10">
              <h2 className="text-2xl font-semibold text-white">
                {t.experience}
              </h2>
              <div className="space-y-4">
                {data.experiences.map((experience) => (
                  <Card key={experience.id} className="bg-card/60">
                    <CardHeader>
                      <CardDescription className="font-medium text-primary">
                        {experience.period}
                      </CardDescription>
                      <CardTitle className="text-xl text-white">
                        {experience.role}
                      </CardTitle>
                      <CardDescription>{experience.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-7 text-muted-foreground">
                        {experience.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
