import * as categoryRepo from '@/repos/categoryRepo.js';
export const getAllCategories = () => {
  return categoryRepo.getAllCatgeory();
};
export const getAllSubCategory = () => {
  return categoryRepo.getAllSubCategory();
};
export const getCatById = (id: string) => {
  return categoryRepo.getCategoryById(id);
};
export const getSubCatById = (id: string) => {
  return categoryRepo.getSubCategoryById(id);
};
export const getSubByCatId = (id: string) => {
  return categoryRepo.getSubCatByCatId(id);
};
