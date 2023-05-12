import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { atom, useAtom, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { authTokenAtom, sessionTimeoutAtom } from '@/components/login-form';

type User = {
  userId: string;
  username: string;
  email: string;
};

const isAuthenticatedAtom = atom<boolean>(false);
const userInfoAtom = atom<User | null>(null);

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
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

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUserInfo(user);
  };

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
