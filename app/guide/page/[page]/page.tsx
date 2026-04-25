import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideIndexContent, getGuideTotalPages } from "@/app/guide/page";
import { SITE_URL } from "@/lib/site";

type GuidePageParams = {
  page: string;
};

function parsePageParam(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 2) return 0;
  return parsed;
}

export function generateStaticParams(): GuidePageParams[] {
  const totalPages = getGuideTotalPages();

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<GuidePageParams>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = parsePageParam(page);
  const totalPages = getGuideTotalPages();

  if (pageNumber === 0 || pageNumber > totalPages) {
    return {};
  }

  const pageTitle = `대출·금융 가이드 ${pageNumber}페이지`;
  const canonicalPath = `/guide/page/${pageNumber}`;
  const description = `대출·금융 가이드 목록 ${pageNumber}페이지입니다.`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    openGraph: {
      url: `${SITE_URL}${canonicalPath}`,
      title: `${pageTitle} | Daechulija.com`,
      description,
    },
  };
}

export default async function GuidePaginatedIndexPage({
  params,
}: {
  params: Promise<GuidePageParams>;
}) {
  const { page } = await params;
  const pageNumber = parsePageParam(page);
  const totalPages = getGuideTotalPages();

  if (pageNumber === 0 || pageNumber > totalPages) {
    notFound();
  }

  return <GuideIndexContent initialPage={pageNumber} />;
}
