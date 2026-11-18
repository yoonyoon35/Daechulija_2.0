import type { BoardAttachment, BoardCategory } from "@/lib/board/types";

export const boardApiOrigin = "https://daechulija-board.dbsghkwns553.workers.dev";

export type BoardListItem = {
  id: string;
  category: BoardCategory;
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
  attachmentCount: number;
};

export type BoardListResponse = {
  notices: BoardListItem[];
  posts: BoardListItem[];
  total: number;
  matchCount: number;
  page: number;
  pageSize: number;
};

export type BoardPostDetail = BoardListItem & {
  content: string;
  attachments: BoardAttachment[];
};

export type BoardPostInput = {
  category: BoardCategory;
  title: string;
  author: string;
  content: string;
  files?: File[];
};

export function boardFileUrl(postId: string, fileId: string) {
  return new URL(`/posts/${postId}/files/${fileId}`, boardApiOrigin).toString();
}

export function fetchBoardPosts(params: { category: "all" | BoardCategory; query: string; page: number }, signal?: AbortSignal) {
  const url = new URL("/posts", boardApiOrigin);
  url.searchParams.set("category", params.category);
  url.searchParams.set("page", String(params.page));
  if (params.query) url.searchParams.set("q", params.query);
  return requestJson<BoardListResponse>(url, { signal });
}

export function fetchBoardPost(id: string, signal?: AbortSignal) {
  return requestJson<BoardPostDetail>(new URL(`/posts/${id}`, boardApiOrigin), { signal });
}

export function createBoardPost(input: BoardPostInput) {
  const form = new FormData();
  form.set("category", input.category);
  form.set("title", input.title);
  form.set("author", input.author);
  form.set("content", input.content);
  for (const file of input.files ?? []) form.append("file", file);
  return requestJson<BoardPostDetail>(new URL("/posts", boardApiOrigin), {
    method: "POST",
    body: form,
  });
}

async function requestJson<T>(url: URL, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { ...init, cache: "no-store" });
  } catch {
    throw new Error("게시판 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.");
  }
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "게시판을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}
