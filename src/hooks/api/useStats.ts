import { useQuery } from '@tanstack/react-query';
import { accessTokenAtom } from '~/atoms/token';
import { useAtomValue } from 'jotai';
import { z } from 'zod';

import { BASE_URL } from '~/lib/api';

const statusSchema = z.object({
  pending: z.number().catch(0),
  interview: z.number().catch(0),
  declined: z.number().catch(0),
});

const monthlyApplicationsSchema = z.array(
  z.object({
    date: z.string(),
    count: z.number(),
  })
);

const statsSchema = z.object({
  msg: z.string(),
  statusStats: statusSchema,
  monthlyApplications: monthlyApplicationsSchema,
});
type TStats = z.infer<typeof statsSchema>;

const getStats = async (token: string | null) => {
  const response = await fetch(`${BASE_URL}/jobs/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch stats');
  }

  return data;
};

export default function useGetStats() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery<TStats, Error>({
    queryKey: ['stats'],
    queryFn: () => getStats(token),
    enabled: !!token,
  });
}
