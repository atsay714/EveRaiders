import instance, { baseURL } from "../base";
import { history } from "../../App";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.request?.responseURL === `${baseURL}api/administration/user` &&
      error?.response?.status === 403
    ) {
      history.push("/dashboard/awaiting-approval");
    } else {
      return Promise.reject(error);
    }
  }
);

export const getUsers = async () => {
  try {
    const res = await instance.get("/api/administration/users");
    return res?.data;
  } catch (e) {
    return [];
  }
};

export const approveUser = async (userName) => {
  try {
    const res = await instance.post("/api/administration/approve", null, {
      params: { userName },
    });
    return res.data;
  } catch (e) {
    return [];
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await instance.get("/api/administration/user");
    return res?.data;
  } catch (e) {
    return [];
  }
};
