import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import queryString from 'query-string';

import { siteConfig } from '~/config/site';
import { ApiJob, ApiJobs, ApiJobsStats, ApiMessage, Job } from '~/schemas/job';
import { Token } from '~/lib/types';
import { jobIdAtom } from '~/atoms/job-id';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

import { useFilter } from '../useQueryParams';

const jobsQueryKey = 'jobs';
/* queries */
const getJobs = async (token: Token, queryString: string) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs/${queryString}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch jobs');
  }

  const result = ApiJobs.safeParse(data);
  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobs() {
  const token = useAtomValue(accessTokenAtom);

  const [filter] = useFilter();

  const qs = `?${queryString.stringify(filter)}`;

  return useQuery({
    queryKey: [jobsQueryKey, qs],
    queryFn: () => getJobs(token, qs),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });
}

const getJob = async (token: Token, jobId: string) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch job');
  }

  const result = ApiJob.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  return useQuery({
    queryKey: [jobsQueryKey, jobId],
    queryFn: () => getJob(token, jobId),
    enabled: !!token && !!jobId,
  });
}

const getJobsStats = async (token: Token) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch jobs stats');
  }

  const result = ApiJobsStats.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobsStats() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: [jobsQueryKey, 'stats'],
    queryFn: () => getJobsStats(token),
    enabled: !!token,
  });
}

/* mutations */
const addJob = async (token: Token, payload: Job) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs`, {
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

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useAddJob() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  return useMutation({
    /* 
    - mutation fn only takes one param
    - auto passes the payload as arg to fetcher when the fetcher has a single param(the payload)
    */
    mutationFn: (payload: Job) => addJob(token, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey],
      });
      toast({
        description: data.msg,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
}

const editJob = async (token: Token, jobId: string, payload: Job) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs/${jobId}`, {
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

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useEditJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Job) => editJob(token, jobId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey],
      });
      toast({
        description: data.msg,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
}

const deleteJob = async (token: Token, jobId: string) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to delete job');
  }

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useDeleteJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteJob(token, jobId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey],
      });
      toast({
        description: data.msg,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
}
