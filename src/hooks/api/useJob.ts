import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import {
  jobAPIResponseSchema,
  TJob,
  TJobsAPIResponse,
  TJobsStats,
  TMutationResponse,
} from '~/schemas/job';
import { BASE_URL } from '~/lib/api';
import { jobIdAtom } from '~/atoms/job-id';
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

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
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

  return { mutate, isLoading };
}

/* get jobs */
const getJobs = async (token: string | null, queryParams: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch jobs');
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

/* delete job */
const deleteJob = async (
  token: string | null,
  jobId: string
): Promise<TMutationResponse> => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: TMutationResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to delete job');
  }

  return data;
};
export function useDeleteJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
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

  return { mutate, isLoading };
}

/* get job */
const getJob = async (token: string | null, jobId: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch job');
  }

  const parsedData = jobAPIResponseSchema.parse(data);

  return parsedData;
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

/* edit job */
const editJob = async (
  token: string | null,
  jobId: string,
  payload: TJob
): Promise<TMutationResponse> => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TMutationResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to edit job');
  }

  return data;
};
export function useEditJob() {
  const token = useAtomValue(accessTokenAtom);
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
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

  return { mutate, isLoading };
}
