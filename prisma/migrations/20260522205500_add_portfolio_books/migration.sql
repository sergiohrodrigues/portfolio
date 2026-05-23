CREATE TABLE "portfolio_read_books" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "portfolio_read_books_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "portfolio_reading_books" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "portfolio_reading_books_pkey" PRIMARY KEY ("id")
);
