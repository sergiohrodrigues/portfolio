import { SectionHeading } from "@/components/portfolio/section-heading";
import type { Book } from "@/lib/portfolio";

type Props = {
  readBooks: Book[];
  readingBooks: Book[];
  title: string;
  readTitle: string;
  readingTitle: string;
};

export function BooksSection({
  readBooks,
  readingBooks,
  title,
  readTitle,
  readingTitle,
}: Props) {
  if (readBooks.length === 0 && readingBooks.length === 0) {
    return null;
  }

  return (
    <section id="livros" className="scroll-mt-24">
      <SectionHeading title={title} />
      <div className="mt-6 space-y-7">
        <BookShelf books={readingBooks} title={readingTitle} />
        <BookShelf books={readBooks} title={readTitle} />
      </div>
    </section>
  );
}

function BookShelf({ books, title }: { books: Book[]; title: string }) {
  if (books.length === 0) {
    return null;
  }

  return (
    <div className="w-fit">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <div className="flex w-fit flex-wrap gap-5">
        {books.map((book) => (
          <figure key={book.id} className="group w-24">
            <div className="aspect-[2/3] overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-transform group-hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.imageUrl}
                alt={book.name}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2 text-center text-[11px] leading-4 text-slate-600 dark:text-slate-500">
              {book.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
