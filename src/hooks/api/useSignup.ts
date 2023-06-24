import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { BASE_URL_DEV, CustomAPIError } from '~/lib/api';
import type { Signup } from '~/lib/validations/auth';
import { toast } from '~/components/ui/use-toast';

type TResponse = {
  msg: string;
};

const signupUser = async (payload: Signup): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL_DEV}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg || 'Failed to register') as CustomAPIError;
    error.info = data;
    error.status = response.status;
    throw error;
  }

  return data;
};

export default function useSignup() {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast({
        description: data.msg,
      });
      router.push('/login');
    },
    onError: (error: CustomAPIError) => {
      toast({
        description: error.message,
      });
    },
  });

  return { mutate, isLoading };
}
