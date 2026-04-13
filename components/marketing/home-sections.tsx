import Image from "next/image";
import Link from "next/link";
import { referenceDisclaimerLine } from "@/lib/site";

function GuideCard({
  icon,
  title,
  children,
  ctaHref,
  ctaLabel,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <article className="bg-card rounded-xl border p-4 shadow-sm ring-1 ring-foreground/10 sm:p-6">
      <div className="text-2xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <div className="text-muted-foreground mt-3 space-y-3 text-sm leading-relaxed">{children}</div>
      <p className="mt-4">
        <Link href={ctaHref} className="text-primary text-sm font-medium underline-offset-4 hover:underline">
          {ctaLabel}
        </Link>
      </p>
    </article>
  );
}

export function HeroSection() {
  return (
    <section className="from-primary/10 via-background to-background border-b bg-gradient-to-b py-10 sm:py-14" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:gap-10">
        <div className="relative mx-auto size-20 shrink-0 md:mx-0 md:size-24">
          <Image
            src="/favicon/apple-touch-icon-152x152.png"
            alt=""
            width={152}
            height={152}
            className="size-full rounded-2xl object-cover shadow-md"
            priority
          />
        </div>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <h1 id="hero-title" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            대출 받기 전에 이자 먼저 계산해보세요
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
            대출 이자 계산기로 예상 상환 금액을 미리 확인하고, 원리금균등·원금균등·만기일시 상환을 비교해 보세요. 주택담보·신용·전세자금 등
            다양한 대출 시나리오에 활용할 수 있습니다. {referenceDisclaimerLine}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GuideSection() {
  return (
    <section id="guide" className="scroll-mt-24 py-10 sm:py-14" aria-labelledby="guide-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="guide-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          대출 상환 방식 상세 안내
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
          <GuideCard
            icon="📊"
            title="원리금균등상환"
            ctaHref="/?type=equal-payment#calculator"
            ctaLabel="원리금균등상환으로 계산하기"
          >
            <p>매월 동일한 금액을 납부하는 가장 흔한 방식입니다. 초기에는 이자 비중이 크고, 후기에는 원금 비중이 커집니다.</p>
            <p>월 상환액이 일정해 예산 관리가 쉽지만, 원금균등에 비해 총 이자가 더 클 수 있습니다.</p>
          </GuideCard>
          <GuideCard
            icon="📈"
            title="원금균등상환"
            ctaHref="/?type=equal-principal#calculator"
            ctaLabel="원금균등상환으로 계산하기"
          >
            <p>매월 같은 원금을 갚고 잔액 이자를 더하는 방식으로, 초기 상환액은 높지만 이후 점차 줄어듭니다.</p>
            <p>총 이자 부담을 줄이고 싶다면 유리할 수 있으나, 초기 현금 부담이 큽니다.</p>
          </GuideCard>
          <GuideCard
            icon="💳"
            title="만기일시상환"
            ctaHref="/?type=bullet#calculator"
            ctaLabel="만기일시상환으로 계산하기"
          >
            <p>기간 중에는 이자만 납부하고, 만기에 원금을 한 번에 상환합니다. 평소 부담은 적지만 만기 대비가 필요합니다.</p>
          </GuideCard>
          <GuideCard icon="⚖️" title="상환 방식 비교" ctaHref="/#faq" ctaLabel="비교 기능 사용법(FAQ)">
            <p>두 상환 방식의 월 상환·총 이자·그래프를 한 화면에서 비교할 수 있습니다.</p>
          </GuideCard>
          <GuideCard icon="⏸️" title="거치기간" ctaHref="/#calculator" ctaLabel="거치기간 설정 후 계산하기">
            <p>일정 기간 원금을 미루고 이자만 납부하는 구조입니다. 초기 부담은 줄지만 총 이자는 늘 수 있고, 거치 후 상환액이 커질 수 있습니다.</p>
          </GuideCard>
        </div>
      </div>
    </section>
  );
}

const bankLinks = [
  { label: "KB국민은행 대출보기", href: "https://obank.kbstar.com/quics?page=C019205", className: "bg-yellow-400 text-black hover:bg-yellow-300" },
  { label: "신한은행 대출보기", href: "https://bank.shinhan.com/index.jsp#020300000000", className: "bg-blue-700 text-white hover:bg-blue-600" },
  { label: "하나은행 대출보기", href: "https://www.kebhana.com/cont/mall/mall17/index.jsp", className: "bg-emerald-700 text-white hover:bg-emerald-600" },
  { label: "우리은행 대출보기", href: "https://spot.wooribank.com/pot/Dream?withyou=POLON0021", className: "bg-blue-600 text-white hover:bg-blue-500" },
  { label: "NH농협 대출보기", href: "https://smartmarket.nonghyup.com/servlet/BFLNW0000R.view", className: "bg-green-700 text-white hover:bg-green-600" },
] as const;

export function LoanInfoSection() {
  return (
    <section id="loan-info" className="scroll-mt-24 bg-muted/30 py-10 sm:py-14" aria-labelledby="loan-info-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="loan-info-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          대출 상품별 이자율 및 특징
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
          <article className="bg-card rounded-xl border p-4 ring-1 ring-foreground/10 sm:p-6">
            <div className="text-2xl" aria-hidden>
              🏠
            </div>
            <h3 className="mt-2 text-lg font-semibold">주택담보대출</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              담보로 금리가 낮은 편이며, 원리금균등과 거치기간 옵션이 흔합니다. LTV·감정가에 따라 한도가 달라집니다.
            </p>
          </article>
          <article className="bg-card rounded-xl border p-4 ring-1 ring-foreground/10 sm:p-6">
            <div className="text-2xl" aria-hidden>
              💳
            </div>
            <h3 className="mt-2 text-lg font-semibold">신용대출</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              담보 없이 신용으로 받는 대출로 금리가 높을 수 있습니다. DSR·신용등급이 한도와 금리에 큰 영향을 줍니다.
            </p>
          </article>
          <article className="bg-card rounded-xl border p-4 ring-1 ring-foreground/10 sm:p-6">
            <div className="text-2xl" aria-hidden>
              🔑
            </div>
            <h3 className="mt-2 text-lg font-semibold">전세자금대출</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              전세 보증금을 담보로 하는 경우가 많아 신용대출보다 금리가 유리한 편입니다. 계약·담보 조건을 꼭 확인하세요.
            </p>
          </article>
          <article className="bg-card rounded-xl border p-4 ring-1 ring-foreground/10 sm:p-6">
            <div className="text-2xl" aria-hidden>
              💡
            </div>
            <h3 className="mt-2 text-lg font-semibold">계산에 포함되지 않는 항목</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              수수료·보험료·중도상환 수수료 등은 기관·상품마다 달라 화면에 반영되지 않을 수 있습니다.
            </p>
          </article>
          <article className="bg-card rounded-xl border p-4 ring-1 ring-foreground/10 md:col-span-2 sm:p-6">
            <div className="text-2xl" aria-hidden>
              🏦
            </div>
            <h3 className="mt-2 text-lg font-semibold">주요 은행 홈페이지 바로가기</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              대략적인 상환 계획을 세운 뒤, 관심 기관의 공식 조건을 함께 확인하세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {bankLinks.map((b) => (
                <a
                  key={b.href}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${b.className}`}
                  role="listitem"
                >
                  {b.label}
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
