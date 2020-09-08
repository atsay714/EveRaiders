import React, { useState, useEffect } from "react";
import { ModalProvider } from "./components/Modal";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import "./App.scss";
import { AuthContext } from "./context/auth";
import instance from "./api/base";

const queryConfig = {
  refetchAllOnWindowFocus: true,
  staleTime: 60000,
};

export const history = createBrowserHistory();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setTokenLocalStorage = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    } else {
      localStorage.removeItem("token");
    }

    setToken(data);
  };

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (401 === error.response.status) {
          setTokenLocalStorage();
          history.push({
            pathname: "/login",
            state: "You have been logged out",
          });
        } else {
          return Promise.reject(error);
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <ReactQueryConfigProvider config={queryConfig}>
        <AuthContext.Provider value={{ token, setToken: setTokenLocalStorage }}>
          <ModalProvider>
            <Router history={history}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Routes />
            </Router>
          </ModalProvider>
        </AuthContext.Provider>
      </ReactQueryConfigProvider>
    </div>
  );
};

export default App;
