export const adminCookieName = "portfolio_admin";

export function getAuthSecret() {
  return process.env.AUTH_SECRET ?? "dev-auth-secret";
}

export function createAdminToken() {
  return getAuthSecret();
}

export function isValidAdminToken(token?: string) {
  return Boolean(token) && token === getAuthSecret();
}

export function isValidAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return process.env.NODE_ENV === "development" && password === "admin";
  }

  return password === adminPassword;
}
