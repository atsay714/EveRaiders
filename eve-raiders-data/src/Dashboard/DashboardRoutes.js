import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import useAuth from "../context/auth";
import ErrorBoundary from "../components/ErrorBoundary";

const ResourceSearch = lazy(() => import("./ResourceSearch"));
const PlanetSearch = lazy(() => import("./PlanetSearch"));
const OreBuyback = lazy(() => import("./OreBuyback"));
const Prices = lazy(() => import("./Admin/Prices"));
const Users = lazy(() => import("./Admin/Users"));
const OreBuybackList = lazy(() => import("./Admin/OreBuybackList"));
const UserProfile = lazy(() => import("./UserProfile"));

const DashboardRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default DashboardRoutes;

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route>
      {({ location }) => (token ? children : <Redirect to="/login" />)}
    </Route>
  );
};
