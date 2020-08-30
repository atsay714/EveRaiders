import instance from "../base";

export const buyback = async (resources) => {
  try {
    const res = await instance.post("/api/services/buyback", resources);

    return { success: res?.data?.status === "Success", data: res.data };
  } catch (e) {
    return {
      errors: Object.values(e.response.data) ||
        e.response.data.value || ["An unknown error occured"],
    };
  }
};
