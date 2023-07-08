import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import {
  jobAPISchema,
  jobsAPISchema,
  jobsStatsAPISchema,
  mutationResponseSchema,
  TJob,
} from '~/schemas/job';
import { BASE_URL } from '~/lib/api';
import { TToken } from '~/lib/types';
import { jobIdAtom } from '~/atoms/job-id';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

import useQueryParams from '../useQueryParams';

/* queries */
const getJobs = async (token: TToken, queryParams: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch jobs');
  }

  const result = jobsAPISchema.safeParse(data);
  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobs() {
  const token = useAtomValue(accessTokenAtom);

  const { combinedQueryParams } = useQueryParams();
  const queryParams = combinedQueryParams();

  return useQuery({
    queryKey: ['jobs', queryParams],
    queryFn: () => getJobs(token, queryParams),
    enabled: !!token && !!queryParams,
    keepPreviousData: true,
  });
}

const getJob = async (token: TToken, jobId: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch job');
  }

  const result = jobAPISchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJob(token, jobId),
    enabled: !!token && !!jobId,
  });
}

const getJobsStats = async (token: TToken) => {
  const response = await fetch(`${BASE_URL}/jobs/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch jobs stats');
  }

  const result = jobsStatsAPISchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobsStats() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['job-stats'],
    queryFn: () => getJobsStats(token),
    enabled: !!token,
  });
}

/* mutations */
const addJob = async (token: TToken, payload: TJob) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to add job');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useAddJob() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
    /* 
    - mutation fn only takes one param
    - auto passes the payload as arg to fetcher when the fetcher has a single param(the payload)
    */
    mutationFn: (payload: TJob) => addJob(token, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => (query.queryKey[0] as string).startsWith('job'),
      });
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

  return addJobMutation;
}

const editJob = async (token: TToken, jobId: string, payload: TJob) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to edit job');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useEditJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  const editJobMutation = useMutation({
    mutationFn: (payload: TJob) => editJob(token, jobId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => (query.queryKey[0] as string).startsWith('job'),
      });
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

  return editJobMutation;
}

const deleteJob = async (token: TToken, jobId: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to delete job');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error)
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useDeleteJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  const deleteJobMutation = useMutation({
    mutationFn: () => deleteJob(token, jobId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => (query.queryKey[0] as string).startsWith('job'),
      });
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

  return deleteJobMutation;
}
