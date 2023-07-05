import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { z } from 'zod';

import { BASE_URL } from '~/lib/api';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';
import { Job } from '~/components/dashboard/add-job-form';

type TResponse = {
  msg: string;
};

const addJob = async (
  token: string | null,
  payload: Job
): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to add job');
  }

  return data;
};

export function useAddJob() {
  const token = useAtomValue(accessTokenAtom);

  const { mutate, isLoading } = useMutation({
    /* 
    - mutation fn only takes one param
    - auto passes the payload as arg to fetcher when the fetcher has a single param(the payload)
    */
    mutationFn: (payload: Job) => addJob(token, payload),
    onSuccess: (data) => {
      toast({
        description: data.msg,
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
      });
    },
  });

  return { mutate, isLoading };
}

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
type TJobStats = z.infer<typeof statsSchema>;

const getJobStats = async (token: string | null) => {
  const response = await fetch(`${BASE_URL}/jobs/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch stats');
  }

  return data;
};

export function useGetJobStats() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery<TJobStats, Error>({
    queryKey: ['job-stats'],
    queryFn: () => getJobStats(token),
    enabled: !!token,
  });
}
