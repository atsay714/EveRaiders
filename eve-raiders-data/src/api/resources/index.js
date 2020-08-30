import instance from "../base";

export const getResources = async () => {
  try {
    const res = await instance.get("/api/services/resources");
    return res?.data;
  } catch (e) {
    return [];
  }
};
