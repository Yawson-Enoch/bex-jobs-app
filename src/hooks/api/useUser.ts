import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { siteConfig } from '~/config/site';
import { ApiMessage, ApiProfile, Profile } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { accessTokenAtom } from '~/atoms/auth-token';
import { toast } from '~/components/ui/use-toast';

const userQueryKey = 'user';

/* queries */
const getUser = async () => {
  const { data } = await apiClient.get(`${siteConfig.apiBaseUrl}/auth/profile`);

  const result = ApiProfile.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse data');
  }

  return result.data;
};
export function useGetUser() {
  return useQuery({
    queryKey: [userQueryKey],
    queryFn: getUser,
  });
}

/* mutations */
const updateUserProfile = async (payload: Profile) => {
  const { data } = await apiClient.patch(
    `${siteConfig.apiBaseUrl}/auth/profile`,
    payload,
  );

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
    mutationFn: updateUserProfile,
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
