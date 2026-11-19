import type { Metadata } from "next";
import { InquiryBreadcrumb } from "@/components/inquiry/inquiry-breadcrumb";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { SITE_URL } from "@/lib/site";

const pageTitle = "문의";
const description = "이름, 연락처, 문의 내용을 남기면 접수 목록에서 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/inquiry` },
  openGraph: {
    url: `${SITE_URL}/inquiry`,
    title: `${pageTitle} | Daechulija.com`,
    description,
  },
};

export default function InquiryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14" role="main">
      <InquiryBreadcrumb current={pageTitle} />
      <header className="border-primary border-l-4 pl-4 sm:pl-5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p>
      </header>
      <div className="mt-8">
        <InquiryForm />
      </div>
    </main>
  );
}
