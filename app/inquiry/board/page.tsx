import type { Metadata } from "next";
import { InquiryBreadcrumb } from "@/components/inquiry/inquiry-breadcrumb";
import { InquiryList } from "@/components/inquiry/inquiry-list";
import { SITE_URL } from "@/lib/site";

const pageTitle = "문의 접수 목록";
const description = "접수한 문의를 확인하는 목록입니다. 연습 중이라 로그인 없이 열려 있습니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/inquiry/board` },
  openGraph: {
    url: `${SITE_URL}/inquiry/board`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function InquiryBoardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14" role="main">
      <InquiryBreadcrumb current="접수 목록" />
      <header className="border-primary border-l-4 pl-4 sm:pl-5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p>
      </header>
      <div className="mt-8">
        <InquiryList />
      </div>
    </main>
  );
}
