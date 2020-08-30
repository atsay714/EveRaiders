import axios from "axios";
import { history } from "../Dashboard";

const baseURL = "https://everaiders.azurewebsites.net/";

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
      error.response.status === 401
    ) {
      history.push({
        pathname: "/login",
        state: { message: "You have been logged out" },
      });
      window.location.reload();
    } else if (
      error.request.responseURL === `${baseURL}api/auth/login` &&
      error.response.status === 401
    ) {
      return Promise.reject("Invalid username or password");
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
