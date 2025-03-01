import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { siteConfig } from '~/config/site';
import { ApiLogin, Login } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { accessTokenAtom } from '~/atoms/auth-token';
import { toast } from '~/components/ui/use-toast';

const loginUser = async (payload: Login) => {
  const { data } = await apiClient.post(
    `${siteConfig.apiBaseUrl}/auth/login`,
    payload,
  );

  const result = ApiLogin.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
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
    onError: (error: Error) => {
      toast({
        description: error.message,
      });
    },
  });
}
