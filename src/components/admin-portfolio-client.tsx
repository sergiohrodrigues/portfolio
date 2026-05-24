"use client";

import Link from "next/link";
import { GripVertical } from "lucide-react";
import { Children, useEffect, useMemo, useRef, useState } from "react";
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
import type {
  Book,
  Experience,
  Language,
  PortfolioData,
  Project,
  Skill,
  Study,
} from "@/lib/portfolio";

type Props = {
  initialData: PortfolioData;
  locale: Locale;
};

type Status = "idle" | "saving" | "saved" | "error";

const visibleItemsLimit = 5;

const id = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

export function AdminPortfolioClient({ initialData, locale }: Props) {
  const t = labels[locale];
  const otherLocale = locale === "pt" ? "en" : "pt";
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<Status>("idle");
  const [draggedSkillId, setDraggedSkillId] = useState<string | null>(null);

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

  const orderedSkills = useMemo(
    () =>
      [...data.skills].sort(
        (first, second) =>
          first.order - second.order || first.name.localeCompare(second.name),
      ),
    [data.skills],
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

  const moveSkill = (targetSkillId: string) => {
    if (!draggedSkillId || draggedSkillId === targetSkillId) {
      return;
    }

    const fromIndex = orderedSkills.findIndex(
      (skill) => skill.id === draggedSkillId,
    );
    const toIndex = orderedSkills.findIndex((skill) => skill.id === targetSkillId);

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const reorderedSkills = [...orderedSkills];
    const [movedSkill] = reorderedSkills.splice(fromIndex, 1);
    reorderedSkills.splice(toIndex, 0, movedSkill);

    setData((current) => ({
      ...current,
      skills: reorderedSkills.map((skill, index) => ({
        ...skill,
        order: index + 1,
      })),
    }));
  };

  const updateStudy = (study: Study) =>
    setData((current) => ({
      ...current,
      studies: current.studies.map((item) =>
        item.id === study.id ? study : item,
      ),
    }));

  const updateReadBook = (book: Book) =>
    setData((current) => ({
      ...current,
      readBooks: current.readBooks.map((item) =>
        item.id === book.id ? book : item,
      ),
    }));

  const updateReadingBook = (book: Book) =>
    setData((current) => ({
      ...current,
      readingBooks: current.readingBooks.map((item) =>
        item.id === book.id ? book : item,
      ),
    }));

  const updateLanguage = (language: Language) =>
    setData((current) => ({
      ...current,
      languages: current.languages.map((item) =>
        item.id === language.id ? language : item,
      ),
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
      <div className="mx-auto max-w-6xl space-y-8">
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

        <Card className="border-l-4 border-l-sky-500 bg-background shadow-sm">
          <CardHeader className="border-b bg-sky-50/70 py-5 dark:bg-sky-950/20">
            <CardTitle className="text-lg">{t.profile}</CardTitle>
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

        <Card className="border-l-4 border-l-emerald-500 bg-background shadow-sm">
          <CardHeader className="border-b bg-emerald-50/70 py-5 dark:bg-emerald-950/20">
            <CardTitle className="text-lg">{t.about}</CardTitle>
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
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-amber-500"
          headerClassName="bg-amber-50/70 dark:bg-amber-950/20"
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
                  order:
                    Math.max(0, ...data.skills.map((skill) => skill.order)) + 1,
                },
              ],
            })
          }
        >
          {orderedSkills.map((skill) => (
            <Card
              key={skill.id}
              size="sm"
              draggable
              onDragStart={() => setDraggedSkillId(skill.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => moveSkill(skill.id)}
              onDragEnd={() => setDraggedSkillId(null)}
              className={
                draggedSkillId === skill.id
                  ? "border-primary/60 opacity-60"
                  : undefined
              }
            >
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-[auto_repeat(4,minmax(0,1fr))]">
                  <div className="flex items-end">
                    <button
                      type="button"
                      aria-label={t.dragToReorder}
                      className="flex h-8 w-8 cursor-grab items-center justify-center rounded-md border text-muted-foreground active:cursor-grabbing"
                    >
                      <GripVertical className="size-4" />
                    </button>
                  </div>
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
                  {field(t.order, String(skill.order), (value) =>
                    updateSkill({ ...skill, order: Number(value) }),
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
          title={t.studying}
          description={t.studyingDescription}
          addLabel={t.add}
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-cyan-500"
          headerClassName="bg-cyan-50/70 dark:bg-cyan-950/20"
          onAdd={() =>
            setData({
              ...data,
              studies: [
                ...data.studies,
                {
                  id: id(),
                  name: "Docker",
                },
              ],
            })
          }
        >
          {data.studies.map((study) => (
            <Card key={study.id} size="sm">
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {field(t.name, study.name, (value) =>
                    updateStudy({ ...study, name: value }),
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setData({
                      ...data,
                      studies: data.studies.filter(
                        (item) => item.id !== study.id,
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
          title={t.languages}
          description={t.languagesDescription}
          addLabel={t.add}
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-indigo-500"
          headerClassName="bg-indigo-50/70 dark:bg-indigo-950/20"
          onAdd={() =>
            setData({
              ...data,
              languages: [
                ...data.languages,
                {
                  id: id(),
                  name: locale === "pt" ? "Ingles" : "English",
                  level: "B1",
                },
              ],
            })
          }
        >
          {data.languages.map((language) => (
            <Card key={language.id} size="sm">
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {field(t.name, language.name, (value) =>
                    updateLanguage({ ...language, name: value }),
                  )}
                  {field(t.level, language.level, (value) =>
                    updateLanguage({ ...language, level: value }),
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setData({
                      ...data,
                      languages: data.languages.filter(
                        (item) => item.id !== language.id,
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
          title={t.readingBooks}
          description={t.readingBooksDescription}
          addLabel={t.add}
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-orange-500"
          headerClassName="bg-orange-50/70 dark:bg-orange-950/20"
          onAdd={() =>
            setData({
              ...data,
              readingBooks: [
                ...data.readingBooks,
                {
                  id: id(),
                  name: locale === "pt" ? "Novo livro" : "New book",
                  imageUrl: "",
                },
              ],
            })
          }
        >
          {data.readingBooks.map((book) => (
            <BookForm
              key={book.id}
              book={book}
              imageUrlLabel={t.imageUrl}
              nameLabel={t.name}
              deleteLabel={t.delete}
              onChange={updateReadingBook}
              onDelete={() =>
                setData({
                  ...data,
                  readingBooks: data.readingBooks.filter(
                    (item) => item.id !== book.id,
                  ),
                })
              }
            />
          ))}
        </EditableList>

        <EditableList
          title={t.readBooks}
          description={t.readBooksDescription}
          addLabel={t.add}
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-lime-600"
          headerClassName="bg-lime-50/70 dark:bg-lime-950/20"
          onAdd={() =>
            setData({
              ...data,
              readBooks: [
                ...data.readBooks,
                {
                  id: id(),
                  name: locale === "pt" ? "Novo livro" : "New book",
                  imageUrl: "",
                },
              ],
            })
          }
        >
          {data.readBooks.map((book) => (
            <BookForm
              key={book.id}
              book={book}
              imageUrlLabel={t.imageUrl}
              nameLabel={t.name}
              deleteLabel={t.delete}
              onChange={updateReadBook}
              onDelete={() =>
                setData({
                  ...data,
                  readBooks: data.readBooks.filter((item) => item.id !== book.id),
                })
              }
            />
          ))}
        </EditableList>

        <EditableList
          title={t.projects}
          description={t.projectsDescription}
          addLabel={t.add}
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-rose-500"
          headerClassName="bg-rose-50/70 dark:bg-rose-950/20"
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
          showAllLabel={t.showAll}
          showLessLabel={t.showLess}
          accentClassName="border-l-violet-500"
          headerClassName="bg-violet-50/70 dark:bg-violet-950/20"
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

function BookForm({
  book,
  nameLabel,
  imageUrlLabel,
  deleteLabel,
  onChange,
  onDelete,
}: {
  book: Book;
  nameLabel: string;
  imageUrlLabel: string;
  deleteLabel: string;
  onChange: (book: Book) => void;
  onDelete: () => void;
}) {
  return (
    <Card size="sm">
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {field(nameLabel, book.name, (value) =>
            onChange({ ...book, name: value }),
          )}
          {field(imageUrlLabel, book.imageUrl, (value) =>
            onChange({ ...book, imageUrl: value }),
          )}
        </div>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          {deleteLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

function EditableList({
  title,
  description,
  addLabel,
  showAllLabel,
  showLessLabel,
  accentClassName,
  headerClassName,
  onAdd,
  children,
}: {
  title: string;
  description: string;
  addLabel: string;
  showAllLabel: string;
  showLessLabel: string;
  accentClassName: string;
  headerClassName: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  const [showAll, setShowAll] = useState(false);
  const shouldFocusNewItemRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const hasHiddenItems = items.length > visibleItemsLimit;
  const visibleItems = showAll ? items : items.slice(0, visibleItemsLimit);

  useEffect(() => {
    if (!shouldFocusNewItemRef.current) {
      return;
    }

    shouldFocusNewItemRef.current = false;
    const listItems = listRef.current?.querySelectorAll<HTMLElement>(
      "[data-admin-list-item]",
    );
    const lastItem = listItems?.[listItems.length - 1];
    const firstField = lastItem?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea",
    );

    firstField?.focus();
    firstField?.select();
  }, [items.length, showAll]);

  return (
    <Card className={`border-l-4 bg-background shadow-sm ${accentClassName}`}>
      <CardHeader className={`border-b py-5 ${headerClassName}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setShowAll(true);
              shouldFocusNewItemRef.current = true;
              onAdd();
            }}
          >
            {addLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={listRef} className="space-y-4">
          {visibleItems.map((item, index) => (
            <div key={index} data-admin-list-item>
              {item}
            </div>
          ))}
        </div>
        {hasHiddenItems ? (
          <Button
            className="mt-4"
            variant="outline"
            size="sm"
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? showLessLabel : showAllLabel}
          </Button>
        ) : null}
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
