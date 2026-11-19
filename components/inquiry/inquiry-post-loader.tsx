"use client";

import { useSearchParams } from "next/navigation";
import { InquiryDetailView } from "@/components/inquiry/inquiry-detail";

export function InquiryPostLoader() {
  const id = useSearchParams().get("id");
  return <InquiryDetailView id={id} />;
}
