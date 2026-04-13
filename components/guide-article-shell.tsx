import Link from "next/link";

export function GuideArticleShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14" role="main">
      <nav className="text-muted-foreground mb-8 text-sm" aria-label="이동 경로">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground underline-offset-4 hover:underline">
              홈
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/guide" className="hover:text-foreground underline-offset-4 hover:underline">
              가이드
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{title}</li>
        </ol>
      </nav>
      <article>
        <header className="border-primary border-l-4 pl-4 sm:pl-5">
          <h1 className="text-foreground text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">게시·수정: {updated}</p>
        </header>
        <div className="mt-10 space-y-8 text-sm leading-relaxed sm:text-base">{children}</div>
      </article>
    </main>
  );
}
