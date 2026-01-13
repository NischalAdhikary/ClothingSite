import { useQuery } from "@tanstack/react-query";
import { fetchClientProducts } from "@/api/product";
export default function useProductClient(category, subcategory) {
  const getProductClient = useQuery({
    queryKey: ["client-product", category, subcategory],
    queryFn: () => fetchClientProducts(category, subcategory),
    enabled: !!category || !!subcategory,
  });
  return {
    getProductClient,
  };
}
