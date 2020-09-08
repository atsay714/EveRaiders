import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../api/users";
import Loader from "../components/Loader";
import * as api from "../api/auth";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();

  const setTokenLocalStorage = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    } else {
      localStorage.removeItem("token");
    }

    setToken(data);
  };

  useEffect(() => {
    if (token) {
      getCurrentUser().then(setUser);
    }
  }, []);

  const register = (form) => api.register(form);

  const login = async (form) => {
    const { success, error, data } = await api.login(form);
    setTokenLocalStorage(data);
    setUser(await getCurrentUser());

    return { success, error };
  };

  const logout = () => {
    setTokenLocalStorage();
    setUser();
  };

  if (token && !user) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Loader size={200} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        data: { user, token },
        register,
        login,
        logout,
      }}
      {...props}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
