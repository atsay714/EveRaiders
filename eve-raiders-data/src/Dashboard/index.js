import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { useQuery } from "react-query";
import { getCurrentUser } from "../api/admin";

import ResourceSearch from "./ResourceSearch";
import PlanetSearch from "./PlanetSearch";
import OreBuyback from "./OreBuyback";
import Users from "./Admin/Users";
import UnderDevelopment from "./UnderDevelopment";
import NavBar from "./NavBar";
import { TokenContext, UserContext } from "../contexts";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { loading, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  const token = useContext(TokenContext);

  return (
    <div className={styles.dashboard}>
      <UserContext.Provider value={currentUser}>
        {token && <NavBar />}
        <Switch>
          <PrivateRoute path="/dashboard/resource-search">
            <ResourceSearch />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/planet-search">
            <PlanetSearch />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/ore-buyback">
            <OreBuyback />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/admin/users">
            <Users />
          </PrivateRoute>
        </Switch>
      </UserContext.Provider>
    </div>
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
