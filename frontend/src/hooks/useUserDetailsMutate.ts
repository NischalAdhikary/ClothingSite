import { createUserDetails, editUserShippingDetails } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUserDetailsMutate() {
  const queryClient = useQueryClient();
  const createUserDetail = useMutation({
    mutationFn: createUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserDetails"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const updatedUserDetail = useMutation({
    mutationFn: editUserShippingDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserDetails"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    createUserDetail,
    updatedUserDetail,
  };
}
