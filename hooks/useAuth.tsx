import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { atom, useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { parseToken } from '@/lib/jwt';
import { authTokenAtom, sessionTimeoutAtom } from '@/components/login-form';

type User = {
  userId: string;
  username: string;
  email: string;
};

export const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = 30 * 60 * 1000;

const isAuthenticatedAtom = atom<boolean>(false);
const userInfoAtom = atom<User | null>(null);

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [sessionTimeout, setSessionTimeout] = useAtom(sessionTimeoutAtom);

  const router = useRouter();

  const isLoggedIn = isAuthenticated;

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setAuthToken(RESET);
    setSessionTimeout(RESET);
    router.push('/login');
  }, [
    router,
    setAuthToken,
    setIsAuthenticated,
    setSessionTimeout,
    setUserInfo,
  ]);

  const login = useCallback(
    (user: User) => {
      setIsAuthenticated(true);
      setUserInfo(user);
    },
    [setIsAuthenticated, setUserInfo]
  );

  useEffect(() => {
    if (authToken) {
      const authInfo = parseToken(authToken);
      login({
        userId: authInfo.userId,
        username: authInfo.username,
        email: authInfo.email,
      });
    }
  }, [authToken, login]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();

      if (sessionTimeout && currentTime >= sessionTimeout) {
        logOut();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [logOut, sessionTimeout]);

  return {
    isLoggedIn,
    logOut,
    login,
    userInfo,
  };
}
