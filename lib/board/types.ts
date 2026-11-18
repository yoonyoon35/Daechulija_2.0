export const boardCategories = [
  { id: "notice", label: "공지" },
  { id: "question", label: "질문" },
  { id: "free", label: "자유" },
] as const;

export type BoardCategory = (typeof boardCategories)[number]["id"];

export type BoardAttachment = {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
};

export type BoardPost = {
  id: string;
  category: BoardCategory;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  viewCount: number;
  attachments: BoardAttachment[];
};

export const boardLimits = {
  title: 80,
  author: 20,
  content: 5000,
  files: 5,
  fileBytes: 10 * 1024 * 1024,
} as const;

export const boardPageSize = 5;

export function boardCategoryLabel(category: BoardCategory) {
  return boardCategories.find((item) => item.id === category)?.label ?? category;
}

export function formatBoardDate(iso: string) {
  const [date] = iso.split("T");
  if (!date) return iso;
  return date.replaceAll("-", ".");
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
