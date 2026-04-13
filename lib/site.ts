export const SITE_URL = "https://daechulija.com" as const;

/**
 * Facebook 공유 등 외부 서비스는 localhost URL을 받지 못해 링크 입력란이 비는 경우가 많습니다.
 * 배포 도메인(SITE_URL 또는 NEXT_PUBLIC_SITE_URL) + 현재 경로·쿼리로 공유용 절대 URL을 만듭니다.
 */
export function getPublicSharePageUrl(): string {
  const envBase =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : SITE_URL;
  const base = envBase.replace(/\/$/, "");
  if (typeof window === "undefined") return `${base}/`;
  return `${base}${window.location.pathname}${window.location.search}`;
}

export const defaultTitle = "대출 이자 계산기 - Daechulija.com";

/** SNS 공유 등 본문 요약 */
export const defaultShareText = "대출 받기 전 미리 이자 계산해보세요.";

/** 푸터·히어로 등에 쓰는 참고 안내 한 줄 */
export const referenceDisclaimerLine =
  "본 서비스는 표준 계산식 기반 참고용이며, 실제 조건은 금융기관에 문의하시기 바랍니다.";

export const defaultDescription =
  "대출 이자 계산기 - 원리금균등상환, 원금균등상환, 만기일시상환 계산. 주택담보대출, 신용대출, 전세자금대출 이자 계산";

export const ogImagePath = "/favicon/apple-touch-icon-152x152.png";
