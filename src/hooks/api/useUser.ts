import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiMessage, ApiProfile, Profile } from '~/schemas/auth';
import { apiClient } from '~/lib/axios-instance';
import { toast } from '~/components/ui/use-toast';

const userQueryKey = 'user';

/* queries */
const getUser = async () => {
  const response = await apiClient.get(`/auth/profile`);

  return ApiProfile.parse(response.data);
};
export function useGetUser() {
  return useQuery({
    queryKey: [userQueryKey],
    queryFn: getUser,
  });
}

/* mutations */
const updateUserProfile = async (payload: Profile) => {
  const response = await apiClient.patch(`/auth/profile`, payload);

  return ApiMessage.parse(response.data);
};
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
      toast({
        description: data.msg,
      });
    },
  });
}
