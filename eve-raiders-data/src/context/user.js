import { createContext, useContext } from "react";

export const UserContext = createContext();

const useCurrentUser = () => useContext(UserContext);

export default useCurrentUser;
