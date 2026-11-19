import { boardApiOrigin } from "@/lib/board/api";

export type InquiryListItem = {
  id: string;
  name: string;
  contact: string;
  title: string;
  createdAt: string;
};

export type InquiryListResponse = {
  inquiries: InquiryListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type InquiryDetail = InquiryListItem & {
  content: string;
};

export type InquiryInput = {
  name: string;
  contact: string;
  title: string;
  content: string;
  consent: boolean;
};

export function fetchInquiries(page: number, signal?: AbortSignal) {
  const url = new URL("/inquiries", boardApiOrigin);
  url.searchParams.set("page", String(page));
  return requestJson<InquiryListResponse>(url, { signal });
}

export function fetchInquiry(id: string, signal?: AbortSignal) {
  return requestJson<InquiryDetail>(new URL(`/inquiries/${id}`, boardApiOrigin), { signal });
}

export function createInquiry(input: InquiryInput) {
  return requestJson<InquiryDetail>(new URL("/inquiries", boardApiOrigin), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

async function requestJson<T>(url: URL, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { ...init, cache: "no-store" });
  } catch {
    throw new Error("문의 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.");
  }
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "문의를 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}
