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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !(error?.request?.responseURL === `${baseURL}api/auth/login`) &&
      error?.response?.status === 401
    ) {
      history.push({
        pathname: "/login",
        state: { message: "You have been logged out" },
      });
    } else if (
      error?.request?.responseURL === `${baseURL}api/auth/login` &&
      error?.response?.status === 401
    ) {
      error.message = "Invalid username or password";
      return Promise.reject(error);
    } else if (
      error?.request?.responseURL === `${baseURL}api/users/profile` &&
      error?.response?.status === 403
    ) {
      history.push("/dashboard/awaiting-approval");
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
