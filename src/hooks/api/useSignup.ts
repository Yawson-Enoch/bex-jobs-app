import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { ApiLogin, Signup } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { accessTokenAtom } from '~/atoms/auth-token';
import { toast } from '~/components/ui/use-toast';

const signupUser = async (payload: Signup) => {
  const response = await apiClient.post(`/auth/register`, payload);

  return ApiLogin.parse(response.data);
};
export function useSignup() {
  const setAccessToken = useSetAtom(accessTokenAtom);

  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      setAccessToken(data.data.token);
      toast({
        description: data.msg,
      });
      router.replace('/dashboard');
    },
  });
}
