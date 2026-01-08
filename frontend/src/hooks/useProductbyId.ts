import {
  fetchProductById,
  fetchProductVariantById,
  fetchProuctDetailsClient,
} from "@/api/product";
import { useQuery } from "@tanstack/react-query";
type Deletetype = "product" | "productvariant";
export default function useProductById(
  id: string | null,
  isOpen: boolean,
  type: Deletetype
) {
  const getProductById = useQuery({
    queryKey: ["productid", id],
    queryFn: () => fetchProductById(id),
    enabled: isOpen && !!id && type === "product",
  });
  const getProductVariantById = useQuery({
    queryKey: ["productvariantid", id],
    queryFn: () => fetchProductVariantById(id),
    enabled: isOpen && !!id && type === "productvariant",
  });
  const getProductDetails = useQuery({
    queryKey: ["productdetails", id],
    queryFn: () => fetchProuctDetailsClient(id),
  });
  return {
    getProductById,
    getProductVariantById,
    getProductDetails,
  };
}
