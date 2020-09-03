import instance, { baseURL } from "../base";
import { history } from "../../App";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.request?.responseURL === `${baseURL}api/users/profile` &&
      error?.response?.status === 403
    ) {
      history.push("/dashboard/awaiting-approval");
    } else {
      return Promise.reject(error);
    }
  }
);

export const getCurrentUser = async () => {
  try {
    const res = await instance.get("/api/users/profile");
    return res?.data;
  } catch (e) {
    return [];
  }
};

export const updateCurrentUser = async ({
  id,
  username,
  discordUser,
  approved,
  superAdmin,
  pilotNames,
}) => {
  try {
    const res = await instance.post("/api/users/profile", {
      id,
      username,
      discordUser,
      approved,
      superAdmin,
      pilotNames,
    });

    return res?.data;
  } catch (e) {
    return [];
  }
};
