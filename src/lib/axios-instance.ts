import Router from 'next/router';
import axios from 'axios';
import { RESET } from 'jotai/utils';

import { siteConfig } from '~/config/site';
import { accessTokenAtom } from '~/atoms/auth-token';

import { store } from './store';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const apiClient = axios.create({
  baseURL: siteConfig.apiBaseUrl,
});

/* request interceptor to add the access token */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = store.get(accessTokenAtom);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error),
);

/* response interceptor to handle token expiration */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== undefined) {
      store.set(accessTokenAtom, RESET);
      Router.replace('/login');
    }
    return Promise.reject(error);
  },
);
