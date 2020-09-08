import instance from "api/base";

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

export const getPrices = async (userName) => {
  try {
    const res = await instance.get("/api/administration/prices/resources");
    return res.data;
  } catch (e) {
    return [];
  }
};

export const updatePrices = async (prices) => {
  try {
    const res = await instance.post(
      "/api/administration/prices/resources",
      prices
    );
    return res.data;
  } catch (e) {
    return [];
  }
};
