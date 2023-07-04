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

import { useGetJobStats } from '~/hooks/api/useJob';

import ErrorDisplay from '../common/error-display';
import LoadingIndicator from '../common/loading-indicator';

export default function StatsBarChart() {
  const { isLoading, isError, error, data: stats } = useGetJobStats();

  if (isLoading) {
    return (
      <LoadingIndicator
        msg="Loading chart..."
        className="flex justify-center"
      />
    );
  }

  if (isError) {
    return <ErrorDisplay msg={error.message} className="flex justify-center" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={stats.monthlyApplications} maxBarSize={70}>
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
          cursor={{ fill: 'rgb(var(--accent))' }}
        />
        <Bar dataKey="count" fill="rgb(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
