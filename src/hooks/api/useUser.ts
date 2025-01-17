import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { siteConfig } from '~/config/site';
import { ApiMessage, ApiProfile, Profile } from '~/schemas/auth';
import { Token } from '~/lib/types';
import { accessTokenAtom } from '~/atoms/token';
import { toast } from '~/components/ui/use-toast';

const userQueryKey = 'user';

/* queries */
const getUser = async (token: Token) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/auth/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Failed to fetch user info');
  }

  const result = ApiProfile.safeParse(data);

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
const updateUserProfile = async (token: Token, payload: Profile) => {
  const response = await fetch(`${siteConfig.APIBaseURL}/auth/update-user`, {
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

  const result = ApiMessage.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useUpdateUserProfile() {
  const token = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Profile) => updateUserProfile(token, payload),
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
}
