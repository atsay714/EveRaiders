import instance, { baseURL } from "../base";
import { history } from "../../App";

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
