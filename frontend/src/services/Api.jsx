import axios from "axios";

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

Api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default Api;
