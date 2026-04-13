import Link from "next/link";

export const variableVsFixedRate2026Meta = {
  slug: "variable-vs-fixed-rate-2026",
  title: "변동금리 vs 고정금리 선택 기준",
  description:
    "2026년 4월 기준 변동금리·고정금리·혼합형의 차이, 현재 금리 수준, 상황별 선택 기준과 월 상환액 변화를 표로 정리했습니다.",
  updated: "2026년 4월 13일",
} as const;

export function VariableVsFixedRate2026Body() {
  return (
    <>
      <section className="space-y-3" aria-labelledby="guide-rate-type-overview">
        <h2 id="guide-rate-type-overview" className="text-foreground text-xl font-semibold tracking-tight">
          2026년 4월 기준
        </h2>
        <p>
          변동금리는 시장금리(COFIX 등)에 연동되어 대출 기간 중 금리가 변동되며, 고정금리는 대출 실행 시점의 금리가 만기까지
          유지됩니다. 혼합형 금리는 일정 기간(통상 3~5년) 고정 후 변동금리로 전환됩니다.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="guide-rate-type-basic-compare">
        <h2 id="guide-rate-type-basic-compare" className="text-foreground text-xl font-semibold tracking-tight">
          기본 비교
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              변동금리·고정금리·혼합형 비교
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  구분
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  변동금리
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  고정금리
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  혼합형
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  금리 변동
                </th>
                <td className="border-border border-b px-3 py-2.5">주기적으로 변동</td>
                <td className="border-border border-b px-3 py-2.5">만기까지 고정</td>
                <td className="border-border border-b px-3 py-2.5">고정 기간 후 변동 전환</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  초기 금리 수준
                </th>
                <td className="border-border border-b px-3 py-2.5">상대적으로 낮음</td>
                <td className="border-border border-b px-3 py-2.5">상대적으로 높음</td>
                <td className="border-border border-b px-3 py-2.5">중간 수준</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  금리 인상 시
                </th>
                <td className="border-border border-b px-3 py-2.5">불리</td>
                <td className="border-border border-b px-3 py-2.5">유리</td>
                <td className="border-border border-b px-3 py-2.5">고정 기간 중 유리</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  금리 인하 시
                </th>
                <td className="border-border border-b px-3 py-2.5">유리</td>
                <td className="border-border border-b px-3 py-2.5">불리</td>
                <td className="border-border border-b px-3 py-2.5">변동 전환 후 유리</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  월 상환액 예측
                </th>
                <td className="px-3 py-2.5">어려움</td>
                <td className="px-3 py-2.5">용이</td>
                <td className="px-3 py-2.5">고정 기간 중 용이</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-rate-type-current-level">
        <h2 id="guide-rate-type-current-level" className="text-foreground text-xl font-semibold tracking-tight">
          2026년 4월 현재 금리 수준
        </h2>
        <p>
          한국은행은 2026년 4월 기준금리를 2.50%로 동결했습니다. 중동전쟁에 따른 물가 상방압력과 성장 하방압력이 동시에 확대되며
          금융·외환시장 변동성이 커진 상황입니다.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              2026년 4월 금리 유형별 현재 수준
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  금리 유형
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  현재 수준
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  한국은행 기준금리
                </th>
                <td className="border-border border-b px-3 py-2.5">2.50%(동결)</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  시중은행 변동금리
                </th>
                <td className="border-border border-b px-3 py-2.5">연 4.44% ~ 5.26%</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  시중은행 고정금리(상단)
                </th>
                <td className="border-border border-b px-3 py-2.5">연 7.01%</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  혼합형 고정금리(5년)
                </th>
                <td className="px-3 py-2.5">연 4.42% ~ 7.02%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-rate-type-selection">
        <h2 id="guide-rate-type-selection" className="text-foreground text-xl font-semibold tracking-tight">
          금리 유형별 선택 기준
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              상황별 적합한 금리 유형
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  상황
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  적합한 금리 유형
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  금리 추가 인상이 예상되는 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">고정금리</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  금리 인하가 예상되는 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">변동금리</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  대출 기간이 10년 이상인 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">고정금리 또는 혼합형</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  단기(3년 이내) 상환 계획이 있는 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">변동금리</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  월 상환액 안정성이 중요한 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">고정금리 또는 혼합형</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  초기 이자 부담을 낮추고 싶은 경우
                </th>
                <td className="px-3 py-2.5">변동금리</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-rate-type-monthly-change">
        <h2 id="guide-rate-type-monthly-change" className="text-foreground text-xl font-semibold tracking-tight">
          금리 변동에 따른 월 상환액 변화 예시
        </h2>
        <p className="text-muted-foreground text-sm">대출 원금 3억 원, 30년 원리금균등상환 가정</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              금리별 월 상환액 변화(예시)
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  금리
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  월 상환액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  4.0%
                </th>
                <td className="border-border border-b px-3 py-2.5">약 143만 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  4.5%
                </th>
                <td className="border-border border-b px-3 py-2.5">약 152만 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  5.0%
                </th>
                <td className="border-border border-b px-3 py-2.5">약 161만 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  5.5%
                </th>
                <td className="border-border border-b px-3 py-2.5">약 170만 원</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  6.0%
                </th>
                <td className="px-3 py-2.5">약 180만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>변동금리 대출은 금리가 1%p 상승할 때마다 월 상환액이 약 17~18만 원 증가합니다.</p>
      </section>

      <section className="space-y-3" aria-labelledby="guide-rate-type-consideration">
        <h2 id="guide-rate-type-consideration" className="text-foreground text-xl font-semibold tracking-tight">
          현시점 선택 시 고려사항
        </h2>
        <p>
          현재 기준금리가 동결 기조를 유지하고 있으나, 물가 상승과 금융·외환시장 변동성 확대로 향후 금리 방향에 대한 불확실성이 높은
          상태입니다. 장기 대출일수록 금리 변동 리스크에 노출되는 기간이 길어지므로 고정금리 또는 혼합형 선택이 안정적입니다.
        </p>
        <p className="text-muted-foreground text-sm">
          ※ 금리 전망은 대외 변수에 따라 달라질 수 있으며, 개인의 소득 안정성과 상환 계획을 종합적으로 고려해 선택해야 합니다.
        </p>
      </section>

      <aside
        className="bg-muted/40 text-muted-foreground space-y-3 rounded-lg border p-4 text-sm leading-relaxed"
        role="note"
        aria-label="계산기 이동"
      >
        <p>
          <Link href="/#calculator" className="text-primary font-medium underline-offset-4 hover:underline">
            금리 유형별 월 상환액 차이는 대출 이자 계산기에서 직접 비교해볼 수 있다.
          </Link>
        </p>
      </aside>
    </>
  );
}
