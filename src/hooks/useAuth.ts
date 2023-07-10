import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';

import { parseToken } from '~/lib/jwt';
import { persistLoginAtom } from '~/atoms/persist';
import { sessionTimeoutAtom } from '~/atoms/session';
import { accessTokenAtom } from '~/atoms/token';

type User = {
  userId: string;
  firstName: string;
  email: string;
};

const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = 30 * 60 * 1000;

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuthInfo, setUserAuthInfo] = useState<User | null>(null);

  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [sessionTimeout, setSessionTimeout] = useAtom(sessionTimeoutAtom);
  const persistLogin = useAtomValue(persistLoginAtom);

  const router = useRouter();

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    setUserAuthInfo(null);
    setAccessToken(RESET);
    setSessionTimeout(RESET);
    router.replace('/login');
  }, [router, setAccessToken, setSessionTimeout]);

  const login = useCallback((user: User) => {
    setIsAuthenticated(true);
    setUserAuthInfo(user);
  }, []);

  useEffect(() => {
    if (accessToken) {
      const authInfo = parseToken(accessToken);
      login({
        userId: authInfo.userId,
        firstName: authInfo.firstName,
        email: authInfo.email,
      });
    }
  }, [accessToken, login]);

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

    if (sessionTimeout) {
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
      if (!persistLogin) {
        window.removeEventListener('mousemove', handleTimeReset);
        window.removeEventListener('keypress', handleTimeReset);
      }
    };
  }, [persistLogin, logOut, sessionTimeout]);

  return {
    isLoggedIn: isAuthenticated,
    userAuthInfo,
    login,
    logOut,
  };
}
