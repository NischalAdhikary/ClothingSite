import { Request, Response, NextFunction } from 'express';
import { SendErrorResponse } from '@/utils/response.js';
const aunthorization = (required_roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return SendErrorResponse(res, 401, false, 'Unauthorized');
      }
      if (required_roles && user.role !== required_roles) {
        return SendErrorResponse(res, 403, false, 'Forbidden');
      }
      next();
    } catch (e) {
      SendErrorResponse(res, 500, false, 'Server Error', e);
    }
  };
};
export default aunthorization;
