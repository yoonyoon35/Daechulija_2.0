import type { Metadata } from "next";
import { Suspense } from "react";
import { BoardPostLoader } from "@/components/board/board-post-loader";
import { SITE_URL } from "@/lib/site";

const pageTitle = "글 보기";
const description = "게시판에 등록된 글을 봅니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/board/post` },
  openGraph: {
    url: `${SITE_URL}/board/post`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function BoardPostPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <p className="text-muted-foreground text-sm">글을 불러오는 중입니다.</p>
        </main>
      }
    >
      <BoardPostLoader />
    </Suspense>
  );
}
