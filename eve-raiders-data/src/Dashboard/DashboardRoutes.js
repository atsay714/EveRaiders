import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ResourceSearch from "./ResourceSearch";
import PlanetSearch from "./PlanetSearch";
import OreBuyback from "./OreBuyback";
import Prices from "./Admin/Prices";
import Users from "./Admin/Users";
import OreBuybackList from "./Admin/OreBuybackList";
import UserProfile from "./UserProfile";
import useAuth from "../context/auth";

const DashboardRoutes = () => (
  <Switch>
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
    <PrivateRoute path={["/dashboard", "/dashboad/resource-search"]}>
      <ResourceSearch />
    </PrivateRoute>
  </Switch>
);

export default DashboardRoutes;

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route>
      {({ location }) => (token ? children : <Redirect to="/login" />)}
    </Route>
  );
};
