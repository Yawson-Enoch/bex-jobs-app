import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';

import { siteConfig } from '~/config/site';
import { ApiLogin, Login } from '~/schemas/auth';
import { parseToken } from '~/lib/jwt';
import { persistLoginAtom } from '~/atoms/persist';
import { sessionTimeoutAtom } from '~/atoms/session';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

const loginUser = async (payload: Login) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to login');
  }

  const result = ApiLogin.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useLogin() {
  const persistLogin = useAtomValue(persistLoginAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const authInfo = parseToken(data.data.token);

      const sessionTimeoutPersistLogin = authInfo.tokenExpirationDate * 1000;

      setAccessToken(data.data.token);
      persistLogin && setSessionTimeout(sessionTimeoutPersistLogin);
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
