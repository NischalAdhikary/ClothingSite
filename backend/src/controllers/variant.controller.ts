import * as varService from '@/services/variantService.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { SendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';

const getAllSizes = asyncHandler(async (req: Request, res: Response) => {
  const sizes = await varService.getSize();
  if (!sizes || sizes.length < 0) {
    return SendResponse(res, 200, true, 'No data found', []);
  }
  return SendResponse(res, 200, true, 'No data found', sizes);
});
const getAllColors = asyncHandler(async (req: Request, res: Response) => {
  const colors = await varService.getColors();
  if (!colors || colors.length < 0) {
    return SendResponse(res, 200, true, 'No data found', []);
  }
  return SendResponse(res, 200, true, 'No data found', colors);
});

export { getAllSizes, getAllColors };
