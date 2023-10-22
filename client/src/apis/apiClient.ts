import axios, { AxiosError } from "axios";
import store, { RootState } from "../store";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = (store.getState() as RootState).auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default apiClient;
