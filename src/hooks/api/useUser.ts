import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { TProfile } from '~/schemas/auth';
import { mutationResponseSchema, userSchema } from '~/schemas/user';
import { BASE_URL } from '~/lib/api';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

const userQueryKey = 'user';

/* queries */
const getUser = async (token: string | null) => {
  const response = await fetch(`${BASE_URL}/auth/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch user info');
  }

  const result = userSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetUser() {
  const token = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: [userQueryKey],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
}

/* mutations */
const updateUserProfile = async (token: string | null, payload: TProfile) => {
  const response = await fetch(`${BASE_URL}/auth/update-user`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to add job');
  }

  const result = mutationResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useUpdateUserProfile() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const updateUserProfileMutation = useMutation({
    mutationFn: (payload: TProfile) => updateUserProfile(token, payload),
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

  return updateUserProfileMutation;
}
