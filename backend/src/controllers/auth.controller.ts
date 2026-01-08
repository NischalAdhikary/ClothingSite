import { asyncHandler } from '@/utils/asyncHandler.js';
import { Request, Response } from 'express';
import { SendErrorResponse, SendResponse } from '@/utils/response.js';
import { config, getTokenParams } from '@/utils/config.js';
import * as userService from '@/services/userService.js';

import axios from 'axios';
import jwt from 'jsonwebtoken';
const AuthorizationCode = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.query as { code?: string };
  if (!code) {
    return SendErrorResponse(res, 400, false, 'Authorization code must be provided');
  }
  const tokenParams = getTokenParams(code as string);
  const {
    data: { id_token },
  } = (await axios.post(`${config.tokenUrl}?${tokenParams}`)) as { data: { id_token: string } };
  if (!id_token) {
    return SendErrorResponse(res, 400, false, 'Auth error');
  }
  const { email, name, sub, picture } = jwt.decode(id_token) as {
    email: string;
    name: string;
    picture: string;
    sub: string;
  };
  const user = { name, email, picture, sub };
  console.log('Decoded user info:', user);
  const existingUser = await userService.getUserByEmail(email);
  if (!existingUser) {
    await userService.createUser(name, email);

    const newUser = await userService.getUserByEmail(email);

    await userService.createAuthProvider(newUser.id, 'google', sub);
  }
  const token = jwt.sign({ id: user.sub }, config.tokenSecret, {
    expiresIn: config.tokenExpiration,
  });
  return res.redirect(`${config.clientUrl}/auth/success?token=${token}`);
});
const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return SendErrorResponse(res, 401, false, 'No user found');
  }
  return SendResponse(res, 200, true, 'User is authenticated', user);
});
const userLogout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
  });
  return SendResponse(res, 200, true, 'Logout Successful');
});

export { AuthorizationCode, verifyUser, userLogout };
