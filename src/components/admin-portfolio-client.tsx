"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { labels, type Locale } from "@/lib/i18n";
import type { Experience, PortfolioData, Project, Skill } from "@/lib/portfolio";

type Props = {
  initialData: PortfolioData;
  locale: Locale;
};

type Status = "idle" | "saving" | "saved" | "error";

const id = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

export function AdminPortfolioClient({ initialData, locale }: Props) {
  const t = labels[locale];
  const otherLocale = locale === "pt" ? "en" : "pt";
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<Status>("idle");

  const statusText = useMemo(
    () =>
      ({
        idle: t.localChanges,
        saving: t.saving,
        saved: t.saved,
        error: t.saveError,
      })[status],
    [status, t.localChanges, t.saveError, t.saved, t.saving],
  );

  async function save() {
    setStatus("saving");
    const response = await fetch(`/api/portfolio?lang=${locale}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(response.ok ? "saved" : "error");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/";
  }

  const updateSkill = (skill: Skill) =>
    setData((current) => ({
      ...current,
      skills: current.skills.map((item) => (item.id === skill.id ? skill : item)),
    }));

  const updateProject = (project: Project) =>
    setData((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === project.id ? project : item,
      ),
    }));

  const updateExperience = (experience: Experience) =>
    setData((current) => ({
      ...current,
      experiences: current.experiences.map((item) =>
        item.id === experience.id ? experience : item,
      ),
    }));

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-6 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t.admin}
            </p>
            <h1 className="mt-1 text-3xl font-bold">{t.content}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={status === "error" ? "destructive" : "secondary"}>
              {statusText}
            </Badge>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={`/admin?lang=${otherLocale}`}
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={`/?lang=${locale}`}
            >
              {t.viewSite}
            </Link>
            <Button variant="outline" onClick={logout}>
              {t.logout}
            </Button>
            <Button onClick={save}>{t.saveAll}</Button>
          </div>
        </header>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>{t.profile}</CardTitle>
            <CardDescription>
              {t.profileDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {field(t.name, data.profile.name, (value) =>
                setData({ ...data, profile: { ...data.profile, name: value } }),
              )}
              {field(t.role, data.profile.role, (value) =>
                setData({ ...data, profile: { ...data.profile, role: value } }),
              )}
              {field(t.location, data.profile.location, (value) =>
                setData({
                  ...data,
                  profile: { ...data.profile, location: value },
                }),
              )}
              {field(t.avatarUrl, data.profile.avatarUrl, (value) =>
                setData({
                  ...data,
                  profile: { ...data.profile, avatarUrl: value },
                }),
              )}
              {field(t.email, data.profile.email, (value) =>
                setData({ ...data, profile: { ...data.profile, email: value } }),
              )}
              {field(t.github, data.profile.github, (value) =>
                setData({ ...data, profile: { ...data.profile, github: value } }),
              )}
              {field(t.linkedin, data.profile.linkedin, (value) =>
                setData({
                  ...data,
                  profile: { ...data.profile, linkedin: value },
                }),
              )}
              {field(t.whatsapp, data.profile.whatsapp, (value) =>
                setData({
                  ...data,
                  profile: { ...data.profile, whatsapp: value },
                }),
              )}
            </div>
            {textarea(t.summary, data.profile.summary, (value) =>
              setData({ ...data, profile: { ...data.profile, summary: value } }),
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.about}</CardTitle>
            <CardDescription>
              {t.aboutDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {field(t.headline, data.about.headline, (value) =>
              setData({ ...data, about: { ...data.about, headline: value } }),
            )}
            {textarea(t.description, data.about.description, (value) =>
              setData({ ...data, about: { ...data.about, description: value } }),
            )}
          </CardContent>
        </Card>

        <EditableList
          title={t.skills}
          description={t.skillsDescription}
          addLabel={t.add}
          onAdd={() =>
            setData({
              ...data,
              skills: [
                ...data.skills,
                {
                  id: id(),
                  name: "Nova habilidade",
                  category: "Categoria",
                  level: 70,
                },
              ],
            })
          }
        >
          {data.skills.map((skill) => (
            <Card key={skill.id} size="sm">
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {field(t.name, skill.name, (value) =>
                    updateSkill({ ...skill, name: value }),
                  )}
                  {field(t.category, skill.category, (value) =>
                    updateSkill({ ...skill, category: value }),
                  )}
                  {field(t.level, String(skill.level), (value) =>
                    updateSkill({ ...skill, level: Number(value) }),
                    "number",
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setData({
                      ...data,
                      skills: data.skills.filter((item) => item.id !== skill.id),
                    })
                  }
                >
                  {t.delete}
                </Button>
              </CardContent>
            </Card>
          ))}
        </EditableList>

        <EditableList
          title={t.projects}
          description={t.projectsDescription}
          addLabel={t.add}
          onAdd={() =>
            setData({
              ...data,
              projects: [
                ...data.projects,
                {
                  id: id(),
                  title: locale === "pt" ? "Novo projeto" : "New project",
                  description: "",
                  stack: "",
                  link: "",
                  repo: "",
                  featured: false,
                },
              ],
            })
          }
        >
          {data.projects.map((project) => (
            <Card key={project.id} size="sm">
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {field(t.title, project.title, (value) =>
                    updateProject({ ...project, title: value }),
                  )}
                  {field(t.stack, project.stack, (value) =>
                    updateProject({ ...project, stack: value }),
                  )}
                  {field(t.link, project.link, (value) =>
                    updateProject({ ...project, link: value }),
                  )}
                  {field(t.repo, project.repo, (value) =>
                    updateProject({ ...project, repo: value }),
                  )}
                </div>
                {textarea(t.description, project.description, (value) =>
                  updateProject({ ...project, description: value }),
                )}
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Checkbox
                    checked={project.featured}
                    onCheckedChange={(checked) =>
                      updateProject({ ...project, featured: Boolean(checked) })
                    }
                  />
                  {t.featured}
                </label>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setData({
                      ...data,
                      projects: data.projects.filter(
                        (item) => item.id !== project.id,
                      ),
                    })
                  }
                >
                  {t.delete}
                </Button>
              </CardContent>
            </Card>
          ))}
        </EditableList>

        <EditableList
          title={t.experience}
          description={t.experienceDescription}
          addLabel={t.add}
          onAdd={() =>
            setData({
              ...data,
              experiences: [
                ...data.experiences,
                {
                  id: id(),
                  role: locale === "pt" ? "Novo cargo" : "New role",
                  company: "",
                  period: "",
                  description: "",
                },
              ],
            })
          }
        >
          {data.experiences.map((experience) => (
            <Card key={experience.id} size="sm">
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {field(t.role, experience.role, (value) =>
                    updateExperience({ ...experience, role: value }),
                  )}
                  {field(t.company, experience.company, (value) =>
                    updateExperience({ ...experience, company: value }),
                  )}
                  {field(t.period, experience.period, (value) =>
                    updateExperience({ ...experience, period: value }),
                  )}
                </div>
                {textarea(t.description, experience.description, (value) =>
                  updateExperience({ ...experience, description: value }),
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setData({
                      ...data,
                      experiences: data.experiences.filter(
                        (item) => item.id !== experience.id,
                      ),
                    })
                  }
                >
                  {t.delete}
                </Button>
              </CardContent>
            </Card>
          ))}
        </EditableList>
      </div>
    </main>
  );
}

function EditableList({
  title,
  description,
  addLabel,
  onAdd,
  children,
}: {
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="outline" onClick={onAdd}>
            {addLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">{children}</div>
      </CardContent>
    </Card>
  );
}

function field(
  label: string,
  value: string,
  onChange: (value: string) => void,
  type = "text",
) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function textarea(label: string, value: string, onChange: (value: string) => void) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Textarea
        className="min-h-28"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
