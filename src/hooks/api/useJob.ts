import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import {
  TJob,
  TJobsAPIResponse,
  TJobsStats,
  TMutationResponse,
} from '~/schemas/job';
import { BASE_URL } from '~/lib/api';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

/* add job */
const addJob = async (
  token: string | null,
  payload: TJob
): Promise<TMutationResponse> => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TMutationResponse = await response.json();

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
    mutationFn: (payload: TJob) => addJob(token, payload),
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

/* get jobs */
const getJobs = async (token: string | null, queryParams: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch stats');
  }

  return data;
};

export function useGetJobs(queryParams: string) {
  const token = useAtomValue(accessTokenAtom);

  return useQuery<TJobsAPIResponse, Error>({
    queryKey: ['jobs', queryParams],
    queryFn: () => getJobs(token, queryParams),
    enabled: !!token,
    keepPreviousData: true,
  });
}

/* get jobs stats */
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

  return useQuery<TJobsStats, Error>({
    queryKey: ['job-stats'],
    queryFn: () => getJobStats(token),
    enabled: !!token,
  });
}
