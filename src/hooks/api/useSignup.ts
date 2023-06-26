import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { BASE_URL } from '~/lib/api';
import type { Signup } from '~/lib/validations/auth';
import { toast } from '~/components/ui/use-toast';

type TResponse = {
  msg: string;
};

const signupUser = async (payload: Signup): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to register');
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
    onError: (error: Error) => {
      toast({
        description: error.message,
      });
    },
  });

  return { mutate, isLoading };
}
