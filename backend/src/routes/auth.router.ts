import { Router, Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler.js';

import { config, authParams } from '@/utils/config.js';
import { AuthorizationCode, userLogout, verifyUser } from '@/controllers/auth.controller.js';
import authentication from '@/middlewear/authentication.js';

const router = Router();
router.get(
  '/auth',
  asyncHandler(async (req: Request, res: Response) => {
    return res.status(200).json({ authUrl: `${config.authUrl}?${authParams}` });
  }),
);
router.get('/auth/google/callback', AuthorizationCode);
router.get('/auth/verify', authentication, verifyUser);
router.get('/auth/logout', userLogout);

export default router;
