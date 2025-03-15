import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import queryString from 'query-string';

import { ApiJob, ApiJobs, ApiJobsStats, ApiMessage, Job } from '~/schemas/job';
import { apiClient } from '~/lib/axios-instance';
import { jobIdAtom } from '~/atoms/job-id';
import { toast } from '~/components/ui/use-toast';

import { useFilter } from '../useQueryParams';

const jobsQueryKey = 'jobs';
/* queries */
const getJobs = async (queryString: string) => {
  const response = await apiClient.get(`/jobs/${queryString}`);

  return ApiJobs.parse(response.data);
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
  const response = await apiClient.get(`/jobs/${jobId}`);

  return ApiJob.parse(response.data);
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
  const response = await apiClient.get(`/jobs/stats`);

  return ApiJobsStats.parse(response.data);
};
export function useGetJobsStats() {
  return useQuery({
    queryKey: [jobsQueryKey, 'stats'],
    queryFn: getJobsStats,
  });
}

/* mutations */
const addJob = async (payload: Job) => {
  const response = await apiClient.post(`/jobs`, payload);

  return ApiMessage.parse(response.data);
};
export function useAddJob() {
  const queryClient = useQueryClient();

  return useMutation({
    /* mutation fn only takes one param: (params, queryInfo) */
    mutationFn: addJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey],
      });
      toast({
        description: data.msg,
      });
    },
  });
}

const editJob = async (payload: { jobId: string; data: Job }) => {
  const response = await apiClient.patch(
    `/jobs/${payload.jobId}`,
    payload.data,
  );

  return ApiMessage.parse(response.data);
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
  });
}

const deleteJob = async (jobId: string) => {
  const response = await apiClient.delete(`/jobs/${jobId}`);

  return ApiMessage.parse(response.data);
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
  });
}
