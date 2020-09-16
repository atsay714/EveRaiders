import axios from "axios";

export const baseURL = "https://everaiders.azurewebsites.net/";
// export const baseURL = "https://localhost:5001";

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + window.localStorage.token;
  return config;
});

export default instance;
