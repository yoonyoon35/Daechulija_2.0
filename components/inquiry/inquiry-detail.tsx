"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { InquiryBreadcrumb } from "@/components/inquiry/inquiry-breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { fetchInquiry, type InquiryDetail } from "@/lib/inquiry/api";
import { formatInquiryDate } from "@/lib/inquiry/types";
import { cn } from "@/lib/utils";

export function InquiryDetailView({ id }: { id: string | null }) {
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    fetchInquiry(id, controller.signal)
      .then((result) => {
        setInquiry(result);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setInquiry(null);
        setError(caught instanceof Error ? caught.message : "문의를 불러오지 못했습니다.");
      });
    return () => controller.abort();
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14" role="main">
      <InquiryBreadcrumb current="문의 보기" includeListLink />
      {!id || error ? (
        <div className="rounded-lg border border-dashed px-4 py-10 text-center">
          <p className="text-sm">{error ?? "문의를 찾을 수 없습니다."}</p>
          <Link href="/inquiry/board" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
            목록
          </Link>
        </div>
      ) : null}
      {id && !error && !inquiry ? <p className="text-muted-foreground text-sm">문의를 불러오는 중입니다.</p> : null}
      {inquiry ? (
        <>
          <article className="rounded-xl border">
            <header className="border-b px-4 py-5 sm:px-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{inquiry.title}</h1>
              <p className="text-muted-foreground mt-3 text-sm">
                {inquiry.name} · {inquiry.contact}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{formatInquiryDate(inquiry.createdAt)}</p>
            </header>
            <div className="px-4 py-6 text-sm leading-relaxed whitespace-pre-wrap sm:px-6">{inquiry.content}</div>
          </article>
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Link href="/inquiry" className={cn(buttonVariants({ variant: "outline" }))}>
              문의하기
            </Link>
            <Link href="/inquiry/board" className={cn(buttonVariants({ variant: "outline" }))}>
              목록
            </Link>
          </div>
        </>
      ) : null}
    </main>
  );
}
