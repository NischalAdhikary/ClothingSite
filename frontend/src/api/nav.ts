import api from "./api";
export const fetchNavItems = async () => {
  const response = await api.get("/home/nav");
  return response.data;
};
