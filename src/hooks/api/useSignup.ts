import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ApiMessage, Signup } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { toast } from '~/components/ui/use-toast';

const signupUser = async (payload: Signup) => {
  const response = await apiClient.post(`/auth/register`, payload);

  return ApiMessage.parse(response.data);
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
  });
}
