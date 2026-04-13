"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScheduleExportData } from "@/lib/download-schedule";
import { downloadExcel, downloadPdfPrint, downloadWord } from "@/lib/download-schedule";

export interface ScheduleDownloadButtonsProps {
  data: ScheduleExportData | null;
}

export function ScheduleDownloadButtons({ data }: ScheduleDownloadButtonsProps) {
  const disabled = !data;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="상환 일정표 다운로드">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        disabled={disabled}
        aria-label="Excel 형식으로 상환 일정표 다운로드"
        onClick={() => data && downloadExcel(data)}
      >
        <Download className="size-4" aria-hidden />
        Excel
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        disabled={disabled}
        aria-label="Word 형식으로 상환 일정표 다운로드"
        onClick={() => data && downloadWord(data)}
      >
        <Download className="size-4" aria-hidden />
        Word
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        disabled={disabled}
        aria-label="PDF 인쇄로 상환 일정표 저장"
        onClick={() => data && downloadPdfPrint(data)}
      >
        <Download className="size-4" aria-hidden />
        PDF
      </Button>
    </div>
  );
}
