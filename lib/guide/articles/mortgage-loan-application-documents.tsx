import Link from "next/link";

export const mortgageLoanApplicationDocumentsMeta = {
  slug: "mortgage-loan-application-documents",
  title: "주택담보대출 신청 절차 및 필요 서류",
  description:
    "주택담보대출 신청 단계·소요 기간, 공통·소득·담보 서류, 비대면·대면·정책 모기지 신청 방법과 서류 발급 주의사항을 표로 정리했습니다.",
  updated: "2026년 4월 14일",
} as const;

export function MortgageLoanApplicationDocumentsBody() {
  return (
    <>
      <p>
        주택담보대출은 신청부터 대출 실행까지 통상 1~2주가 소요됩니다. 서류 미비로 인한 지연이 가장 흔한 문제이므로 잔금일 최소
        3주 전에 준비를 시작하는 것이 안전합니다.
      </p>

      <section className="space-y-4" aria-labelledby="guide-mla-procedure">
        <h2 id="guide-mla-procedure" className="text-foreground text-xl font-semibold tracking-tight">
          전체 신청 절차
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              주택담보대출 신청 단계별 안내
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  단계
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  내용
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  소요 기간
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  1단계
                </th>
                <td className="border-border border-b px-3 py-2.5">사전 상담 및 대출 한도 조회</td>
                <td className="border-border border-b px-3 py-2.5">1~2일</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  2단계
                </th>
                <td className="border-border border-b px-3 py-2.5">대출 상품 비교 및 선택</td>
                <td className="border-border border-b px-3 py-2.5">1~3일</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  3단계
                </th>
                <td className="border-border border-b px-3 py-2.5">서류 준비 및 신청</td>
                <td className="border-border border-b px-3 py-2.5">2~5일</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  4단계
                </th>
                <td className="border-border border-b px-3 py-2.5">담보 감정 평가</td>
                <td className="border-border border-b px-3 py-2.5">2~3일</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  5단계
                </th>
                <td className="border-border border-b px-3 py-2.5">심사 및 승인</td>
                <td className="border-border border-b px-3 py-2.5">3~5일</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  6단계
                </th>
                <td className="border-border border-b px-3 py-2.5">근저당권 설정 등기</td>
                <td className="border-border border-b px-3 py-2.5">1~2일</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  7단계
                </th>
                <td className="px-3 py-2.5">대출 실행(잔금일)</td>
                <td className="px-3 py-2.5">당일</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-mla-docs-common">
        <h2 id="guide-mla-docs-common" className="text-foreground text-xl font-semibold tracking-tight">
          필요 서류: 공통
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              공통 제출 서류
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  서류
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  발급처
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  신분증
                </th>
                <td className="border-border border-b px-3 py-2.5">본인 지참</td>
                <td className="border-border border-b px-3 py-2.5">주민등록증·운전면허증</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  주민등록등본
                </th>
                <td className="border-border border-b px-3 py-2.5">정부24·주민센터</td>
                <td className="border-border border-b px-3 py-2.5">세대원 전원 포함</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  주민등록초본
                </th>
                <td className="border-border border-b px-3 py-2.5">정부24·주민센터</td>
                <td className="border-border border-b px-3 py-2.5">주소 변동 이력 포함</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  가족관계증명서
                </th>
                <td className="border-border border-b px-3 py-2.5">정부24</td>
                <td className="border-border border-b px-3 py-2.5">주택 수 확인용</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  인감증명서(대출용)
                </th>
                <td className="px-3 py-2.5">주민센터</td>
                <td className="px-3 py-2.5">발급 후 3개월 이내</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-mla-docs-income">
        <h2 id="guide-mla-docs-income" className="text-foreground text-xl font-semibold tracking-tight">
          필요 서류: 소득 증빙(소득 유형별)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              소득 유형별 제출 서류
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  소득 유형
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  필요 서류
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  근로소득자
                </th>
                <td className="border-border border-b px-3 py-2.5">
                  원천징수영수증, 재직증명서, 건강보험료 납부확인서
                </td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  자영업자
                </th>
                <td className="border-border border-b px-3 py-2.5">
                  사업자등록증명원, 종합소득세 신고서, 소득금액증명원
                </td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  프리랜서
                </th>
                <td className="border-border border-b px-3 py-2.5">소득금액증명원, 용역계약서 또는 거래명세서</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  연금소득자
                </th>
                <td className="px-3 py-2.5">연금수령 확인서 또는 연금지급 내역서</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-mla-docs-collateral">
        <h2 id="guide-mla-docs-collateral" className="text-foreground text-xl font-semibold tracking-tight">
          필요 서류: 담보 주택 관련
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              담보 주택 관련 서류
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  서류
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  발급처
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  부동산 등기부등본
                </th>
                <td className="border-border border-b px-3 py-2.5">대법원 인터넷등기소</td>
                <td className="border-border border-b px-3 py-2.5">발급 후 1개월 이내</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  매매계약서 사본
                </th>
                <td className="border-border border-b px-3 py-2.5">본인 보관</td>
                <td className="border-border border-b px-3 py-2.5">주택 구입 목적 시</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  건축물대장
                </th>
                <td className="border-border border-b px-3 py-2.5">정부24</td>
                <td className="border-border border-b px-3 py-2.5">—</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  전입세대 열람내역
                </th>
                <td className="border-border border-b px-3 py-2.5">주민센터</td>
                <td className="border-border border-b px-3 py-2.5">세입자 유무 확인용</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  임대차계약서 사본
                </th>
                <td className="px-3 py-2.5">본인 보관</td>
                <td className="px-3 py-2.5">세입자 있는 경우</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-mla-channel">
        <h2 id="guide-mla-channel" className="text-foreground text-xl font-semibold tracking-tight">
          신청 방법: 비대면 vs 대면
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              신청 채널별 방법과 특징
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  구분
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  방법
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  특징
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  비대면
                </th>
                <td className="border-border border-b px-3 py-2.5">은행 앱·인터넷뱅킹</td>
                <td className="border-border border-b px-3 py-2.5">서류 스캔 업로드, 빠른 처리</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  대면
                </th>
                <td className="border-border border-b px-3 py-2.5">영업점 방문</td>
                <td className="border-border border-b px-3 py-2.5">복잡한 상황 상담 가능</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  정책 모기지
                </th>
                <td className="px-3 py-2.5">
                  기금 e든든(
                  <a
                    href="https://enhuf.molit.go.kr"
                    className="text-primary underline-offset-4 hover:underline"
                    rel="noopener noreferrer"
                  >
                    enhuf.molit.go.kr
                  </a>
                  ) 또는 수탁은행
                </td>
                <td className="px-3 py-2.5">디딤돌·보금자리론 신청</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="guide-mla-checklist">
        <h2 id="guide-mla-checklist" className="text-foreground text-xl font-semibold tracking-tight">
          신청 전 반드시 확인해야 할 사항
        </h2>
        <p>
          담보 주택이 규제지역에 해당하는지 여부를 먼저 확인해야 합니다. 규제지역 여부에 따라{" "}
          <abbr title="담보인정비율">LTV</abbr> 한도가 달라져 실제 대출 가능 금액이 크게 달라집니다.
        </p>
        <p>
          잔금일이 정해진 상태에서 서류 지연이 발생하면 계약 위약금 문제로 이어질 수 있으므로, 잔금일 기준 최소 3주 전에 서류 준비를
          시작하는 것이 안전합니다.
        </p>
        <p>
          공동명의로 대출을 신청하는 경우 명의자 전원의 서류가 필요합니다. 준비 기간을 더 넉넉히 잡아야 합니다.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="guide-mla-doc-caution">
        <h2 id="guide-mla-doc-caution" className="text-foreground text-xl font-semibold tracking-tight">
          서류 발급 시 주의 사항
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              서류별 유의점
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  항목
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  주의사항
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  등기부등본
                </th>
                <td className="border-border border-b px-3 py-2.5">발급 후 1개월 이내 유효</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  인감증명서
                </th>
                <td className="border-border border-b px-3 py-2.5">반드시 「대출용」으로 발급</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  소득 서류
                </th>
                <td className="border-border border-b px-3 py-2.5">전년도·전전년도 모두 요구하는 경우 있음</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  온라인 발급 서류
                </th>
                <td className="px-3 py-2.5">PDF 저장 후 제출 가능 여부 사전 확인</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-sm">
          ※ 금융기관별로 추가 서류를 요구할 수 있으므로 신청 전 해당 은행에 서류 목록을 확인하는 것이 필수입니다.
        </p>
      </section>

      <aside
        className="bg-muted/40 text-muted-foreground space-y-3 rounded-lg border p-4 text-sm leading-relaxed"
        role="note"
        aria-label="계산기 이동"
      >
        <p>
          <Link href="/#calculator" className="text-primary font-medium underline-offset-4 hover:underline">
            대출 조건에 따른 월 상환액은 대출 이자 계산기에서 확인할 수 있습니다.
          </Link>
        </p>
      </aside>
    </>
  );
}
