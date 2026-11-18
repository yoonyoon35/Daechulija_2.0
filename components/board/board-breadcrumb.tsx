import Link from "next/link";

export function BoardBreadcrumb({
  current,
  includeBoardLink = false,
}: {
  current: string;
  includeBoardLink?: boolean;
}) {
  return (
    <nav className="text-muted-foreground mb-8 text-sm" aria-label="이동 경로">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-foreground underline-offset-4 hover:underline">
            홈
          </Link>
        </li>
        <li aria-hidden>/</li>
        {includeBoardLink ? (
          <>
            <li>
              <Link href="/board" className="hover:text-foreground underline-offset-4 hover:underline">
                게시판
              </Link>
            </li>
            <li aria-hidden>/</li>
          </>
        ) : null}
        <li className="text-foreground">{current}</li>
      </ol>
    </nav>
  );
}
