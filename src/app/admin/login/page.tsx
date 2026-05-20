import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  adminCookieName,
  createAdminToken,
  isValidAdminPassword,
  isValidAdminToken,
} from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { labels, normalizeLocale } from "@/lib/i18n";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; lang?: string }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const t = labels[locale];
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;

  if (isValidAdminToken(token)) {
    redirect(`/admin?lang=${locale}`);
  }

  async function login(formData: FormData) {
    "use server";

    const password = String(formData.get("password") ?? "");

    if (!isValidAdminPassword(password)) {
      redirect(`/admin/login?lang=${locale}&error=1`);
    }

    const cookieStore = await cookies();
    cookieStore.set(adminCookieName, createAdminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect(`/admin?lang=${locale}`);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardDescription className="font-semibold uppercase tracking-[0.22em] text-primary">
            {t.admin}
          </CardDescription>
          <CardTitle className="text-2xl">{t.loginTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input autoFocus id="password" name="password" type="password" />
            </div>
            {params.error ? (
              <p className="text-sm font-medium text-destructive">
                {t.invalidPassword}
              </p>
            ) : null}
            <Button className="w-full" type="submit">
              {t.enter}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
