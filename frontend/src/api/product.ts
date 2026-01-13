import api from "./api";
export const fetchProduct = async (page: number, limit = 10) => {
  const response = await api.get(`/product?page=${page}&limit=${limit}`);
  return response.data;
};
export const fetchProdcutByQueries = async (
  category: string | null,
  subcategory: string | null,
  page: number,
  limit: number
) => {
  let url = `/product/filter?`;
  if (category) {
    url += `category=${category}&`;
  }
  if (subcategory) {
    url += `subcategory=${subcategory}&`;
  }

  const response = await api.get(`${url}page=${page}&limit=${limit}`);
  return response.data;
};
export const fetchProductById = async (id: string | null) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};
export const deleteProductVariant = async (id: string) => {
  const response = await api.delete(`/product/variant/${id}`);
  return response.data;
};
export const fetchProductVariantById = async (id: string | null) => {
  const response = await api.get(`/product/variant/${id}`);
  return response.data;
};
export const updateProduct = async (payload) => {
  console.log("payload data for backend", payload);
  const response = await api.patch("/product/update", payload);
  return response.data;
};
export const fetchProuctDetailsClient = async (id: string | null) => {
  console.log("hiii");
  const response = await api.get(`/product/details/${id}`);
  return response.data.data;
};
export const fetchClientProducts = async (category, subcategory) => {
  let url = `/product/client?category=${category}`;

  if (subcategory) {
    url += `&subcategory=${subcategory}`;
  }
  const result = await api.get(url);
  return result.data;
};
