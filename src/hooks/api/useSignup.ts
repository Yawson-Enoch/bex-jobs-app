import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { siteInfo } from '~/config/site';
import { mutationResponseSchema, TSignup } from '~/schemas/auth';
import { toast } from '~/components/ui/use-toast';

const signupUser = async (payload: TSignup) => {
  const response = await fetch(`${siteInfo.APIBaseURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to register');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useSignup() {
  const router = useRouter();

  return useMutation({
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
}
