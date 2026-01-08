import { fetchProuctDetailsClient } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
export const useProductDetails = (id: string | null) => {
  const getProductDetails = useQuery({
    queryKey: ["productdetailsclient", id],
    queryFn: () => fetchProuctDetailsClient(id),
  });
  return {
    getProductDetails,
  };
};
