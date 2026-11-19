import Link from "next/link";

export function InquiryBreadcrumb({
  current,
  includeListLink = false,
}: {
  current: string;
  includeListLink?: boolean;
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
        {current === "문의" ? (
          <li className="text-foreground">문의</li>
        ) : (
          <li>
            <Link href="/inquiry" className="hover:text-foreground underline-offset-4 hover:underline">
              문의
            </Link>
          </li>
        )}
        {includeListLink ? (
          <>
            <li aria-hidden>/</li>
            <li>
              <Link href="/inquiry/board" className="hover:text-foreground underline-offset-4 hover:underline">
                접수 목록
              </Link>
            </li>
          </>
        ) : null}
        {current === "문의" ? null : (
          <>
            <li aria-hidden>/</li>
            <li className="text-foreground">{current}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
