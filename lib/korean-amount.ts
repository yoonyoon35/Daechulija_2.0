const DIGIT = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const UNITS = ["", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극"];

function readUnder10000(n: number): string {
  if (n <= 0 || n >= 10000) return "";
  let s = "";
  const qian = Math.floor(n / 1000);
  const bai = Math.floor((n % 1000) / 100);
  const shi = Math.floor((n % 100) / 10);
  const yi = n % 10;

  if (qian) s += qian === 1 ? "천" : `${DIGIT[qian]}천`;
  if (bai) s += bai === 1 ? "백" : `${DIGIT[bai]}백`;
  if (shi) s += shi === 1 ? "십" : `${DIGIT[shi]}십`;
  if (yi) s += DIGIT[yi];

  return s;
}

/**
 * 원 단위 정수를 한글 금액 문자열로 변환합니다. (예: 600000000 → "육억원")
 */
export function formatAmountKoreanWon(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 0) return "영원";
  if (rounded < 0) return `마이너스 ${formatAmountKoreanWon(-rounded)}`;

  const chunks: number[] = [];
  let n = rounded;
  while (n > 0) {
    chunks.push(n % 10000);
    n = Math.floor(n / 10000);
  }

  let out = "";
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i]!;
    if (chunk === 0) continue;
    const unit = UNITS[i] ?? "";
    const read = readUnder10000(chunk);
    if (!read) continue;
    out += read + unit;
  }

  return `${out}원`;
}
