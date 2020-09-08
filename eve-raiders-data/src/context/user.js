import React, { createContext, useContext } from "react";
import useAuth from "./auth";

const UserContext = createContext();

export const UserProvider = (props) => {
  const { data } = useAuth();

  return <UserContext.Provider value={data?.user} {...props} />;
};

const useUser = () => useContext(UserContext);

export default useUser;
