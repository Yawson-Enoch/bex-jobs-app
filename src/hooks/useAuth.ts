'use client';

import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';

import { accessTokenAtom, isAuthenticatedAtom } from '~/atoms/auth-token';

export default function useAuth() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const isLoggedIn = useAtomValue(isAuthenticatedAtom);

  const logout = () => {
    setAccessToken(RESET);
  };

  return {
    isLoggedIn,
    accessToken,
    logout,
  };
}
