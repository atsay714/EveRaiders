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

export const getUserOrders = async () => {
  try {
    const res = await instance.get("/api/users/orders");

    return res.data;
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};

export const getOrders = async () => {
  try {
    const res = await instance.get("/api/administration/orders/buyback");

    return res.data;
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};

export const updateStatus = async ({ buyBackRequestId, status }) => {
  try {
    const res = await instance.put(
      `/api/administration/buyback/${buyBackRequestId}/status/${status}`
    );

    return res.data;
  } catch (e) {
    return {
      error: e.response?.data?.message ||
        e.message || ["An unknown error occured. Please try again."],
    };
  }
};
