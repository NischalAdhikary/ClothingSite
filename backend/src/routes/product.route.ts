import {
  createProduct,
  deleteProduct,
  deleteproductvariants,
  getFilteredProducts,
  getProductById,
  getProducts,
  productvariant,
  updateProductDetails,
  getProductClient,
  productDetailsClient,
  getClientProducts,
} from '@/controllers/product.controller.js';

import { Router } from 'express';
const router = Router();
router.get('/', getProducts);
router.get('/filter', getFilteredProducts);
router.get('/users', getProductClient);
router.post('/create', createProduct);
router.get('/client', getClientProducts);
router.patch('/update', updateProductDetails);
router.get('/variant/:id', productvariant);
router.delete('/variant/:id', deleteproductvariants);
router.delete('/:id', deleteProduct);
router.get('/details/:id', productDetailsClient);
router.get('/:id', getProductById);

export default router;
