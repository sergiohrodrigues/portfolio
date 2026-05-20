import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });
config({ path: ".env" });

const isGenerateCommand = process.argv.includes("generate");
const databaseUrl =
  process.env.DATABASE_URL ??
  (isGenerateCommand
    ? "postgresql://user:password@localhost:5432/database"
    : undefined);

if (!databaseUrl) {
  throw new Error("DATABASE_URL nao foi encontrada. Configure em .env.local.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
