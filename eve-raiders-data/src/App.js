import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { ModalProvider } from "./components/Modal";
import { ReactQueryDevtools } from "react-query-devtools";
import useLocalStorage from "./hooks/useLocalStorage";
import { createBrowserHistory } from "history";
import { TokenContext } from "./contexts";
import { Router } from "react-router-dom";
import "./App.scss";

export const history = createBrowserHistory();

function App() {
  const [token, setToken] = useLocalStorage("token", "");

  useEffect(() => {
    if (
      !token &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      history.push("/login", {
        state: { message: "You have been logged out" },
      });
    }
  }, [token]);

  return (
    <div className="App">
      <TokenContext.Provider value={[token, setToken]}>
        <ModalProvider>
          <Router history={history}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Dashboard />
          </Router>
        </ModalProvider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
