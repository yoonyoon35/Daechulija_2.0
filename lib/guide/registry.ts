import type { ComponentType } from "react";
import { Dsr40MortgageLimitBody, dsr40MortgageLimitMeta } from "@/lib/guide/articles/dsr-40-mortgage-limit";
import { BogeumjariVsDidimdolBody, bogeumjariVsDidimdolMeta } from "@/lib/guide/articles/bogeumjari-vs-didimdol";
import { MortgageRateStatus2026Body, mortgageRateStatus2026Meta } from "@/lib/guide/articles/mortgage-rate-status-2026";
import {
  FirstTimeHomebuyerBenefits2026Body,
  firstTimeHomebuyerBenefits2026Meta,
} from "@/lib/guide/articles/first-time-homebuyer-benefits-2026";
import {
  EqualPaymentVsEqualPrincipalBody,
  equalPaymentVsEqualPrincipalMeta,
} from "@/lib/guide/articles/equal-payment-vs-equal-principal";
import { PrepaymentFeeCalculationBody, prepaymentFeeCalculationMeta } from "@/lib/guide/articles/prepayment-fee-calculation";
import { VariableVsFixedRate2026Body, variableVsFixedRate2026Meta } from "@/lib/guide/articles/variable-vs-fixed-rate-2026";
import {
  AnnualSalaryMortgageLimitDsrBody,
  annualSalaryMortgageLimitDsrMeta,
} from "@/lib/guide/articles/annual-salary-mortgage-limit-dsr";
import { LtvDtiDsrComparisonBody, ltvDtiDsrComparisonMeta } from "@/lib/guide/articles/ltv-dti-dsr-comparison";
import { StressDsrExplainedBody, stressDsrExplainedMeta } from "@/lib/guide/articles/stress-dsr-explained";
import { DsrCalculationMethodBody, dsrCalculationMethodMeta } from "@/lib/guide/articles/dsr-calculation-method";
import { JeonseLoanTypesComparisonBody, jeonseLoanTypesComparisonMeta } from "@/lib/guide/articles/jeonse-loan-types-comparison";
import { RateReductionRequestRightBody, rateReductionRequestRightMeta } from "@/lib/guide/articles/rate-reduction-request-right";
import { CreditLoanVsMortgageLoanBody, creditLoanVsMortgageLoanMeta } from "@/lib/guide/articles/credit-loan-vs-mortgage-loan";
import {
  MortgageLoanApplicationDocumentsBody,
  mortgageLoanApplicationDocumentsMeta,
} from "@/lib/guide/articles/mortgage-loan-application-documents";
import { GracePeriodExplainedBody, gracePeriodExplainedMeta } from "@/lib/guide/articles/grace-period-explained";
import { LoanRefinancingGuideBody, loanRefinancingGuideMeta } from "@/lib/guide/articles/loan-refinancing-guide";
import {
  CreditScoreLoanRateGuideBody,
  creditScoreLoanRateGuideMeta,
} from "@/lib/guide/articles/credit-score-loan-rate-guide";

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  Body: ComponentType;
};

/**
 * 가이드 글을 추가할 때: articles 폴더에 본문 컴포넌트·메타를 만들고, 아래 배열에 한 줄 등록하세요.
 * 슬러그·사이트맵·/guide 목록이 모두 이 배열에서 파생됩니다.
 */
export const guideArticles: readonly GuideArticle[] = [
  {
    ...dsr40MortgageLimitMeta,
    Body: Dsr40MortgageLimitBody,
  },
  {
    ...bogeumjariVsDidimdolMeta,
    Body: BogeumjariVsDidimdolBody,
  },
  {
    ...mortgageRateStatus2026Meta,
    Body: MortgageRateStatus2026Body,
  },
  {
    ...firstTimeHomebuyerBenefits2026Meta,
    Body: FirstTimeHomebuyerBenefits2026Body,
  },
  {
    ...equalPaymentVsEqualPrincipalMeta,
    Body: EqualPaymentVsEqualPrincipalBody,
  },
  {
    ...prepaymentFeeCalculationMeta,
    Body: PrepaymentFeeCalculationBody,
  },
  {
    ...variableVsFixedRate2026Meta,
    Body: VariableVsFixedRate2026Body,
  },
  {
    ...annualSalaryMortgageLimitDsrMeta,
    Body: AnnualSalaryMortgageLimitDsrBody,
  },
  {
    ...ltvDtiDsrComparisonMeta,
    Body: LtvDtiDsrComparisonBody,
  },
  {
    ...stressDsrExplainedMeta,
    Body: StressDsrExplainedBody,
  },
  {
    ...dsrCalculationMethodMeta,
    Body: DsrCalculationMethodBody,
  },
  {
    ...jeonseLoanTypesComparisonMeta,
    Body: JeonseLoanTypesComparisonBody,
  },
  {
    ...rateReductionRequestRightMeta,
    Body: RateReductionRequestRightBody,
  },
  {
    ...creditLoanVsMortgageLoanMeta,
    Body: CreditLoanVsMortgageLoanBody,
  },
  {
    ...mortgageLoanApplicationDocumentsMeta,
    Body: MortgageLoanApplicationDocumentsBody,
  },
  {
    ...gracePeriodExplainedMeta,
    Body: GracePeriodExplainedBody,
  },
  {
    ...loanRefinancingGuideMeta,
    Body: LoanRefinancingGuideBody,
  },
  {
    ...creditScoreLoanRateGuideMeta,
    Body: CreditScoreLoanRateGuideBody,
  },
];

const bySlug = new Map(guideArticles.map((a) => [a.slug, a]));

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return bySlug.get(slug);
}

export function getAllGuideSlugs(): string[] {
  return guideArticles.map((a) => a.slug);
}
