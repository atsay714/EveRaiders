import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AwaitingApproval from "./AwaitingApproval";
import Login from "./Login";
import ResourceSearch from "./Dashboard/ResourceSearch";
import PlanetSearch from "./Dashboard/PlanetSearch";
import OreBuyback from "./Dashboard/OreBuyback";
import Prices from "./Dashboard/Admin/Prices";
import Users from "./Dashboard/Admin/Users";
import OreBuybackList from "./Dashboard/Admin/OreBuybackList";
import UserProfile from "./Dashboard/UserProfile";
import { TokenContext } from "./contexts";

const Routes = () => {
  const [token, setToken] = useContext(TokenContext);

  return (
    <Switch>
      <Route path="/dashboard/awaiting-approval">
        <AwaitingApproval />
      </Route>
      <Route path="/login">
        <Login />
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
        <OreBuybackList />
      </PrivateRoute>
      <PrivateRoute path="/dashboard/admin/prices">
        <Prices />
      </PrivateRoute>
      <PrivateRoute path="/dashboard/user-profile">
        <UserProfile />
      </PrivateRoute>
      {token ? (
        <Redirect from="/" to="/dashboard/resource-search" exact />
      ) : (
        <Redirect from="/" to="/login" exact />
      )}
    </Switch>
  );
};

export default Routes;

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
