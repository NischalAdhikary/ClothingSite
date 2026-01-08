import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  fetchSubCategory,
  fetchSubcategoryByCategoryId,
  getCategory,
} from "@/api/category";
export const useCategory = (categoryId: string | null) => {
  console.log("categoryId in useCategory:", categoryId);
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });
  const getAllCategory = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const getAllSubCategory = useQuery({
    queryKey: ["subcategory"],
    queryFn: fetchSubCategory,
  });
  const getSubcategoryByCategoryId = useQuery({
    queryKey: ["subcategoryByCategory", categoryId],
    queryFn: () => fetchSubcategoryByCategoryId(categoryId),
    enabled: !!categoryId,
  });
  return {
    createProductMutation,
    getAllCategory,
    getAllSubCategory,
    getSubcategoryByCategoryId,
  };
};
