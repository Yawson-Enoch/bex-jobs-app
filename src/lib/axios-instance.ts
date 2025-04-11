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

/* response interceptor 
- add custom error message accessor
- redirect to login on 401
*/
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      /* network error */
      error.message =
        typeof window !== undefined && window.navigator.onLine
          ? 'Failed to connect'
          : 'Please check your internet';
    } else {
      /* server error */
      /* logout if server returns a 401 */
      const accessToken = store.get(accessTokenAtom);
      if (
        error.response?.status === 401 &&
        accessToken &&
        typeof window !== undefined
      ) {
        store.set(accessTokenAtom, RESET);
        Router.replace('/login');
        return;
      }
      /* add status code to custom error object */
      error.status = error.response.status;
      /* set error message from response data and set fallback */
      error.message = error.response.data.msg || 'Something went wrong';
    }
    return Promise.reject(error);
  },
);
