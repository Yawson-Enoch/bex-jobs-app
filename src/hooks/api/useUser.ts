import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { z } from 'zod';

import { TProfile } from '~/schemas/auth';
import { BASE_URL } from '~/lib/api';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

const userQueryKey = 'user';

const userSchema = z.object({
  msg: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
});

type TUser = z.infer<typeof userSchema>;

/* get user */
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

export function useGetUser() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery<TUser, Error>({
    queryKey: [userQueryKey],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
}

/* update user */
type TResponse = {
  msg: string;
};

const updateProfile = async (
  token: string | null,
  payload: TProfile
): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL}/auth/update-user`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: TResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to add job');
  }

  return data;
};

export function useUpdateProfile() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: TProfile) => updateProfile(token, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
      toast({
        description: data.msg,
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
      });
    },
  });

  return { mutate, isLoading };
}
