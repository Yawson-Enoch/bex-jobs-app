import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { siteConfig } from '~/config/site';
import { ApiMessage, Signup } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { toast } from '~/components/ui/use-toast';

const signupUser = async (payload: Signup) => {
  const { data } = await apiClient.post(
    `${siteConfig.apiBaseUrl}/auth/register`,
    payload,
  );

  const result = ApiMessage.safeParse(data);

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
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
}
