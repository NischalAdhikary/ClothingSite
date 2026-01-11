import { asyncHandler } from '@/utils/asyncHandler.js';
import { SendErrorResponse, SendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';
import * as UserService from '@/services/userService.js';
import pool from '@/utils/db.js';

const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user.id;
  console.log(id);
  if (!id) {
    return SendErrorResponse(res, 401, false, 'User must be authenticated');
  }
  const userAddressDetails = await UserService.getShippingAddress(id);
  if (!userAddressDetails) {
    return SendResponse(res, 200, true, 'User Shipping Address is empty', null);
  }
  console.log('user', userAddressDetails);
  return SendResponse(res, 200, true, 'User Shipping Address', userAddressDetails);
});
const createShippingDetails = asyncHandler(async (req: Request, res: Response) => {
  const { fullname, phone, address1, province, city, address2, postalcode } = req.body;

  const user_id = req.user.id;
  const data = { fullname, user_id, phone, address1, province, city, address2, postalcode };

  if (!fullname || !phone || !address1 || !province || !city || !user_id) {
    return SendErrorResponse(res, 400, false, 'Required Fields Missing');
  }
  const shippingAddressExist = await UserService.getShippingAddress(user_id);
  if (shippingAddressExist) {
    return SendErrorResponse(res, 409, false, 'Shipping Address Already Exist For the User');
  }
  const user = await UserService.createShippingAddress(data);
  return SendResponse(res, 201, true, 'Shipping Address Created Successfuly', user);
});
const editUserShippingDetails = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const userid = req.user.id;
  console.log(userid);

  if (!data || Object.keys(data).length === 0) {
    return SendErrorResponse(res, 400, false, 'No Data to update shipping address');
  }
  const keys = Object.keys(data);
  const values = Object.values(data);

  const setQuery = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const updateQuery = `UPDATE useraddress SET ${setQuery} WHERE user_id=$${keys.length + 1} RETURNING *`;
  console.log(updateQuery);
  console.log(values);
  const updatedAddress = await pool.query(updateQuery, [...values, userid]);

  if (!updatedAddress) {
    return SendErrorResponse(res, 404, false, 'No Data Available to update');
  }
  return SendResponse(res, 200, true, 'Shipping address updated successfully');
});
export { getUserDetails, createShippingDetails, editUserShippingDetails };
