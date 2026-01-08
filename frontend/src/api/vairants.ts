import api from "./api";

export const fetchSizes = async () => {
  const response = await api.get("/variant/sizes");
  return response.data;
};
export const fetchColors = async () => {
  const response = await api.get("/variant/colors");
  return response.data;
};
