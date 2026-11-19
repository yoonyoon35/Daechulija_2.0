import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryPostLoader } from "@/components/inquiry/inquiry-post-loader";
import { SITE_URL } from "@/lib/site";

const pageTitle = "문의 보기";
const description = "접수한 문의 내용을 봅니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/inquiry/post` },
  openGraph: {
    url: `${SITE_URL}/inquiry/post`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function InquiryPostPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <p className="text-muted-foreground text-sm">문의를 불러오는 중입니다.</p>
        </main>
      }
    >
      <InquiryPostLoader />
    </Suspense>
  );
}
