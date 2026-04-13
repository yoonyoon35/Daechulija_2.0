export type RepaymentType = "equal-payment" | "equal-principal" | "bullet";

export interface ScheduleRow {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

export interface CalculationResult {
  monthlyPayment: number;
  schedule: ScheduleRow[];
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
}

export function removeCommas(value: string): string {
  return value.toString().replace(/,/g, "");
}

export function calculateEqualPayment(
  principal: number,
  annualRate: number,
  months: number,
  graceMonths = 0,
): CalculationResult {
  const monthlyRate = annualRate / 100 / 12;
  const repaymentMonths = months - graceMonths;

  if (repaymentMonths <= 0) {
    const schedule: ScheduleRow[] = [];
    for (let month = 1; month <= months; month++) {
      const interest = principal * monthlyRate;
      schedule.push({
        month,
        principal: 0,
        interest,
        payment: interest,
        balance: principal,
      });
    }
    return { monthlyPayment: principal * monthlyRate, schedule };
  }

  if (monthlyRate === 0) {
    const schedule: ScheduleRow[] = [];
    for (let month = 1; month <= graceMonths; month++) {
      schedule.push({
        month,
        principal: 0,
        interest: 0,
        payment: 0,
        balance: principal,
      });
    }
    const monthlyPrincipal = principal / repaymentMonths;
    for (let month = graceMonths + 1; month <= months; month++) {
      schedule.push({
        month,
        principal: monthlyPrincipal,
        interest: 0,
        payment: monthlyPrincipal,
        balance: principal - (month - graceMonths) * monthlyPrincipal,
      });
    }
    return { monthlyPayment: monthlyPrincipal, schedule };
  }

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths))) /
    (Math.pow(1 + monthlyRate, repaymentMonths) - 1);

  const schedule: ScheduleRow[] = [];
  let remainingPrincipal = principal;

  for (let month = 1; month <= graceMonths; month++) {
    const interest = remainingPrincipal * monthlyRate;
    schedule.push({
      month,
      principal: 0,
      interest,
      payment: interest,
      balance: remainingPrincipal,
    });
  }

  for (let month = graceMonths + 1; month <= months; month++) {
    const interest = remainingPrincipal * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    remainingPrincipal -= principalPayment;

    schedule.push({
      month,
      principal: principalPayment,
      interest,
      payment: monthlyPayment,
      balance: Math.max(0, remainingPrincipal),
    });
  }

  return { monthlyPayment, schedule };
}

export function calculateEqualPrincipal(
  principal: number,
  annualRate: number,
  months: number,
  graceMonths = 0,
): CalculationResult {
  const monthlyRate = annualRate / 100 / 12;
  const repaymentMonths = months - graceMonths;

  if (repaymentMonths <= 0) {
    const schedule: ScheduleRow[] = [];
    for (let month = 1; month <= months; month++) {
      const interest = principal * monthlyRate;
      schedule.push({
        month,
        principal: 0,
        interest,
        payment: interest,
        balance: principal,
      });
    }
    return { monthlyPayment: principal * monthlyRate, schedule };
  }

  const monthlyPrincipal = principal / repaymentMonths;
  const schedule: ScheduleRow[] = [];
  let remainingPrincipal = principal;

  for (let month = 1; month <= graceMonths; month++) {
    const interest = remainingPrincipal * monthlyRate;
    schedule.push({
      month,
      principal: 0,
      interest,
      payment: interest,
      balance: remainingPrincipal,
    });
  }

  for (let month = graceMonths + 1; month <= months; month++) {
    const interest = remainingPrincipal * monthlyRate;
    const payment = monthlyPrincipal + interest;
    remainingPrincipal -= monthlyPrincipal;

    schedule.push({
      month,
      principal: monthlyPrincipal,
      interest,
      payment,
      balance: Math.max(0, remainingPrincipal),
    });
  }

  const firstRepaymentPayment =
    graceMonths > 0 ? schedule[graceMonths]!.payment : schedule[0]!.payment;

  return { monthlyPayment: firstRepaymentPayment, schedule };
}

export function calculateBulletPayment(
  principal: number,
  annualRate: number,
  months: number,
): CalculationResult {
  const monthlyRate = annualRate / 100 / 12;
  const schedule: ScheduleRow[] = [];

  for (let month = 1; month < months; month++) {
    const interest = principal * monthlyRate;
    schedule.push({
      month,
      principal: 0,
      interest,
      payment: interest,
      balance: principal,
    });
  }

  const lastInterest = principal * monthlyRate;
  schedule.push({
    month: months,
    principal,
    interest: lastInterest,
    payment: principal + lastInterest,
    balance: 0,
  });

  return { monthlyPayment: principal * monthlyRate, schedule };
}

export function runCalculation(
  repaymentType: RepaymentType,
  principal: number,
  annualRate: number,
  loanPeriodMonths: number,
  graceYears: number,
): CalculationResult {
  const graceMonths = graceYears * 12;
  if (repaymentType === "equal-payment") {
    return calculateEqualPayment(principal, annualRate, loanPeriodMonths, graceMonths);
  }
  if (repaymentType === "equal-principal") {
    return calculateEqualPrincipal(principal, annualRate, loanPeriodMonths, graceMonths);
  }
  return calculateBulletPayment(principal, annualRate, loanPeriodMonths);
}

export const repaymentTypeLabels: Record<RepaymentType, string> = {
  "equal-payment": "원리금균등상환",
  "equal-principal": "원금균등상환",
  bullet: "만기일시상환",
};
