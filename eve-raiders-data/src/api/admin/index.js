import instance from "api/base";

export const getUsers = async () => {
  try {
    const res = await instance.get("/api/administration/users");
    return res?.data;
  } catch (e) {
    return [];
  }
};

export const approveUser = async ({ userName, approve }) => {
  try {
    const res = await instance.post("/api/administration/approve", null, {
      params: { userName, approve },
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

export const getTaxes = async () => {
  try {
    const res = await instance.get("/api/administration/prices/taxes");
    return res.data;
  } catch (e) {
    return [];
  }
};

export const updateTaxes = async (taxes) => {
  try {
    const res = await Promise.all(
      taxes.map(
        async (tax) =>
          (await instance.put("/api/administration/prices/taxes", tax)).data
      )
    );
    return res;
  } catch (e) {
    return [];
  }
};
