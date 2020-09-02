import instance from "../base";

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
