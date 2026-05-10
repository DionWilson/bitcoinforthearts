'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ResearchChartDefinition } from '@/lib/research';

export default function ResearchBarChart({
  chart,
  valueSuffix = '%',
}: {
  chart: ResearchChartDefinition;
  valueSuffix?: string;
}) {
  return (
    <figure className="rounded-2xl border border-border bg-surface p-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{chart.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{chart.description}</p>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="rgba(0,0,0,0.12)" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: 'rgba(0,0,0,0.18)' }}
              tick={{ fill: 'rgba(0,0,0,0.68)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(0,0,0,0.68)', fontSize: 12 }}
              tickFormatter={(value) => `${value}${valueSuffix}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,79,20,0.08)' }}
              contentStyle={{
                borderColor: 'rgba(0,0,0,0.16)',
                borderRadius: '0.75rem',
                background: '#fffaf0',
                color: '#000',
              }}
              formatter={(value) => [`${value}${valueSuffix}`, 'Value']}
            />
            <Bar dataKey="value" fill="#ff4f14" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
