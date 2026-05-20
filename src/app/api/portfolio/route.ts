import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminCookieName, isValidAdminToken } from "@/lib/auth";
import { normalizeLocale } from "@/lib/i18n";
import { readPortfolio, writePortfolio, type PortfolioData } from "@/lib/portfolio";

export async function GET(request: Request) {
  const locale = normalizeLocale(new URL(request.url).searchParams.get("lang"));
  const data = await readPortfolio(locale);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(adminCookieName)?.value;

    if (!isValidAdminToken(token)) {
      return NextResponse.json(
        { ok: false, error: "Nao autorizado." },
        { status: 401 },
      );
    }

    const locale = normalizeLocale(new URL(request.url).searchParams.get("lang"));
    const data = (await request.json()) as PortfolioData;
    await writePortfolio(data, locale);
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar o portfolio.",
      },
      { status: 500 },
    );
  }
}
