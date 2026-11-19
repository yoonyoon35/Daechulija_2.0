"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createInquiry } from "@/lib/inquiry/api";
import { inquiryLimits } from "@/lib/inquiry/types";
import { cn } from "@/lib/utils";

type FormErrors = {
  name?: string;
  contact?: string;
  title?: string;
  content?: string;
  consent?: string;
};

const fieldClassName =
  "border-input bg-transparent dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) nextErrors.name = "이름을 입력해 주세요.";
    else if (trimmedName.length > inquiryLimits.name) {
      nextErrors.name = `이름은 ${inquiryLimits.name}자 이하로 입력해 주세요.`;
    }
    if (!trimmedContact) nextErrors.contact = "연락처를 입력해 주세요.";
    else if (trimmedContact.length > inquiryLimits.contact) {
      nextErrors.contact = `연락처는 ${inquiryLimits.contact}자 이하로 입력해 주세요.`;
    }
    if (!trimmedTitle) nextErrors.title = "제목을 입력해 주세요.";
    else if (trimmedTitle.length > inquiryLimits.title) {
      nextErrors.title = `제목은 ${inquiryLimits.title}자 이하로 입력해 주세요.`;
    }
    if (!trimmedContent) nextErrors.content = "문의 내용을 입력해 주세요.";
    else if (trimmedContent.length > inquiryLimits.content) {
      nextErrors.content = `내용은 ${inquiryLimits.content}자 이하로 입력해 주세요.`;
    }
    if (!consent) nextErrors.consent = "개인정보 수집 및 이용에 동의해 주세요.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || pending) {
      setStatus(null);
      return;
    }

    setPending(true);
    setStatus(null);
    void createInquiry({
      name: trimmedName,
      contact: trimmedContact,
      title: trimmedTitle,
      content: trimmedContent,
      consent: true,
    })
      .then((created) => {
        router.push(`/inquiry/post?id=${created.id}`);
      })
      .catch((caught: unknown) => {
        setStatus(caught instanceof Error ? caught.message : "문의를 접수하지 못했습니다.");
        setPending(false);
      });
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="inquiry-name">이름</Label>
        <Input
          id="inquiry-name"
          value={name}
          maxLength={inquiryLimits.name}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => setName(event.target.value)}
          className="h-9 sm:max-w-xs"
        />
        {errors.name ? <p className="text-destructive text-sm">{errors.name}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-contact">연락처</Label>
        <Input
          id="inquiry-contact"
          value={contact}
          maxLength={inquiryLimits.contact}
          autoComplete="tel"
          placeholder="전화번호 또는 이메일"
          aria-invalid={Boolean(errors.contact)}
          onChange={(event) => setContact(event.target.value)}
          className="h-9 sm:max-w-md"
        />
        {errors.contact ? <p className="text-destructive text-sm">{errors.contact}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-title">제목</Label>
        <Input
          id="inquiry-title"
          value={title}
          maxLength={inquiryLimits.title}
          aria-invalid={Boolean(errors.title)}
          onChange={(event) => setTitle(event.target.value)}
          className="h-9"
        />
        {errors.title ? <p className="text-destructive text-sm">{errors.title}</p> : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="inquiry-content">내용</Label>
          <span className="text-muted-foreground text-xs">
            {content.length.toLocaleString("ko-KR")} / {inquiryLimits.content.toLocaleString("ko-KR")}
          </span>
        </div>
        <textarea
          id="inquiry-content"
          value={content}
          maxLength={inquiryLimits.content}
          aria-invalid={Boolean(errors.content)}
          onChange={(event) => setContent(event.target.value)}
          className={cn(fieldClassName, "min-h-40 py-2")}
        />
        {errors.content ? <p className="text-destructive text-sm">{errors.content}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 size-4"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            문의 확인을 위해 이름, 연락처, 문의 내용을 저장하는 데 동의합니다.{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              개인정보처리방침
            </Link>
          </span>
        </label>
        {errors.consent ? <p className="text-destructive text-sm">{errors.consent}</p> : null}
      </div>

      {status ? (
        <p className="bg-muted rounded-lg px-3 py-2 text-sm" role="status">
          {status}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
        <Link href="/inquiry/board" className={cn(buttonVariants({ variant: "outline" }))}>
          접수 목록
        </Link>
        <Button type="submit" disabled={pending}>
          {pending ? "접수 중" : "문의 접수"}
        </Button>
      </div>
    </form>
  );
}
