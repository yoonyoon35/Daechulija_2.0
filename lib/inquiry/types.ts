export const inquiryLimits = {
  name: 20,
  contact: 100,
  title: 80,
  content: 2000,
} as const;

export const inquiryPageSize = 10;

export type Inquiry = {
  id: string;
  name: string;
  contact: string;
  title: string;
  content: string;
  createdAt: string;
};

export function formatInquiryDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}
