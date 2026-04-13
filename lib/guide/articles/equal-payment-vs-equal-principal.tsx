import Link from "next/link";

export const equalPaymentVsEqualPrincipalMeta = {
  slug: "equal-payment-vs-equal-principal",
  title: "원리금균등상환 vs 원금균등상환 비교",
  description:
    "원리금균등상환과 원금균등상환의 월 상환 구조, 총 이자, 초기 부담 차이를 표로 비교해 상환 방식 선택에 도움을 주는 안내입니다.",
  updated: "2026년 4월 13일",
} as const;

export function EqualPaymentVsEqualPrincipalBody() {
  return (
    <>
      <p>
        두 방식 모두 매월 원금과 이자를 함께 상환하는 분할상환 방식입니다. 차이는 매월 상환액을 어떻게 구성하느냐에 있습니다.
      </p>

      <section className="space-y-4" aria-labelledby="guide-equal-core-diff">
        <h2 id="guide-equal-core-diff" className="text-foreground text-xl font-semibold tracking-tight">
          핵심 차이
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              원리금균등상환 vs 원금균등상환 핵심 비교
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  구분
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  원리금균등상환
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  원금균등상환
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  매월 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">일정</td>
                <td className="border-border border-b px-3 py-2.5">초기 높고 점차 감소</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  매월 원금 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">초기 적고 점차 증가</td>
                <td className="border-border border-b px-3 py-2.5">일정</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  총 이자 부담
                </th>
                <td className="border-border border-b px-3 py-2.5">상대적으로 많음</td>
                <td className="border-border border-b px-3 py-2.5">상대적으로 적음</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  초기 상환 부담
                </th>
                <td className="border-border border-b px-3 py-2.5">낮음</td>
                <td className="border-border border-b px-3 py-2.5">높음</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  가계 예산 관리
                </th>
                <td className="px-3 py-2.5">용이</td>
                <td className="px-3 py-2.5">복잡</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="guide-equal-example-compare">
        <h2 id="guide-equal-example-compare" className="text-foreground text-xl font-semibold tracking-tight">
          예시 비교
        </h2>
        <p className="text-muted-foreground text-sm">
          대출 원금 2억 원, 금리 4%, 상환 기간 30년 가정
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              상환 방식별 월 상환액·총 상환액 비교(예시)
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  항목
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  원리금균등
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  원금균등
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  1회차 월 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">약 95만 5천 원</td>
                <td className="border-border border-b px-3 py-2.5">약 122만 2천 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  120회차 월 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">약 95만 5천 원</td>
                <td className="border-border border-b px-3 py-2.5">약 100만 6천 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  240회차 월 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">약 95만 5천 원</td>
                <td className="border-border border-b px-3 py-2.5">약 78만 9천 원</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  총 상환액
                </th>
                <td className="border-border border-b px-3 py-2.5">약 3억 4,400만 원</td>
                <td className="border-border border-b px-3 py-2.5">약 3억 2,100만 원</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  총 이자액
                </th>
                <td className="px-3 py-2.5">약 1억 4,400만 원</td>
                <td className="px-3 py-2.5">약 1억 2,100만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          같은 조건에서 원금균등상환의 총 이자 부담이 약 2,300만 원 적습니다. 단, 초기 월 상환액은 원금균등상환이 약 27만 원 더
          높습니다.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="guide-equal-selection-criteria">
        <h2 id="guide-equal-selection-criteria" className="text-foreground text-xl font-semibold tracking-tight">
          상환 방식 선택 기준
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <caption className="border-b border-border bg-muted/50 px-3 py-2 text-left text-sm font-medium text-foreground">
              상황별 추천 상환 방식
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  상황
                </th>
                <th scope="col" className="border-border border-b px-3 py-2.5 font-semibold">
                  적합한 방식
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  월 소득이 일정하고 예산 관리가 중요한 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">원리금균등</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  초기 여유 자금이 충분한 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">원금균등</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  장기 대출로 총 이자 부담을 줄이고 싶은 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">원금균등</td>
              </tr>
              <tr>
                <th scope="row" className="border-border border-b px-3 py-2.5 font-medium">
                  퇴직 후 상환 부담 감소를 원하는 경우
                </th>
                <td className="border-border border-b px-3 py-2.5">원금균등</td>
              </tr>
              <tr className="bg-muted/20">
                <th scope="row" className="px-3 py-2.5 font-medium">
                  대출 초기 자금 여유가 없는 경우
                </th>
                <td className="px-3 py-2.5">원리금균등</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="guide-equal-prepayment">
        <h2 id="guide-equal-prepayment" className="text-foreground text-xl font-semibold tracking-tight">
          중도상환 계획이 있는 경우
        </h2>
        <p>
          중도상환을 계획하고 있다면 두 방식의 총 이자 차이는 줄어듭니다. 어느 방식이든 초기에 상환할수록 이자 절감 효과가 크며,
          중도상환 수수료를 먼저 확인하는 것이 선행되어야 합니다.
        </p>
        <p className="text-muted-foreground text-sm">
          ※ 위 예시는 이해를 돕기 위한 참고값이며, 실제 상환액은 금융기관별 계산 방식에 따라 차이가 있을 수 있습니다.
        </p>
      </section>

      <aside
        className="bg-muted/40 text-muted-foreground space-y-3 rounded-lg border p-4 text-sm leading-relaxed"
        role="note"
        aria-label="계산기 이동"
      >
        <p>
          <Link href="/#calculator" className="text-primary font-medium underline-offset-4 hover:underline">
            내 대출 조건에 맞는 두 방식의 상환액 차이 계산
          </Link>
        </p>
      </aside>
    </>
  );
}
