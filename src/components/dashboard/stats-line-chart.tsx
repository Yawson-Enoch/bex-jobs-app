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

import { useGetJobsStats } from '~/hooks/api/useJob';

import Skeleton from '../ui/skeleton';

export default function StatsLineChart() {
  const { isLoading, isError, data: stats } = useGetJobsStats();

  return (
    <ResponsiveContainer width="100%" height={300}>
      {isLoading || isError ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <LineChart data={stats?.monthlyApplications}>
          <CartesianGrid
            stroke="rgb(var(--primary))"
            strokeOpacity={0.3}
            strokeDasharray="2 2"
          />
          <XAxis dataKey="date" />
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
              color: 'rgb(var(--secondary))',
              textTransform: 'capitalize',
              fontWeight: 500,
            }}
            cursor={{ stroke: 'rgb(var(--primary))', strokeOpacity: 0.5 }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="rgb(var(--primary))"
            strokeWidth={2}
            dot={{ r: 2, fill: 'rgb(var(--foreground))' }}
            activeDot={{
              r: 4,
              fill: 'rgb(var(--primary))',
              stroke: 'rgb(var(--foreground))',
            }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}
