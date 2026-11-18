"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Paperclip, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBoardPost } from "@/lib/board/api";
import { boardCategories, boardLimits, formatFileSize, type BoardCategory } from "@/lib/board/types";
import { cn } from "@/lib/utils";

type FormErrors = {
  title?: string;
  author?: string;
  content?: string;
  files?: string;
};

const fieldClassName =
  "border-input bg-transparent dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3";

export function BoardWriteForm() {
  const [category, setCategory] = useState<BoardCategory>("question");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onPickFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? []);
    if (picked.length === 0) return;

    const oversized = picked.filter((file) => file.size > boardLimits.fileBytes);
    if (files.length + picked.length > boardLimits.files) {
      setErrors((current) => ({
        ...current,
        files: `첨부파일은 ${boardLimits.files}개까지 선택할 수 있습니다.`,
      }));
      return;
    }
    if (oversized.length > 0) {
      setErrors((current) => ({
        ...current,
        files: `파일 하나당 ${formatFileSize(boardLimits.fileBytes)} 이하만 선택할 수 있습니다.`,
      }));
      return;
    }

    setFiles((current) => [...current, ...picked]);
    setErrors((current) => ({ ...current, files: undefined }));
    setStatus(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) nextErrors.title = "제목을 입력해 주세요.";
    else if (trimmedTitle.length > boardLimits.title) {
      nextErrors.title = `제목은 ${boardLimits.title}자 이하로 입력해 주세요.`;
    }
    if (!trimmedAuthor) nextErrors.author = "글쓴이를 입력해 주세요.";
    else if (trimmedAuthor.length > boardLimits.author) {
      nextErrors.author = `글쓴이는 ${boardLimits.author}자 이하로 입력해 주세요.`;
    }
    if (!trimmedContent) nextErrors.content = "내용을 입력해 주세요.";
    else if (trimmedContent.length > boardLimits.content) {
      nextErrors.content = `내용은 ${boardLimits.content}자 이하로 입력해 주세요.`;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || pending) {
      setStatus(null);
      return;
    }

    setPending(true);
    setStatus(null);
    void createBoardPost({
      category,
      title: trimmedTitle,
      author: trimmedAuthor,
      content: trimmedContent,
      files,
    })
      .then((created) => {
        router.push(`/board/post?id=${created.id}`);
      })
      .catch((caught: unknown) => {
        setStatus(caught instanceof Error ? caught.message : "글을 등록하지 못했습니다.");
        setPending(false);
      });
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="board-category">분류</Label>
        <select
          id="board-category"
          value={category}
          onChange={(event) => setCategory(event.target.value as BoardCategory)}
          className={cn(fieldClassName, "h-9")}
        >
          {boardCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="board-title">제목</Label>
        <Input
          id="board-title"
          value={title}
          maxLength={boardLimits.title}
          aria-invalid={Boolean(errors.title)}
          onChange={(event) => setTitle(event.target.value)}
          className="h-9"
        />
        {errors.title ? <p className="text-destructive text-sm">{errors.title}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="board-author">글쓴이</Label>
        <Input
          id="board-author"
          value={author}
          maxLength={boardLimits.author}
          aria-invalid={Boolean(errors.author)}
          onChange={(event) => setAuthor(event.target.value)}
          className="h-9 sm:max-w-xs"
        />
        {errors.author ? <p className="text-destructive text-sm">{errors.author}</p> : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="board-content">내용</Label>
          <span className="text-muted-foreground text-xs">
            {content.length.toLocaleString("ko-KR")} / {boardLimits.content.toLocaleString("ko-KR")}
          </span>
        </div>
        <textarea
          id="board-content"
          value={content}
          maxLength={boardLimits.content}
          aria-invalid={Boolean(errors.content)}
          onChange={(event) => setContent(event.target.value)}
          className={cn(fieldClassName, "min-h-52 py-2")}
        />
        {errors.content ? <p className="text-destructive text-sm">{errors.content}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="board-files">첨부파일</Label>
        <Input
          id="board-files"
          type="file"
          multiple
          onChange={(event) => {
            onPickFiles(event.target.files);
            event.target.value = "";
          }}
          className="h-10 py-1.5"
        />
        <p className="text-muted-foreground text-xs">
          {boardLimits.files}개까지, 파일당 {formatFileSize(boardLimits.fileBytes)} 이하. 글과 함께 저장됩니다.
        </p>
        {errors.files ? <p className="text-destructive text-sm">{errors.files}</p> : null}
        {files.length > 0 ? (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Paperclip className="text-muted-foreground size-4 shrink-0" aria-hidden />
                  <span className="truncate">{file.name}</span>
                  <span className="text-muted-foreground shrink-0 text-xs">{formatFileSize(file.size)}</span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`${file.name} 제거`}
                  onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {status ? (
        <p className="bg-muted rounded-lg px-3 py-2 text-sm" role="status">
          {status}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
        <Link href="/board" className={cn(buttonVariants({ variant: "outline" }))}>
          취소
        </Link>
        <Button type="submit" disabled={pending}>
          {pending ? "등록 중" : "등록"}
        </Button>
      </div>
    </form>
  );
}
