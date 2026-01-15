import { useQuery } from "@tanstack/react-query";
import { fetchClientProducts } from "@/api/product";
export default function useProductClient(category, subcategory, filter) {
  const getProductClient = useQuery({
    queryKey: ["client-product", category, subcategory, filter],
    queryFn: () => fetchClientProducts(category, subcategory, filter),
    enabled: !!category || !!subcategory || filter,
  });
  return {
    getProductClient,
  };
}
