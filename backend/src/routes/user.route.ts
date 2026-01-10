import { Router } from 'express';
import {
  getUserDetails,
  createShippingDetails,
  editUserShippingDetails,
} from '../controllers/user.controller.js';
import authentication from '../middlewear/authentication.js';
const router = Router();
router.get('/', authentication, getUserDetails);
router.post('/', authentication, createShippingDetails);
router.patch('/', authentication, editUserShippingDetails);
export default router;
