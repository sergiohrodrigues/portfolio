ALTER TABLE "portfolio_read_books"
ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'pt';

ALTER TABLE "portfolio_reading_books"
ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'pt';

ALTER TABLE "portfolio_languages"
ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'pt';

CREATE INDEX "portfolio_read_books_locale_idx" ON "portfolio_read_books"("locale");
CREATE INDEX "portfolio_reading_books_locale_idx" ON "portfolio_reading_books"("locale");
CREATE INDEX "portfolio_languages_locale_idx" ON "portfolio_languages"("locale");
