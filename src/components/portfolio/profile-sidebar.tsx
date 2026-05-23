"use client";

import { Download, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siGmail, siWhatsapp } from "simple-icons";
import { SocialIcon } from "@/components/portfolio/social-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Profile } from "@/lib/portfolio";

type Props = {
  data: Profile;
  isDarkMode: boolean;
  locale: Locale;
  onToggleTheme: () => void;
};

export function ProfileSidebar({
  data,
  isDarkMode,
  locale,
  onToggleTheme,
}: Props) {
  function downloadPDF() {
    // URL do seu arquivo PDF
    const url =
      "https://drive.google.com/file/d/1OO6US-RKPmVK4KonPXc-AIDyNBjSij7b/view?usp=sharing";

    // Cria um link temporário
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";        // abre em nova aba
    link.rel = "noopener noreferrer"; // boa prática de segurança

    // Adiciona o atributo 'download' para forçar o download
    link.download = "sergio_curriculo.pdf";

    // Adiciona o link ao DOM e simula o clique nele
    document.body.appendChild(link);
    link.click();

    // Remove o link do DOM
    document.body.removeChild(link);
  }

  return (
    <aside className="flex flex-col items-center gap-6 self-start border border-slate-200 bg-white/90 px-6 py-10 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-[#0d1117]/90 lg:self-center">
      <div className="relative size-[130px] overflow-hidden rounded-full border-[3px] border-cyan-400 shadow-[0_0_0_6px_rgba(0,212,255,0.08)]">
        <Image
          src="/perfil.png"
          alt={data.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
          {data.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {data.role}
        </p>
      </div>

      <div className="flex gap-2">
        <SocialIcon href={data.linkedin} label="LinkedIn">
          <svg viewBox="0 0 448 512" aria-hidden>
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </SocialIcon>
        <SocialIcon href={data.github} label="GitHub">
          <svg viewBox="0 0 496 512" aria-hidden>
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-2.3-3-3.6-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
          </svg>
        </SocialIcon>
        <SocialIcon href={`mailto:${data.email}`} label="Email">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={siGmail.path} />
          </svg>
        </SocialIcon>
        <SocialIcon href={data.whatsapp} label="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={siWhatsapp.path} />
          </svg>
        </SocialIcon>
      </div>

      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-center gap-2 border-slate-300 bg-transparent text-xs uppercase tracking-widest text-slate-800 hover:bg-slate-950 hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-slate-950",
        )}
        onClick={downloadPDF}
      >
        <Download className="size-4" aria-hidden />
        Baixar Curriculo
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
          aria-pressed={isDarkMode}
          onClick={onToggleTheme}
          className={cn(
            "relative flex h-7 w-12 items-center rounded-full border border-slate-300 bg-slate-200 px-1 text-slate-600 transition-colors dark:border-white/10 dark:bg-slate-700 dark:text-slate-200",
            isDarkMode ? "justify-end" : "justify-start",
          )}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform dark:bg-slate-400">
            {isDarkMode ? (
              <Moon className="size-3 text-slate-900" aria-hidden />
            ) : (
              <Sun className="size-3 text-amber-500" aria-hidden />
            )}
          </span>
        </button>
      </div>

      <div className="flex gap-3">
        <Link href="/?lang=pt" title="Portugues">
          <Image
            src="https://flagcdn.com/w40/br.png"
            alt="Portugues"
            width={28}
            height={20}
            className={cn(
              "rounded-sm transition-opacity",
              locale === "pt" ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
          />
        </Link>
        <Link href="/?lang=en" title="English">
          <Image
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            width={28}
            height={20}
            className={cn(
              "rounded-sm transition-opacity",
              locale === "en" ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
          />
        </Link>
      </div>
    </aside>
  );
}
