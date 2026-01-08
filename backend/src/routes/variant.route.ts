import { getAllColors, getAllSizes } from '@/controllers/variant.controller.js';
import { Router } from 'express';
const router = Router();
router.get('/sizes', getAllSizes);
router.get('/colors', getAllColors);
export default router;
