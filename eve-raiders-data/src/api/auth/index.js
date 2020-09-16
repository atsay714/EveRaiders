import instance from "api/base";

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
    if (e.response.status === 401)
      return { error: "Invalid username or password" };

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

export const forgotPassword = async ({ email }) => {
  try {
    const res = await instance.post("/api/auth/forgot-password", { email });
    return { success: res.status === 200 };
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};

export const resetPassword = async ({ email, token, password }) => {
  try {
    const res = await instance.post("/api/auth/reset-password", {
      email,
      token,
      password,
    });

    return { success: res.status === 200 };
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};
