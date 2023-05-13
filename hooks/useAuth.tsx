import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { parseToken } from '@/lib/jwt';
import { authTokenAtom, sessionTimeoutAtom } from '@/components/login-form';

type User = {
  userId: string;
  username: string;
  email: string;
};

export const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = 30 * 60 * 1000;

export default function useAuth() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuthInfo, setUserAuthInfo] = useState<User | null>(null);

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [sessionTimeout, setSessionTimeout] = useAtom(sessionTimeoutAtom);

  const router = useRouter();

  const isLoggedIn = isAuthenticated;

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    setUserAuthInfo(null);
    setAuthToken(RESET);
    setSessionTimeout(RESET);
    router.push('/login');
  }, [router, setAuthToken, setSessionTimeout]);

  const login = useCallback((user: User) => {
    setIsAuthenticated(true);
    setUserAuthInfo(user);
  }, []);

  useEffect(() => {
    if (authToken) {
      const authInfo = parseToken(authToken);
      login({
        userId: authInfo.userId,
        username: authInfo.username,
        email: authInfo.email,
      });
    }
    setIsCheckingAuth(false);
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
    isCheckingAuth,
    isLoggedIn,
    userAuthInfo,
    login,
    logOut,
  };
}
