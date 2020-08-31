import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import { ReactQueryDevtools } from "react-query-devtools";
import useLocalStorage from "./hooks/useLocalStorage";
import { createBrowserHistory } from "history";
import { TokenContext } from "./contexts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";

export const history = createBrowserHistory();

function App() {
  const [token, setToken] = useLocalStorage("token", "");

  useEffect(() => {
    if (
      !token &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      history.push("/login", {
        state: { message: "You have been logged out" },
      });
      // force refresh the page since history.push isn't changing components for us
      window.location.reload();
    }
  }, [token]);

  return (
    <div className="App">
      <TokenContext.Provider value={[token, setToken]}>
        <Router history={history}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Switch>
            <Route path="/login">
              {(props) => <Login {...props} onLogin={setToken} />}
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Redirect from="/" to="/dashboard/resource-search" exact />
          </Switch>
        </Router>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
