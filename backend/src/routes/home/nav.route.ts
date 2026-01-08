import { getNavItems } from '@/controllers/home/nav.controller.js';
import { Router } from 'express';
const router = Router();
router.get('/nav', getNavItems);
export default router;
