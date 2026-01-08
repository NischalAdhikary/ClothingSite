import api from "./api";

export const getCategory = async () => {
  const response = await api.get("/category");
  return response.data;
};
export const fetchSubCategory = async () => {
  const response = await api.get("/category/sub");
  return response.data;
};

export const createProduct = async ({ product, variant }) => {
  const response = await api.post("/product/create", {
    product,
    variant,
  });
  return response.data;
};
export const fetchSubcategoryByCategoryId = async (
  categoryId: string | null
) => {
  const response = await api.get(`/category/${categoryId}/subcategories`);
  return response.data;
};
