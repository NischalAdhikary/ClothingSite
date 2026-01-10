import axios from "axios";
const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
