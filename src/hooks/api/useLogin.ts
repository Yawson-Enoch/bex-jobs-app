import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { ApiLogin, Login } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { accessTokenAtom } from '~/atoms/auth-token';
import { toast } from '~/components/ui/use-toast';

const loginUser = async (payload: Login) => {
  const response = await apiClient.post(`/auth/login`, payload);

  return ApiLogin.parse(response.data);
};
export function useLogin() {
  const setAccessToken = useSetAtom(accessTokenAtom);

  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.data.token);
      toast({
        description: data.msg,
      });
      router.push('/dashboard');
    },
  });
}
