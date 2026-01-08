import { asyncHandler } from '@/utils/asyncHandler.js';
import * as catService from '@/services/categoryService.js';

import { SendErrorResponse, SendResponse } from '@/utils/response.js';
import { Response, Request } from 'express';
const getAllCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await catService.getAllCategories();
  if (!category) {
    return SendResponse(res, 200, true, 'Empty Category', []);
  }
  return SendResponse(res, 200, true, 'Category Found', category);
});
const getAllSubCAtegory = asyncHandler(async (req: Request, res: Response) => {
  const subCategory = await catService.getAllSubCategory();
  if (!subCategory) {
    return SendResponse(res, 200, true, 'Subcategory Empty ', []);
  }
  return SendResponse(res, 200, true, 'SubCategory Found', subCategory);
});
const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Id Required');
  }
  const category = await catService.getCatById(id);
  if (!category) {
    return SendErrorResponse(res, 404, false, 'Category Not Found');
  }
  return SendResponse(res, 200, true, 'Category Found', category);
});
const getSubCategoryByCategoryId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Id Required');
  }
  const subcategory = await catService.getSubByCatId(id);
  if (!subcategory || subcategory.length < 0) {
    return SendResponse(res, 200, true, 'Subcategory not found ', []);
  }
  return SendResponse(res, 200, true, 'Subcategory  found ', subcategory);
});
const getSubCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Id Required');
  }
  const subcategory = await catService.getSubCatById(id);
  if (!subcategory) {
    return SendErrorResponse(res, 404, false, 'Subcategory Not Found');
  }
  return SendResponse(res, 200, true, 'Category Found', subcategory);
});

export {
  getAllCategory,
  getAllSubCAtegory,
  getCategoryById,
  getSubCategoryByCategoryId,
  getSubCategoryById,
};
