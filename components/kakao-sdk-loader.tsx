"use client";

import Script from "next/script";

/** 카카오 다운로드 문서의 권장 CDN 버전과 맞춥니다: https://developers.kakao.com/docs/latest/ko/javascript/download */
const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

export function KakaoSdkLoader() {
  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY?.trim();
  if (!key) return null;

  return (
    <Script
      id="kakao-js-sdk"
      src={KAKAO_SDK_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window === "undefined" || !window.Kakao) return;
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(key);
        }
      }}
    />
  );
}
