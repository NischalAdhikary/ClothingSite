import api from "./api";
export const createUserDetails = async (body) => {
  const result = await api.post(`/user/userdetails/`, body);
  return result.data;
};
export const fetchUserDetails = async () => {
  const result = await api.get(`/user/userdetails`);
  return result.data;
};
export const editUserShippingDetails = async (body) => {
  const result = await api.patch("/user/userdetails", body);
  return result.data;
};
