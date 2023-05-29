import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';

import { parseToken } from '@/lib/jwt';
import {
  authTokenAtom,
  hasPersistLoginAtom,
  sessionTimeoutAtom,
} from '@/components/auth/login-form';

type User = {
  userId: string;
  username: string;
  email: string;
};

const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = 30 * 60 * 1000;

export default function useAuth() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuthInfo, setUserAuthInfo] = useState<User | null>(null);

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [sessionTimeout, setSessionTimeout] = useAtom(sessionTimeoutAtom);
  const hasPersistLogin = useAtomValue(hasPersistLoginAtom);

  const router = useRouter();

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    setUserAuthInfo(null);
    setAuthToken(RESET);
    setSessionTimeout(RESET);
    router.replace('/login');
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
    let interval: NodeJS.Timeout;
    let sessionTimeoutNoPersistLogin =
      Date.now() + SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS;

    const handleTimeReset = () => {
      sessionTimeoutNoPersistLogin =
        Date.now() + SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS;
    };

    const handleLogoutNoPersist = () => {
      interval = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime >= sessionTimeoutNoPersistLogin) {
          logOut();
        }
      }, 1000);
    };

    const handleLogoutPersist = () => {
      interval = setInterval(() => {
        const currentTime = Date.now();
        if (sessionTimeout && currentTime >= sessionTimeout) {
          logOut();
        }
      }, 1000);
    };

    if (sessionTimeout && hasPersistLogin) {
      handleLogoutPersist();
    } else {
      handleLogoutNoPersist();
      window.addEventListener('mousemove', handleTimeReset);
      window.addEventListener('keypress', handleTimeReset);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (hasPersistLogin === false) {
        window.removeEventListener('mousemove', handleTimeReset);
        window.removeEventListener('keypress', handleTimeReset);
      }
    };
  }, [hasPersistLogin, logOut, sessionTimeout]);

  return {
    isCheckingAuth,
    isLoggedIn: isAuthenticated,
    userAuthInfo,
    login,
    logOut,
  };
}
