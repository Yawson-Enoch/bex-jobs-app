'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isAxiosError } from 'axios';
import { createStore, Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { store } from '~/lib/store';

const MAX_RETRIES = 2;

/* turn off retries for:  
- [BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR] respectively
*/
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404, 500];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false;
        }
        if (
          isAxiosError(error) &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)
        ) {
          return false;
        }
        return true;
      },
      staleTime: 30 * 1000,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </JotaiProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
