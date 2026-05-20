import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPortfolioClient } from "@/components/admin-portfolio-client";
import { adminCookieName, isValidAdminToken } from "@/lib/auth";
import { normalizeLocale } from "@/lib/i18n";
import { readPortfolio } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;

  if (!isValidAdminToken(token)) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const data = await readPortfolio(locale);
  return <AdminPortfolioClient initialData={data} locale={locale} />;
}
