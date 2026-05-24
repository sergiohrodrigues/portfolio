import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
};

export function ProjectLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "gap-1.5 border border-slate-300 bg-transparent text-xs text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10",
      )}
    >
      {label}
      <ExternalLink className="size-3" aria-hidden />
    </Link>
  );
}
