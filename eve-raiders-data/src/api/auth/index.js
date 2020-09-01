import instance from "../base";

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
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
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

    return { success: res?.data?.status === "Success" };
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};
