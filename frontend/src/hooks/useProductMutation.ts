import { updateProduct } from "@/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useProductMutation() {
  const queryClient = useQueryClient();
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });
  return {
    updateProductMutation,
  };
}
