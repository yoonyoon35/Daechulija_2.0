import type { Metadata } from "next";
import Link from "next/link";
import { AcquisitionTaxCalculatorSection } from "@/components/acquisition-tax-calculator-section";
import { SITE_URL } from "@/lib/site";

const pageTitle = "주택 취득세 계산기";
const pageDescription =
  "주택 수, 조정대상지역 여부, 전용면적 85m2 초과 여부에 따라 취득세·지방교육세·농어촌특별세를 계산합니다.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: `${SITE_URL}/acquisition-tax-calculator` },
    openGraph: {
      url: `${SITE_URL}/acquisition-tax-calculator`,
      title: `${pageTitle} | Daechulija.com`,
      description: pageDescription,
    },
  };
}

export default function AcquisitionTaxCalculatorPage() {
  return (
    <main role="main">
      <section className="from-primary/10 via-background to-background border-b bg-gradient-to-b py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="text-muted-foreground mb-6 text-sm" aria-label="이동 경로">
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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{pageTitle}</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
            오해를 줄이기 위해 주택 수·지역 구분·면적 조건을 명확히 분리한 기준표를 하단에 함께 제공합니다. 계산 결과는 참고용이며 실제 신고
            세액은 관할 지자체 및 세무전문가 확인이 필요합니다.
          </p>
        </div>
      </section>

      <AcquisitionTaxCalculatorSection />
    </main>
  );
}
