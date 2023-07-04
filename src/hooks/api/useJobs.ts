import { useMutation } from '@tanstack/react-query';

import { BASE_URL } from '~/lib/api';
import { toast } from '~/components/ui/use-toast';
import { Job } from '~/components/dashboard/add-job-form';

type TResponse = {
  msg: string;
};

type TParams = {
  token: string | null;
  payload: Job;
};

const addJob = async ({ token, payload }: TParams): Promise<TResponse> => {
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
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: TParams) => addJob(data),
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
