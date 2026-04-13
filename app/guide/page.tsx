import type { Metadata } from "next";
import Link from "next/link";
import { guideArticles } from "@/lib/guide/registry";
import { SITE_URL } from "@/lib/site";

const pageTitle = "대출·금융 가이드";

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "DSR, 주택담보대출 한도 등 대출·금융을 이해하는 데 도움이 되는 참고 글을 모았습니다. 실제 조건은 금융기관에 문의하세요.";
  return {
    title: pageTitle,
    description,
    alternates: { canonical: `${SITE_URL}/guide` },
    openGraph: {
      url: `${SITE_URL}/guide`,
      title: `${pageTitle} | Daechulija.com`,
      description,
    },
  };
}

export default function GuideIndexPage() {
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
          <li className="text-foreground">{pageTitle}</li>
        </ol>
      </nav>
      <header className="border-primary border-l-4 pl-4 sm:pl-5">
        <h1 className="text-foreground text-balance text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          참고용 설명 글입니다. 약관·개인정보 처리 방침과 달리 법적 효력을 주장하지 않으며, 실제 심사 결과와 다를 수 있습니다.
        </p>
      </header>
      <ul className="mt-10 space-y-6">
        {guideArticles.map((article) => (
          <li key={article.slug}>
            <article className="rounded-lg border border-border p-4 sm:p-5">
              <h2 className="text-lg font-semibold tracking-tight">
                <Link
                  href={`/guide/${article.slug}`}
                  className="text-primary hover:text-primary/90 underline-offset-4 hover:underline"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{article.description}</p>
              <p className="text-muted-foreground mt-2 text-xs">게시·수정: {article.updated}</p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
