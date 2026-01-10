import { fetchUserDetails } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserDetails() {
  const getUserDetail = useQuery({
    queryKey: ["UserDetails"],
    queryFn: fetchUserDetails,
  });
  return {
    getUserDetail,
  };
}
