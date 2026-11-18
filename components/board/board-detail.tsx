"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import { BoardBreadcrumb } from "@/components/board/board-breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { boardFileUrl, fetchBoardPost, type BoardPostDetail } from "@/lib/board/api";
import { boardCategoryLabel, formatBoardDate, formatFileSize } from "@/lib/board/types";
import { cn } from "@/lib/utils";

export function BoardDetail({ id }: { id: string | null }) {
  const [post, setPost] = useState<BoardPostDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    fetchBoardPost(id, controller.signal)
      .then((result) => {
        setPost(result);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setPost(null);
        setError(caught instanceof Error ? caught.message : "글을 불러오지 못했습니다.");
      });
    return () => controller.abort();
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14" role="main">
      <BoardBreadcrumb current="글 보기" includeBoardLink />
      {!id || error ? (
        <div className="rounded-lg border border-dashed px-4 py-10 text-center">
          <p className="text-sm">{error ?? "글을 찾을 수 없습니다."}</p>
          <Link href="/board" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
            목록
          </Link>
        </div>
      ) : null}
      {id && !error && !post ? <p className="text-muted-foreground text-sm">글을 불러오는 중입니다.</p> : null}
      {post ? (
        <>
          <article className="rounded-xl border">
            <header className="border-b px-4 py-5 sm:px-6">
              <p className="text-primary text-sm font-medium">{boardCategoryLabel(post.category)}</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{post.title}</h1>
              <p className="text-muted-foreground mt-3 text-sm">
                {post.author} · {formatBoardDate(post.createdAt)} · 조회 {post.viewCount}
              </p>
            </header>
            <div className="px-4 py-6 text-sm leading-relaxed whitespace-pre-wrap sm:px-6">{post.content}</div>
            {post.attachments.length > 0 ? (
              <section className="border-t px-4 py-5 sm:px-6" aria-label="첨부파일">
                <h2 className="text-sm font-semibold">첨부파일 {post.attachments.length}</h2>
                <ul className="mt-3 space-y-2">
                  {post.attachments.map((file) => (
                  <li key={file.id}>
                    <a
                      href={boardFileUrl(post.id, file.id)}
                      className="hover:bg-muted flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Paperclip className="text-muted-foreground size-4 shrink-0" aria-hidden />
                        <span className="truncate">{file.fileName}</span>
                      </span>
                      <span className="text-muted-foreground shrink-0 text-xs">{formatFileSize(file.size)}</span>
                    </a>
                  </li>
                ))}
              </ul>
              </section>
            ) : null}
          </article>
          <div className="mt-6 flex justify-end">
            <Link href="/board" className={cn(buttonVariants({ variant: "outline" }))}>
              목록
            </Link>
          </div>
        </>
      ) : null}
    </main>
  );
}
