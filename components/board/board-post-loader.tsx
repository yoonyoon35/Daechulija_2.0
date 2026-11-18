"use client";

import { useSearchParams } from "next/navigation";
import { BoardDetail } from "@/components/board/board-detail";

export function BoardPostLoader() {
  const id = useSearchParams().get("id");
  return <BoardDetail id={id} />;
}