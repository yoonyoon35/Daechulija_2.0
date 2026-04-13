import type { RepaymentType, ScheduleRow } from "@/lib/loan-calculations";
import { formatNumber, repaymentTypeLabels } from "@/lib/loan-calculations";
import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

export interface ScheduleExportData {
  schedule: ScheduleRow[];
  principal: number;
  totalPayment: number;
  totalInterest: number;
  monthlyPayment: number;
  interestRate: number;
  loanPeriod: number;
  gracePeriod: number;
  repaymentType: RepaymentType;
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadExcel(data: ScheduleExportData) {
  const name = repaymentTypeLabels[data.repaymentType];
  let xml = '<?xml version="1.0"?>\n';
  xml += '<?mso-application progid="Excel.Sheet"?>\n';
  xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
  xml += ' xmlns:o="urn:schemas-microsoft-com:office:office"\n';
  xml += ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n';
  xml += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n';
  xml += ' xmlns:html="http://www.w3.org/TR/REC-html40">\n';
  xml += '<Worksheet ss:Name="상환일정표">\n';
  xml += "<Table>\n";

  xml += '<Row><Cell><Data ss:Type="String">대출 이자 계산 결과</Data></Cell></Row>\n';
  xml += `<Row><Cell><Data ss:Type="String">대출 원금</Data></Cell><Cell><Data ss:Type="String">${formatNumber(data.principal)}원</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">이자율</Data></Cell><Cell><Data ss:Type="String">${data.interestRate}%</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">대출 기간</Data></Cell><Cell><Data ss:Type="String">${data.loanPeriod}개월</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">거치기간</Data></Cell><Cell><Data ss:Type="String">${data.gracePeriod}년</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">상환 방식</Data></Cell><Cell><Data ss:Type="String">${name}</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">월 상환액</Data></Cell><Cell><Data ss:Type="String">${formatNumber(data.monthlyPayment)}원</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">총 상환액</Data></Cell><Cell><Data ss:Type="String">${formatNumber(data.totalPayment)}원</Data></Cell></Row>\n`;
  xml += `<Row><Cell><Data ss:Type="String">총 이자액</Data></Cell><Cell><Data ss:Type="String">${formatNumber(data.totalInterest)}원</Data></Cell></Row>\n`;
  xml += "<Row></Row>\n";

  xml += "<Row>\n";
  xml += '<Cell><Data ss:Type="String">회차</Data></Cell>\n';
  xml += '<Cell><Data ss:Type="String">상환원금</Data></Cell>\n';
  xml += '<Cell><Data ss:Type="String">이자</Data></Cell>\n';
  xml += '<Cell><Data ss:Type="String">월상환액</Data></Cell>\n';
  xml += '<Cell><Data ss:Type="String">잔액</Data></Cell>\n';
  xml += "</Row>\n";

  data.schedule.forEach((item) => {
    xml += "<Row>\n";
    xml += `<Cell><Data ss:Type="Number">${item.month}</Data></Cell>\n`;
    xml += `<Cell><Data ss:Type="String">${formatNumber(item.principal)}원</Data></Cell>\n`;
    xml += `<Cell><Data ss:Type="String">${formatNumber(item.interest)}원</Data></Cell>\n`;
    xml += `<Cell><Data ss:Type="String">${formatNumber(item.payment)}원</Data></Cell>\n`;
    xml += `<Cell><Data ss:Type="String">${formatNumber(item.balance)}원</Data></Cell>\n`;
    xml += "</Row>\n";
  });

  xml += "</Table>\n";
  xml += "</Worksheet>\n";
  xml += "</Workbook>";

  const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
  downloadBlob(blob, `대출상환일정표_${Date.now()}.xls`);
}

export async function downloadWord(data: ScheduleExportData) {
  const name = repaymentTypeLabels[data.repaymentType];
  const columnWidths = [900, 2400, 1900, 2400, 2400];

  const createCell = (
    value: string,
    width: number,
    align: (typeof AlignmentType)[keyof typeof AlignmentType],
    bold = false,
  ) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      children: [
        new Paragraph({
          alignment: align,
          children: [new TextRun({ text: value, bold })],
        }),
      ],
    });

  const infoLines = [
    `대출 원금: ${formatNumber(data.principal)}원`,
    `이자율: ${data.interestRate}%`,
    `대출 기간: ${data.loanPeriod}개월`,
    `거치기간: ${data.gracePeriod}년`,
    `상환 방식: ${name}`,
    `월 상환액: ${formatNumber(data.monthlyPayment)}원`,
    `총 상환액: ${formatNumber(data.totalPayment)}원`,
    `총 이자액: ${formatNumber(data.totalInterest)}원`,
  ];

  const headerRow = new TableRow({
    children: ["회차", "상환원금", "이자", "월상환액", "잔액"].map((label, index) =>
      createCell(label, columnWidths[index], AlignmentType.CENTER, true),
    ),
  });

  const scheduleRows = data.schedule.map(
    (item) =>
      new TableRow({
        children: [
          createCell(String(item.month), columnWidths[0], AlignmentType.CENTER),
          createCell(`${formatNumber(item.principal)}원`, columnWidths[1], AlignmentType.RIGHT),
          createCell(`${formatNumber(item.interest)}원`, columnWidths[2], AlignmentType.RIGHT),
          createCell(`${formatNumber(item.payment)}원`, columnWidths[3], AlignmentType.RIGHT),
          createCell(`${formatNumber(item.balance)}원`, columnWidths[4], AlignmentType.RIGHT),
        ],
      }),
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: "대출 이자 계산 결과", bold: true, size: 32 })] }),
          ...infoLines.map((line) => new Paragraph(line)),
          new Paragraph(""),
          new Paragraph({ children: [new TextRun({ text: "상환 일정표", bold: true, size: 28 })] }),
          new Table({
            rows: [headerRow, ...scheduleRows],
            layout: TableLayoutType.FIXED,
            width: { size: 5000, type: WidthType.PERCENTAGE },
            columnWidths,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(
    new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }),
    `대출상환일정표_${Date.now()}.docx`,
  );
}

