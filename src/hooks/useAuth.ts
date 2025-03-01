'use client';

import { useRouter } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';

import { accessTokenAtom, isAuthenticatedAtom } from '~/atoms/auth-token';

export default function useAuth() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const isLoggedIn = useAtomValue(isAuthenticatedAtom);

  const router = useRouter();

  const logout = () => {
    router.replace('/login');
    setAccessToken(RESET);
  };

  return {
    isLoggedIn,
    accessToken,
    logout,
  };
}
