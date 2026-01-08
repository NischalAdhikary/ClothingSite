import { Response } from 'express';
export const SendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  msg: string,
  data?: unknown,
) => {
  return res.status(statusCode).json({
    success,
    message: msg,
    data: data || null,
  });
};
export const SendErrorResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  msg: string,
  error?: unknown,
) => {
  return res.status(statusCode).json({
    success,
    message: msg,
    error: error || null,
  });
};
