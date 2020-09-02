import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import { getCurrentUser } from "../api/users";
import AwaitingApproval from "../AwaitingApproval";
import ResourceSearch from "./ResourceSearch";
import PlanetSearch from "./PlanetSearch";
import OreBuyback from "./OreBuyback";
import Users from "./Admin/Users";
import OreBuybackList from "./Admin/OreBuybackList";
import NavBar from "./NavBar";
import { TokenContext, UserContext } from "../contexts";
import { history } from "../App";
import styles from "./Dashboard.module.scss";
import OreBuybacklist from "./Admin/OreBuybackList";

const Dashboard = () => {
  const { loading, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  const token = useContext(TokenContext);

  useEffect(() => {
    if (currentUser?.approved === false) {
      history.push("/awaiting-approval");
    }
  }, [currentUser?.approved]);

  return (
    <div className={styles.dashboard}>
      <UserContext.Provider value={currentUser}>
        {token && <NavBar />}
        <Switch>
          <Route path="/dashboard/awaiting-approval">
            <AwaitingApproval />
          </Route>
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
          <PrivateRoute path="/dashboard/admin/ore-buyback">
            <OreBuybacklist />
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
