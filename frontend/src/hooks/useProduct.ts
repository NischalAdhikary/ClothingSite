import { fetchProdcutByQueries, fetchProduct } from "@/api/product";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(
  page: number,
  limit = 6,
  category: string | null,
  subcategory: string | null
) {
  const isFiltering = !!category || !!subcategory;

  const getProducts = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProduct(page, limit),
    enabled: !isFiltering,
  });

  const getFilteredProducts = useQuery({
    queryKey: ["filtered-products", category, subcategory, page],
    queryFn: () => fetchProdcutByQueries(category, subcategory, page, limit),
    enabled: isFiltering,
  });

  return { getProducts, getFilteredProducts, isFiltering };
}
