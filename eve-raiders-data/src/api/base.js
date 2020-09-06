import axios from "axios";
import { history } from "../App";

export const baseURL = "https://everaiders.azurewebsites.net/";

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + window.localStorage.token;
  return config;
});

export default instance;
