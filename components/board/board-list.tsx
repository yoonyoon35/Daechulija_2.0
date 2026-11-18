"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Paperclip, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBoardPosts, type BoardListItem, type BoardListResponse } from "@/lib/board/api";
import { boardCategories, formatBoardDate, type BoardCategory } from "@/lib/board/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | BoardCategory;

export function BoardList() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<BoardListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchBoardPosts({ category, query: debouncedQuery, page }, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(caught instanceof Error ? caught.message : "글을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [category, debouncedQuery, page, reloadKey]);

  const changeCategory = (next: CategoryFilter) => {
    setCategory(next);
    setPage(1);
  };

  const rows = data?.posts ?? [];
  const leadingNotices = category === "all" ? (data?.notices ?? []) : [];
  const total = data?.total ?? 0;
  const pageSize = data?.pageSize ?? 5;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = data?.page ?? page;
  const start = (currentPage - 1) * pageSize;
  const hasRows = leadingNotices.length > 0 || rows.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="분류">
          <CategoryChip active={category === "all"} onClick={() => changeCategory("all")}>
            전체
          </CategoryChip>
          {boardCategories.map((item) => (
            <CategoryChip key={item.id} active={category === item.id} onClick={() => changeCategory(item.id)}>
              {item.label}
            </CategoryChip>
          ))}
        </div>
        <Link href="/board/write" className={cn(buttonVariants(), "w-full sm:w-auto")}>
          글쓰기
        </Link>
      </div>

      <form
        className="mt-4"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setDebouncedQuery(query.trim());
          setPage(1);
        }}
      >
        <label className="relative block">
          <span className="sr-only">게시글 검색</span>
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="제목, 내용, 글쓴이"
            className="h-9 pl-8"
          />
        </label>
      </form>

      <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {loading && !data ? "글을 불러오는 중입니다." : countLabel(data, debouncedQuery, category)}
      </p>

      {error ? (
        <div className="mt-8 rounded-lg border border-dashed px-4 py-10 text-center">
          <p className="text-sm">{error}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={() => setReloadKey((current) => current + 1)}>
            다시 시도
          </Button>
        </div>
      ) : null}

      {!error && data && !hasRows ? (
        <p className="text-muted-foreground mt-8 rounded-lg border border-dashed px-4 py-10 text-center text-sm">
          {debouncedQuery || category !== "all" ? "검색 결과가 없습니다." : "아직 등록된 글이 없습니다."}
        </p>
      ) : null}

      {!error && hasRows ? (
        <>
          <div className="mt-3 overflow-hidden rounded-lg border" aria-busy={loading}>
            <table className="hidden w-full text-sm sm:table">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="w-16 px-3 py-2.5 text-center font-medium">번호</th>
                  <th className="w-16 px-3 py-2.5 text-center font-medium">분류</th>
                  <th className="px-3 py-2.5 text-left font-medium">제목</th>
                  <th className="w-24 px-3 py-2.5 text-left font-medium">글쓴이</th>
                  <th className="w-28 px-3 py-2.5 text-center font-medium">작성일</th>
                  <th className="w-16 px-3 py-2.5 text-center font-medium">조회</th>
                </tr>
              </thead>
              <tbody>
                {leadingNotices.map((post) => (
                  <BoardTableRow key={post.id} post={post} numberLabel="공지" emphasized />
                ))}
                {rows.map((post, index) => (
                  <BoardTableRow key={post.id} post={post} numberLabel={String(total - start - index)} />
                ))}
              </tbody>
            </table>

            <ul className="sm:hidden">
              {leadingNotices.map((post) => (
                <BoardMobileItem key={post.id} post={post} emphasized />
              ))}
              {rows.map((post) => (
                <BoardMobileItem key={post.id} post={post} />
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

function countLabel(data: BoardListResponse | null, query: string, category: CategoryFilter) {
  if (!data) return "글을 불러오는 중입니다.";
  if (query || category !== "all") return `검색 결과 ${data.matchCount}건`;
  return `전체 ${data.matchCount}건`;
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

function BoardTableRow({
  post,
  numberLabel,
  emphasized = false,
}: {
  post: BoardListItem;
  numberLabel: string;
  emphasized?: boolean;
}) {
  return (
    <tr className={cn("border-t", emphasized && "bg-primary/5")}>
      <td className={cn("px-3 py-3 text-center", emphasized ? "text-primary font-medium" : "text-muted-foreground")}>
        {numberLabel}
      </td>
      <td className="text-muted-foreground px-3 py-3 text-center">{labelOf(post)}</td>
      <td className="px-3 py-3">
        <PostTitleLink post={post} emphasized={emphasized} />
      </td>
      <td className="px-3 py-3">{post.author}</td>
      <td className="text-muted-foreground px-3 py-3 text-center">{formatBoardDate(post.createdAt)}</td>
      <td className="text-muted-foreground px-3 py-3 text-center">{post.viewCount}</td>
    </tr>
  );
}

function BoardMobileItem({ post, emphasized = false }: { post: BoardListItem; emphasized?: boolean }) {
  return (
    <li className={cn("border-t px-3 py-3 first:border-t-0", emphasized && "bg-primary/5")}>
      <p className="text-muted-foreground text-xs">
        {emphasized ? "공지" : labelOf(post)} · {formatBoardDate(post.createdAt)} · 조회 {post.viewCount}
      </p>
      <div className="mt-1">
        <PostTitleLink post={post} emphasized={emphasized} />
      </div>
      <p className="text-muted-foreground mt-1 text-xs">{post.author}</p>
    </li>
  );
}

function PostTitleLink({ post, emphasized = false }: { post: BoardListItem; emphasized?: boolean }) {
  return (
    <Link
      href={`/board/post?id=${post.id}`}
      className={cn(
        "hover:text-primary inline-flex max-w-full items-center gap-1.5 underline-offset-4 hover:underline",
        emphasized && "font-medium",
      )}
    >
      <span className="truncate">{post.title}</span>
      {post.attachmentCount > 0 ? <span className="sr-only">첨부파일 있음</span> : null}
      {post.attachmentCount > 0 ? <Paperclip className="text-muted-foreground size-3.5 shrink-0" aria-hidden /> : null}
    </Link>
  );
}

function labelOf(post: BoardListItem) {
  return boardCategories.find((item) => item.id === post.category)?.label ?? post.category;
}
