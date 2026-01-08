import * as varRepo from '@/repos/variantRepo.js';
export const getSize = () => {
  return varRepo.fetchSizes();
};
export const getColors = () => {
  return varRepo.fetchColors();
};
