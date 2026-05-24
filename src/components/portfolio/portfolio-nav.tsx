"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { labels } from "@/lib/i18n";

type PortfolioLabels = (typeof labels)[keyof typeof labels];

type Props = {
  labels: PortfolioLabels;
};

export function PortfolioNav({ labels: t }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { href: "#sobre", label: t.about },
    { href: "#habilidades", label: t.skills },
    { href: "#projetos", label: t.projects },
    { href: "#experiencia", label: t.experience },
    { href: "#estudando", label: t.studying },
    // { href: "#idiomas", label: t.languages },
    // { href: "#livros", label: t.books },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-[#0a0e1a]/85">
      <div className="mx-auto flex h-[52px] w-full max-w-[1500px] items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-widest text-slate-700 transition-colors hover:text-cyan-700 dark:text-white/80 dark:hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-slate-200 bg-white/70 text-slate-800 transition-colors hover:border-cyan-500/50 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300 md:hidden"
        >
          {isOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#0a0e1a]/95 md:hidden">
          <div className="mx-auto grid w-full max-w-[1500px] gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-widest text-slate-700 transition-colors hover:bg-slate-100 hover:text-cyan-700 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
