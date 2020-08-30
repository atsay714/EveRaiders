import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import ResourceSearch from "./ResourceSearch";
import PlanetSearch from "./PlanetSearch";
import OreBuyback from "./OreBuyback";
import UnderDevelopment from "./UnderDevelopment";
import NavBar from "./NavBar";
import { createBrowserHistory } from "history";
import useLocalStorage from "../hooks/useLocalStorage";
import { TokenContext } from "../contexts";
import styles from "./Dashboard.module.scss";

export const history = createBrowserHistory();

const Dashboard = () => {
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
    <TokenContext.Provider value={[token, setToken]}>
      <Router history={history}>
        <div className={styles.dashboard}>
          {token && <NavBar />}
          <Switch>
            <Route path="/login">
              {(props) => <Login {...props} onLogin={setToken} />}
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/resource-search">
              <ResourceSearch />
            </PrivateRoute>
            <PrivateRoute path="/planet-search">
              <PlanetSearch />
            </PrivateRoute>
            <PrivateRoute path="/ore-buyback">
              <OreBuyback />
            </PrivateRoute>
            <Redirect from="/" to="/resource-search" exact />
          </Switch>
        </div>
      </Router>
    </TokenContext.Provider>
  );
};

export default Dashboard;

const PrivateRoute = ({ children, ...rest }) => {
  const [token, setToken] = useContext(TokenContext);

  return (
    <Route>
      {({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    </Route>
  );
};
