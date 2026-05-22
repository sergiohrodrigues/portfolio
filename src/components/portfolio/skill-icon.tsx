import type { Skill } from "@/lib/portfolio";

type Props = {
  skill: Skill;
};

const skillIconClasses: Record<string, string> = {
  angular: "devicon-angular-plain colored",
  angularjs: "devicon-angularjs-plain colored",
  bootstrap: "devicon-bootstrap-plain colored",
  "c#": "devicon-csharp-plain colored",
  csharp: "devicon-csharp-plain colored",
  ".net": "devicon-dot-net-plain colored",
  dotnet: "devicon-dot-net-plain colored",
  git: "devicon-git-plain colored",
  javascript: "devicon-javascript-plain colored",
  js: "devicon-javascript-plain colored",
  mysql: "devicon-mysql-plain colored",
  "next.js": "devicon-nextjs-plain colored",
  nextjs: "devicon-nextjs-plain colored",
  "node.js": "devicon-nodejs-plain colored",
  nodejs: "devicon-nodejs-plain colored",
  nuxt: "devicon-nuxt-plain colored",
  postgresql: "devicon-postgresql-plain colored",
  postgres: "devicon-postgresql-plain colored",
  prisma: "devicon-prisma-original colored",
  react: "devicon-react-original colored",
  reactjs: "devicon-react-original colored",
  "sql / prisma": "devicon-prisma-original colored",
  sqlite: "devicon-sqlite-plain colored",
  supabase: "devicon-supabase-plain colored",
  tailwind: "devicon-tailwindcss-original colored",
  "tailwind css": "devicon-tailwindcss-original colored",
  tailwindcss: "devicon-tailwindcss-original colored",
  typescript: "devicon-typescript-plain colored",
  ts: "devicon-typescript-plain colored",
  vuejs: "devicon-vuejs-plain colored",
  sqlserver: "devicon-microsoftsqlserver-plain colored",
  azure: "devicon-azure-plain colored",
  docker: "devicon-docker-plain colored",
  github: "devicon-github-original colored",
  grafana: "devicon-grafana-plain colored",
  quasar: "devicon-quasar-plain colored",
};

export function SkillIcon({ skill }: Props) {
  const iconClassName = getSkillIconClassName(skill.name);

  return (
    <div className="group flex flex-col items-center gap-1.5">
      {iconClassName ? (
        <i
          aria-hidden
          className={`${iconClassName} text-5xl leading-none transition-transform group-hover:-translate-y-1`}
        />
      ) : (
        <div className="flex size-12 items-center justify-center rounded-md border border-slate-200 bg-white/70 text-sm font-bold uppercase text-slate-700 transition-transform group-hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {getFallbackLabel(skill.name)}
        </div>
      )}
      <span className="text-center text-[11px] text-slate-600 dark:text-slate-500">
        {skill.name}
      </span>
    </div>
  );
}

function getSkillIconClassName(name: string) {
  const normalizedName = name.toLowerCase().trim();

  return (
    skillIconClasses[normalizedName] ??
    skillIconClasses[normalizedName.replace(/\s+/g, "")]
  );
}

function getFallbackLabel(name: string) {
  return name
    .split(/\s+|\/|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}
