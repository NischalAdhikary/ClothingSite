import * as userRepo from '@/repos/userRepositry.js';
import { UUID } from 'crypto';

export const getUser = (id: string) => {
  return userRepo.getUserById(id);
};

export const createUser = (name: string, email: string) => {
  return userRepo.createUser(name, email);
};

export const getUserByEmail = (email: string) => {
  return userRepo.getUserByEmail(email);
};
export const getUserClientId = (id: UUID) => {
  return userRepo.getUserByClietId(id);
};
export const createAuthProvider = (userId: string, provider: string, providerId: string) => {
  return userRepo.createAuthProvider(userId, provider, providerId);
};
export const createShippingAddress = (data) => {
  return userRepo.createUserShippingDetails(data);
};
export const getShippingAddress = (id) => {
  return userRepo.getUserShippingDetails(id);
};
