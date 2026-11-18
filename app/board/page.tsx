import type { Metadata } from "next";
import { BoardBreadcrumb } from "@/components/board/board-breadcrumb";
import { BoardList } from "@/components/board/board-list";
import { SITE_URL } from "@/lib/site";

const pageTitle = "게시판";
const description = "대출·세금·중개보수 계산기를 쓰다가 생긴 질문을 남기는 게시판입니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/board` },
  openGraph: {
    url: `${SITE_URL}/board`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function BoardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14" role="main">
      <BoardBreadcrumb current={pageTitle} />
      <header className="border-primary border-l-4 pl-4 sm:pl-5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p>
      </header>
      <div className="mt-8">
        <BoardList />
      </div>
    </main>
  );
}
