import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, isValidAdminToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(adminCookieName)?.value;
  const isAuthenticated = isValidAdminToken(token);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/api/portfolio" && request.method !== "GET") {
    if (!isAuthenticated) {
      return NextResponse.json(
        { ok: false, error: "Nao autorizado." },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/portfolio"],
};
