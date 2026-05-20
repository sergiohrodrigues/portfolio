import { PortfolioView } from "@/components/portfolio-view";
import { normalizeLocale } from "@/lib/i18n";
import { readPortfolio } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const data = await readPortfolio(locale);
  return <PortfolioView data={data} locale={locale} />;
}
