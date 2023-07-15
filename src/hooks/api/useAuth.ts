import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';

import { siteInfo } from '~/config/site';
import {
  loginMutationResponseSchema,
  mutationResponseSchema,
  profileAPISchema,
  TLogin,
  TProfile,
  TSignup,
} from '~/schemas/auth';
import { parseToken } from '~/lib/jwt';
import { TToken } from '~/lib/types';
import { persistLoginAtom } from '~/atoms/persist';
import { sessionTimeoutAtom } from '~/atoms/session';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

import useAuth from '../useAuth';

const userQueryKey = 'user';

/* mutations */
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

  const signupMutation = useMutation({
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

  return signupMutation;
}

const loginUser = async (payload: TLogin) => {
  const response = await fetch(`${siteInfo.APIBaseURL}/auth/login`, {
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

  const result = loginMutationResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useLogin() {
  const persistLogin = useAtomValue(persistLoginAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const { login } = useAuth();

  const loginMutation = useMutation({
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

  return loginMutation;
}

const updateUserProfile = async (token: TToken, payload: TProfile) => {
  const response = await fetch(`${siteInfo.APIBaseURL}/auth/update-user`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to add job');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useUpdateUserProfile() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const updateUserProfileMutation = useMutation({
    mutationFn: (payload: TProfile) => updateUserProfile(token, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
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

  return updateUserProfileMutation;
}

/* queries */
const getUser = async (token: TToken) => {
  const response = await fetch(`${siteInfo.APIBaseURL}/auth/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch user info');
  }

  const result = profileAPISchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetUser() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: [userQueryKey],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
}