export function downloadPdfPrint(data: ScheduleExportData) {
  const name = repaymentTypeLabels[data.repaymentType];
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html><html><head><meta charset="UTF-8"><title>대출 상환 일정표</title>
    <style>
      body { font-family: sans-serif; padding: 20px; }
      h1 { color: #2563eb; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background: #f3f4f6; }
      th { text-align: center; }
      td:first-child { text-align: center; }
      td:not(:first-child) { text-align: right; }
      @media print { button { display: none; } }
    </style></head><body>
    <h1>대출 이자 계산 결과</h1>
    <p><strong>대출 원금:</strong> ${formatNumber(data.principal)}원</p>
    <p><strong>이자율:</strong> ${data.interestRate}%</p>
    <p><strong>대출 기간:</strong> ${data.loanPeriod}개월</p>
    <p><strong>거치기간:</strong> ${data.gracePeriod}년</p>
    <p><strong>상환 방식:</strong> ${name}</p>
    <p><strong>월 상환액:</strong> ${formatNumber(data.monthlyPayment)}원</p>
    <p><strong>총 상환액:</strong> ${formatNumber(data.totalPayment)}원</p>
    <p><strong>총 이자액:</strong> ${formatNumber(data.totalInterest)}원</p>
    <h2>상환 일정표</h2>
    <table><thead><tr><th>회차</th><th>상환원금</th><th>이자</th><th>월상환액</th><th>잔액</th></tr></thead><tbody>
    ${data.schedule
      .map(
        (item) =>
          `<tr><td>${item.month}</td><td>${formatNumber(item.principal)}원</td><td>${formatNumber(item.interest)}원</td><td>${formatNumber(item.payment)}원</td><td>${formatNumber(item.balance)}원</td></tr>`,
      )
      .join("")}
    </tbody></table>
    <button type="button" onclick="window.print()" style="margin-top:20px;padding:10px 20px;background:#2563eb;color:#fff;border:none;border-radius:5px;cursor:pointer">PDF로 인쇄</button>
    </body></html>`);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 250);
}
