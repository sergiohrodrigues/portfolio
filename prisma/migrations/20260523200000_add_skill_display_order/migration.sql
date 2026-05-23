ALTER TABLE "portfolio_skills"
ADD COLUMN "display_order" INTEGER NOT NULL DEFAULT 0;

WITH ordered_skills AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (ORDER BY "created_at" ASC, "id" ASC) AS "position"
  FROM "portfolio_skills"
)
UPDATE "portfolio_skills"
SET "display_order" = ordered_skills."position"
FROM ordered_skills
WHERE "portfolio_skills"."id" = ordered_skills."id";
