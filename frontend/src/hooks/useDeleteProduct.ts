import { deleteProduct, deleteProductVariant } from "@/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["filtered-products"],
        exact: false,
      });
    },
  });

  const deleteProductVariantMutation = useMutation({
    mutationFn: (id: string) => deleteProductVariant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["filtered-products"],
        exact: false,
      });
    },
  });

  return {
    deleteProductMutation,
    deleteProductVariantMutation,
  };
}
