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

export const monthlyChartData = [
  {
    month: 'Jan',
    total: 11,
  },
  {
    month: 'Feb',
    total: 15,
  },
  {
    month: 'Mar',
    total: 5,
  },
  {
    month: 'Apr',
    total: 10,
  },
  {
    month: 'May',
    total: 9,
  },
  {
    month: 'Jun',
    total: 10,
  },
  {
    month: 'Jul',
    total: 8,
  },
  {
    month: 'Aug',
    total: 7,
  },
  {
    month: 'Sep',
    total: 6,
  },
  {
    month: 'Oct',
    total: 13,
  },
  {
    month: 'Nov',
    total: 4,
  },
  {
    month: 'Dec',
    total: 9,
  },
];

export default function StatsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyChartData}>
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
          labelStyle={{
            color: 'rgb(var(--foreground))',
            fontWeight: 500,
          }}
          itemStyle={{
            color: 'var(--_primary)',
            textTransform: 'capitalize',
            fontWeight: 500,
          }}
          cursor={{ fill: 'rgb(var(--accent))' }}
        />
        <Bar dataKey="total" fill="rgb(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
