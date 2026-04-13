import { ogImagePath, SITE_URL } from "@/lib/site";

/**
 * 카카오톡 공유 (피드 템플릿). SDK 로드·초기화 후에만 동작합니다.
 * @returns 공유 요청을 열었으면 true, 그렇지 않으면 false
 */
export function sendKakaoFeedShare(options: {
  pageUrl: string;
  title: string;
  description: string;
}): boolean {
  if (typeof window === "undefined") return false;
  const Kakao = window.Kakao;
  if (!Kakao?.isInitialized?.()) return false;

  const base = SITE_URL.replace(/\/$/, "");
  const imageUrl = `${base}${ogImagePath.startsWith("/") ? ogImagePath : `/${ogImagePath}`}`;

  try {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: options.title,
        description: options.description,
        imageUrl,
        link: {
          mobileWebUrl: options.pageUrl,
          webUrl: options.pageUrl,
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}
