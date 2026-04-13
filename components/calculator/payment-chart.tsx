"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScheduleRow } from "@/lib/loan-calculations";
import { formatNumber } from "@/lib/loan-calculations";

function formatAxisWon(v: number) {
  return `${formatNumber(v / 10000)}만`;
}

export interface PaymentChartProps {
  schedule: ScheduleRow[];
  compareSchedule?: ScheduleRow[] | null;
  labelPrimary?: string;
  labelCompare?: string;
}

export function PaymentChart({
  schedule,
  compareSchedule,
  labelPrimary = "월상환액",
  labelCompare = "비교",
}: PaymentChartProps) {
  const isCompare = Boolean(compareSchedule?.length);

  if (isCompare && compareSchedule) {
    const len = Math.max(schedule.length, compareSchedule.length);
    const data = Array.from({ length: len }, (_, i) => ({
      month: i + 1,
      primary: schedule[i]?.payment ?? null,
      compare: compareSchedule[i]?.payment ?? null,
    }));

    return (
      <div className="h-[300px] w-full md:h-[340px]" role="img" aria-label="두 상환 방식 월상환액 비교 차트">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} label={{ value: "회차(월)", position: "insideBottom", offset: -4 }} />
            <YAxis tickFormatter={formatAxisWon} tick={{ fontSize: 11 }} width={56} />
            <Tooltip
              formatter={(value) => [
                `${formatNumber(Number(value ?? 0))}원`,
                "",
              ]}
              labelFormatter={(l) => `${l}회차`}
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="primary"
              name={labelPrimary}
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="compare"
              name={labelCompare}
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const data = schedule.map((s) => ({
    month: s.month,
    principal: s.principal,
    interest: s.interest,
    payment: s.payment,
  }));

  return (
    <div
      className="h-[300px] w-full md:h-[340px]"
      role="img"
      aria-label="월상환액, 상환원금, 이자 추이 차트"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} label={{ value: "회차(월)", position: "insideBottom", offset: -4 }} />
          <YAxis tickFormatter={formatAxisWon} tick={{ fontSize: 11 }} width={56} />
          <Tooltip
            formatter={(value, name) => [`${formatNumber(Number(value ?? 0))}원`, String(name)]}
            labelFormatter={(l) => `${l}회차`}
            contentStyle={{ borderRadius: 8 }}
          />
          <Legend />
          <Area type="monotone" dataKey="interest" name="이자" stackId="a" fill="rgba(239,68,68,0.35)" stroke="rgba(239,68,68,0.8)" />
          <Area
            type="monotone"
            dataKey="principal"
            name="상환원금"
            stackId="a"
            fill="rgba(16,185,129,0.35)"
            stroke="rgba(16,185,129,0.85)"
          />
          <Line type="monotone" dataKey="payment" name="월상환액" stroke="#2563eb" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
