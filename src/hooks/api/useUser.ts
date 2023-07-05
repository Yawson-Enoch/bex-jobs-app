import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { z } from 'zod';

import { BASE_URL } from '~/lib/api';
import { accessTokenAtom } from '~/atoms/token';

const userSchema = z.object({
  msg: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
});

type TUser = z.infer<typeof userSchema>;

const getUser = async (token: string | null) => {
  const response = await fetch(`${BASE_URL}/auth/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch user info');
  }

  return data;
};

export default function useGetUser() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery<TUser, Error>({
    queryKey: ['user'],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
}
