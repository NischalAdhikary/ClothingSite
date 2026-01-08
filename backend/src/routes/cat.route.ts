import {
  getAllCategory,
  getAllSubCAtegory,
  getSubCategoryById,
  getCategoryById,
  getSubCategoryByCategoryId,
} from '@/controllers/category.controller.js';

import { Router } from 'express';
const router = Router();
router.get('/', getAllCategory);

router.get('/sub', getAllSubCAtegory);

router.get('/:id', getCategoryById);
router.get('/sub/:id', getSubCategoryById);
router.get('/:id/subcategories', getSubCategoryByCategoryId);

// router.get('/subcategories', getSubCategoryByCategoryId);

export default router;
