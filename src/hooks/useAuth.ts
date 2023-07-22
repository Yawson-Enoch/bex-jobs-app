import { useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { persistLoginAtom } from '~/atoms/persist';
import { sessionTimeoutAtom } from '~/atoms/session';
import { accessTokenAtom, isAuthenticatedAtom } from '~/atoms/token';

const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = 30 * 60 * 1000;

export default function useAuth() {
  const [sessionTimeout, setSessionTimeout] = useAtom(sessionTimeoutAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const persistLogin = useAtomValue(persistLoginAtom);
  const isLoggedIn = useAtomValue(isAuthenticatedAtom);

  const logOut = useCallback(() => {
    setAccessToken(RESET);
    setSessionTimeout(RESET);
    redirect('/login');
  }, [setAccessToken, setSessionTimeout]);

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
    isLoggedIn,
    logOut,
  };
}
