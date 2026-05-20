import { promises as fs } from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n";
import { getPrisma } from "@/lib/prisma";

export type Profile = {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
};

export type About = {
  headline: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string;
  link: string;
  repo: string;
  featured: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

export type PortfolioData = {
  profile: Profile;
  about: About;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
};

const dataFile = path.join(process.cwd(), "data", "portfolio.json");

export const defaultPortfolio: PortfolioData = {
  profile: {
    name: "Sergio Rodrigues",
    role: "Desenvolvedor Full Stack",
    location: "Brasil",
    avatarUrl: "/profile.svg",
    summary:
      "Crio aplicacoes web completas, APIs e paineis administrativos com foco em clareza, performance e manutencao.",
    email: "sergio@email.com",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    whatsapp: "https://wa.me/5500000000000",
  },
  about: {
    headline: "Transformo regras de negocio em produtos digitais objetivos.",
    description:
      "Tenho experiencia com aplicacoes web, integracoes, bancos de dados e interfaces administrativas. Gosto de construir sistemas que sejam simples de usar, faceis de evoluir e preparados para producao.",
  },
  skills: [
    { id: "nextjs", name: "Next.js", category: "Frontend", level: 92 },
    { id: "react", name: "React", category: "Frontend", level: 90 },
    { id: "node", name: "Node.js", category: "Backend", level: 86 },
    { id: "typescript", name: "TypeScript", category: "Base", level: 88 },
    { id: "database", name: "SQL / Prisma", category: "Dados", level: 82 },
  ],
  projects: [
    {
      id: "ecommerce",
      title: "E-commerce Administrativo",
      description:
        "Loja com catalogo, pedidos, gestao de produtos e fluxo de administracao.",
      stack: "Next.js, TypeScript, Prisma",
      link: "#",
      repo: "#",
      featured: true,
    },
    {
      id: "financeiro",
      title: "Controle Financeiro",
      description:
        "Dashboard para organizar despesas, receitas, categorias e visao mensal.",
      stack: "Next.js, Supabase, Tailwind",
      link: "#",
      repo: "#",
      featured: false,
    },
  ],
  experiences: [
    {
      id: "fullstack",
      role: "Desenvolvedor Full Stack",
      company: "Projetos proprios e clientes",
      period: "2024 - Atual",
      description:
        "Construcao de sistemas web, APIs, dashboards e rotinas de persistencia para produtos digitais.",
    },
  ],
};

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export async function readPortfolio(locale: Locale = "pt"): Promise<PortfolioData> {
  if (!hasDatabaseUrl()) {
    return readLocalPortfolio();
  }

  const prisma = getPrisma();
  const profileId = singletonId("profile", locale);
  const aboutId = singletonId("about", locale);
  const [
    profileById,
    aboutById,
    profileByLocale,
    aboutByLocale,
    skills,
    projects,
    experiences,
  ] = await Promise.all([
    prisma.portfolioProfile.findUnique({ where: { id: profileId } }),
    prisma.portfolioAbout.findUnique({ where: { id: aboutId } }),
    prisma.portfolioProfile.findFirst({ where: { locale } }),
    prisma.portfolioAbout.findFirst({ where: { locale } }),
    prisma.portfolioSkill.findMany({
      where: { locale },
      orderBy: { createdAt: "asc" },
    }),
    prisma.portfolioProject.findMany({
      where: { locale },
      orderBy: { createdAt: "asc" },
    }),
    prisma.portfolioExperience.findMany({
      where: { locale },
      orderBy: { createdAt: "asc" },
    }),
  ]);
  const profile = profileById ?? profileByLocale;
  const about = aboutById ?? aboutByLocale;

  if (!profile && !about) {
    await writePortfolio(defaultPortfolio, locale);
    return defaultPortfolio;
  }

  return {
    profile: profile ? profileFromRow(profile) : defaultPortfolio.profile,
    about: about ? aboutFromRow(about) : defaultPortfolio.about,
    skills: skills.length > 0 ? skills : defaultPortfolio.skills,
    projects: projects.length > 0 ? projects : defaultPortfolio.projects,
    experiences:
      experiences.length > 0 ? experiences : defaultPortfolio.experiences,
  };
}

export async function writePortfolio(data: PortfolioData, locale: Locale = "pt") {
  if (!hasDatabaseUrl()) {
    await writeLocalPortfolio(data);
    return;
  }

  const prisma = getPrisma();
  const profileId = singletonId("profile", locale);
  const aboutId = singletonId("about", locale);
  await prisma.$transaction([
    prisma.portfolioProfile.upsert({
      where: { id: profileId },
      update: data.profile,
      create: { id: profileId, locale, ...data.profile },
    }),
    prisma.portfolioAbout.upsert({
      where: { id: aboutId },
      update: data.about,
      create: { id: aboutId, locale, ...data.about },
    }),
    prisma.portfolioSkill.deleteMany({ where: { locale } }),
    prisma.portfolioProject.deleteMany({ where: { locale } }),
    prisma.portfolioExperience.deleteMany({ where: { locale } }),
    prisma.portfolioSkill.createMany({
      data: data.skills.map((skill) => ({
        ...skill,
        id: scopedId(locale, skill.id),
        locale,
      })),
    }),
    prisma.portfolioProject.createMany({
      data: data.projects.map((project) => ({
        ...project,
        id: scopedId(locale, project.id),
        locale,
      })),
    }),
    prisma.portfolioExperience.createMany({
      data: data.experiences.map((experience) => ({
        ...experience,
        id: scopedId(locale, experience.id),
        locale,
      })),
    }),
  ]);
}

async function readLocalPortfolio(): Promise<PortfolioData> {
  try {
    const file = await fs.readFile(dataFile, "utf8");
    return { ...defaultPortfolio, ...JSON.parse(file) };
  } catch {
    await writeLocalPortfolio(defaultPortfolio);
    return defaultPortfolio;
  }
}

async function writeLocalPortfolio(data: PortfolioData) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
}

function singletonId(type: "profile" | "about", locale: Locale) {
  return `${type}-${locale}`;
}

function scopedId(locale: Locale, id: string) {
  return id.startsWith(`${locale}-`) ? id : `${locale}-${id}`;
}

function profileFromRow(row: Profile & { id: string; locale: string }): Profile {
  return {
    name: row.name,
    role: row.role,
    location: row.location,
    avatarUrl: row.avatarUrl,
    summary: row.summary,
    email: row.email,
    github: row.github,
    linkedin: row.linkedin,
    whatsapp: row.whatsapp,
  };
}

function aboutFromRow(row: About & { id: string; locale: string }): About {
  return {
    headline: row.headline,
    description: row.description,
  };
}
