import axios from "axios";

const baseURL = "https://everaiders.azurewebsites.net/";

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

export const login = async ({ username, password }) => {
  try {
    const res = await instance.post("/api/auth/login", {
      username,
      password,
    });
    if (res?.data?.token) {
      return { success: true, data: res.data.token };
    }
    return { success: false };
  } catch (e) {
    return { error: e };
  }
};

export const register = async ({ username, email, password, discordUser }) => {
  try {
    const res = await instance.post("/api/auth/register", {
      username,
      email,
      password,
      discordUser,
    });
    debugger;

    return { success: res?.data?.status === "Success" };
  } catch (e) {
    debugger;
    return {
      errors: Object.values(e.response.data) ||
        e.response.data.value || ["An unknown error occured"],
    };
  }
};
