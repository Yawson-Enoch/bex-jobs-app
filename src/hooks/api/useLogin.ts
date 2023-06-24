import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { BASE_URL_DEV, CustomAPIError } from '~/lib/api';
import { parseToken } from '~/lib/jwt';
import type { Login } from '~/lib/validations/auth';
import { toast } from '~/components/ui/use-toast';
import { hasPersistLoginAtom } from '~/components/auth/login-form';

import useAuth from '../useAuth';

type TResponse = {
  msg: string;
  token: string;
};

const loginUser = async (payload: Login): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL_DEV}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg || 'Failed to login') as CustomAPIError;
    error.info = data;
    error.status = response.status;
    throw error;
  }

  return data;
};

export const authTokenAtom = atomWithStorage<string | null>(
  'bexjobs-token',
  null
);
export const sessionTimeoutAtom = atomWithStorage<number | null>(
  'bexjobs-session-timeout',
  null
);

export default function useLogin() {
  const hasPersistLogin = useAtomValue(hasPersistLoginAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const { login } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const authInfo = parseToken(data.token);

      const sessionTimeoutPersistLogin = authInfo.tokenExpirationDate * 1000;

      setAuthToken(data.token);
      hasPersistLogin && setSessionTimeout(sessionTimeoutPersistLogin);
      login({
        userId: authInfo.userId,
        firstName: authInfo.firstName,
        email: authInfo.email,
      });
      toast({
        description: data.msg,
      });
    },
    onError: (error: CustomAPIError) => {
      toast({
        description: error.message,
      });
    },
  });

  return { mutate, isLoading };
}
