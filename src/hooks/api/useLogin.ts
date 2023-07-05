import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';

import { BASE_URL } from '~/lib/api';
import { parseToken } from '~/lib/jwt';
import type { Login } from '~/lib/validations/auth';
import { persistLoginAtom } from '~/atoms/persist';
import { sessionTimeoutAtom } from '~/atoms/session';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

import useAuth from '../useAuth';

type TResponse = {
  msg: string;
  token: string;
};

const loginUser = async (payload: Login): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to login');
  }

  return data;
};

export default function useLogin() {
  const persistLogin = useAtomValue(persistLoginAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const { login } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const authInfo = parseToken(data.token);

      const sessionTimeoutPersistLogin = authInfo.tokenExpirationDate * 1000;

      setAccessToken(data.token);
      persistLogin && setSessionTimeout(sessionTimeoutPersistLogin);
      login({
        userId: authInfo.userId,
        firstName: authInfo.firstName,
        email: authInfo.email,
      });
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
