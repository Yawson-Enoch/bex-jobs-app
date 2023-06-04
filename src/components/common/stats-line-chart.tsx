'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { monthlyChartData } from './stats-bar-chart';

export default function StatsLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyChartData}>
        <CartesianGrid
          stroke="rgb(var(--primary))"
          strokeOpacity={0.3}
          strokeDasharray="2 2"
        />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            width: 100,
            backgroundColor: 'rgba(var(--background),0.3)',
            color: 'rgb(var(--foreground))',
            border: '1px solid rgb(var(--border))',
            borderRadius: 'calc(var(--radius) - 2px)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          itemStyle={{
            color: 'var(--_primary)',
            textTransform: 'capitalize',
            fontWeight: 500,
          }}
          cursor={{ stroke: 'var(--_primary)', strokeOpacity: 0.5 }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="rgb(var(--primary))"
          strokeWidth={2}
          dot={{ r: 2, fill: 'rgb(var(--foreground))' }}
          activeDot={{
            r: 4,
            fill: 'var(--_primary)',
            stroke: 'rgb(var(--foreground))',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
