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
import { apiClient } from '~/lib/axios-instance';
import { jobIdAtom } from '~/atoms/job-id';
import { toast } from '~/components/ui/use-toast';

import { useFilter } from '../useQueryParams';

const jobsQueryKey = 'jobs';
/* queries */
const getJobs = async (queryString: string) => {
  const { data } = await apiClient.get(
    `${siteConfig.apiBaseUrl}/jobs/${queryString}`,
  );

  const result = ApiJobs.safeParse(data);
  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobs() {
  const [filter] = useFilter();

  const qs = `?${queryString.stringify(filter)}`;

  return useQuery({
    queryKey: [jobsQueryKey, qs],
    queryFn: () => getJobs(qs),
    placeholderData: keepPreviousData,
  });
}

const getJob = async (jobId: string) => {
  const { data } = await apiClient.get(
    `${siteConfig.apiBaseUrl}/jobs/${jobId}`,
  );

  const result = ApiJob.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJob() {
  const jobId = useAtomValue(jobIdAtom);

  return useQuery({
    queryKey: [jobsQueryKey, jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
  });
}

const getJobsStats = async () => {
  const { data } = await apiClient.get(`${siteConfig.apiBaseUrl}/jobs/stats`);

  const result = ApiJobsStats.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetJobsStats() {
  return useQuery({
    queryKey: [jobsQueryKey, 'stats'],
    queryFn: getJobsStats,
  });
}

/* mutations */
const addJob = async (payload: Job) => {
  const { data } = await apiClient.post(
    `${siteConfig.apiBaseUrl}/jobs`,
    payload,
  );

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useAddJob() {
  const queryClient = useQueryClient();

  return useMutation({
    /* 
    - mutation fn only takes one param
    - auto passes the payload as arg to fetcher when the fetcher has a single param(the payload)
    */
    mutationFn: addJob,
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

const editJob = async (payload: { jobId: string; data: Job }) => {
  const { data } = await apiClient.patch(
    `${siteConfig.apiBaseUrl}/jobs/${payload.jobId}`,
    payload.data,
  );

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useEditJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editJob,
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

const deleteJob = async (jobId: string) => {
  const { data } = await apiClient.delete(
    `${siteConfig.apiBaseUrl}/jobs/${jobId}`,
  );

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useDeleteJob() {
  const jobId = useAtomValue(jobIdAtom);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteJob(jobId),
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
