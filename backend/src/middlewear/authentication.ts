import jwt, { JwtPayload } from 'jsonwebtoken';
import { SendErrorResponse } from '@/utils/response.js';
import * as userService from '@/services/userService.js';
interface MyTokenPayload extends JwtPayload {
  id: UUID;
}

import { Request, Response, NextFunction } from 'express';
import { config } from '@/utils/config.js';
import { UUID } from 'crypto';
const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return SendErrorResponse(res, 401, false, 'Unauthenticated User');
    }
    const jwtToken = token.split(' ')[1];

    const decoded = jwt.verify(jwtToken, config.tokenSecret) as MyTokenPayload;

    const clientid = await userService.getUserClientId(decoded.id);
    if (!clientid) {
      return SendErrorResponse(res, 401, false, 'User not registered');
    }
    const user = await userService.getUser(clientid.user_id);
    if (!user) {
      return SendErrorResponse(res, 401, false, 'User not found');
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};
export default authentication;
