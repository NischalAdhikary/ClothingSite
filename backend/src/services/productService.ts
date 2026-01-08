import * as productRepo from '@/repos/productRepo.js';
export const prodcutById = (id: string) => {
  return productRepo.getProductById(id);
};
export const deleteProduct = (id: string) => {
  return productRepo.deleteProductById(id);
};
export const deleteProdcutVariant = (id: string) => {
  return productRepo.deleteVariantByID(id);
};
export const productVariantById = (id: string) => {
  return productRepo.getProductVariantById(id);
};
