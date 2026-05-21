import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  children: ReactNode;
};

export function SocialIcon({ href, label, children }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-cyan-500/50 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300 [&_svg]:size-4 [&_svg]:fill-current"
    >
      {children}
    </Link>
  );
}
