"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchInquiries, type InquiryListItem, type InquiryListResponse } from "@/lib/inquiry/api";
import { formatInquiryDate } from "@/lib/inquiry/types";
import { cn } from "@/lib/utils";

export function InquiryList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<InquiryListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchInquiries(page, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(caught instanceof Error ? caught.message : "문의를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [page, reloadKey]);

  const rows = data?.inquiries ?? [];
  const total = data?.total ?? 0;
  const pageSize = data?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = data?.page ?? page;
  const start = (currentPage - 1) * pageSize;

  return (
    <div>
      <div className="flex justify-end">
        <Link href="/inquiry" className={cn(buttonVariants(), "w-full sm:w-auto")}>
          문의하기
        </Link>
      </div>

      <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {loading && !data ? "문의를 불러오는 중입니다." : `전체 ${total}건`}
      </p>

      {error ? (
        <div className="mt-8 rounded-lg border border-dashed px-4 py-10 text-center">
          <p className="text-sm">{error}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={() => setReloadKey((current) => current + 1)}>
            다시 시도
          </Button>
        </div>
      ) : null}

      {!error && data && rows.length === 0 ? (
        <p className="text-muted-foreground mt-8 rounded-lg border border-dashed px-4 py-10 text-center text-sm">
          아직 접수된 문의가 없습니다.
        </p>
      ) : null}

      {!error && rows.length > 0 ? (
        <>
          <div className="mt-3 overflow-hidden rounded-lg border" aria-busy={loading}>
            <table className="hidden w-full text-sm sm:table">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="w-16 px-3 py-2.5 text-center font-medium">번호</th>
                  <th className="px-3 py-2.5 text-left font-medium">제목</th>
                  <th className="w-24 px-3 py-2.5 text-left font-medium">이름</th>
                  <th className="w-40 px-3 py-2.5 text-left font-medium">연락처</th>
                  <th className="w-40 px-3 py-2.5 text-center font-medium">접수일시</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="text-muted-foreground px-3 py-3 text-center">{total - start - index}</td>
                    <td className="px-3 py-3">
                      <InquiryTitleLink item={item} />
                    </td>
                    <td className="px-3 py-3">{item.name}</td>
                    <td className="px-3 py-3 break-all">{item.contact}</td>
                    <td className="text-muted-foreground px-3 py-3 text-center">{formatInquiryDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="sm:hidden">
              {rows.map((item) => (
                <li key={item.id} className="border-t px-3 py-3 first:border-t-0">
                  <p className="text-muted-foreground text-xs">
                    {item.name} · {item.contact}
                  </p>
                  <div className="mt-1">
                    <InquiryTitleLink item={item} />
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{formatInquiryDate(item.createdAt)}</p>
                </li>
              ))}
            </ul>
          </div>

          {total > pageSize ? (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button type="button" variant="outline" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                이전
              </Button>
              <span className="text-muted-foreground min-w-16 text-center text-sm">
                {currentPage} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                다음
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function InquiryTitleLink({ item }: { item: InquiryListItem }) {
  return (
    <Link
      href={`/inquiry/post?id=${item.id}`}
      className="hover:text-primary inline-flex max-w-full underline-offset-4 hover:underline"
    >
      <span className="truncate">{item.title}</span>
    </Link>
  );
}
