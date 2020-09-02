import instance from "../base";

export const buyback = async (resources) => {
  try {
    const res = await instance.post("/api/services/buyback", resources);

    return { success: res?.data?.status === "Success", data: res.data };
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};
