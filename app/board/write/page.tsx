import type { Metadata } from "next";
import { BoardBreadcrumb } from "@/components/board/board-breadcrumb";
import { BoardWriteForm } from "@/components/board/board-write-form";
import { SITE_URL } from "@/lib/site";

const pageTitle = "글쓰기";
const description = "게시판에 올릴 제목, 내용, 첨부파일을 입력합니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/board/write` },
  openGraph: {
    url: `${SITE_URL}/board/write`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function BoardWritePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14" role="main">
      <BoardBreadcrumb current={pageTitle} includeBoardLink />
      <header className="border-primary border-l-4 pl-4 sm:pl-5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p>
      </header>
      <div className="mt-8">
        <BoardWriteForm />
      </div>
    </main>
  );
}
