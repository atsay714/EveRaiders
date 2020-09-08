import React, { Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import useUser from "../context/user";

const ResourceSearch = lazy(() => import("./ResourceSearch"));
const PlanetSearch = lazy(() => import("./PlanetSearch"));
const OreBuyback = lazy(() => import("./OreBuyback"));
const Prices = lazy(() => import("./Admin/Prices"));
const Users = lazy(() => import("./Admin/Users"));
const OreBuybackList = lazy(() => import("./Admin/OreBuybackList"));
const UserProfile = lazy(() => import("./UserProfile"));
const AwaitingApproval = lazy(() => import("../AwaitingApproval"));

const Routes = () => {
  const location = useLocation();
  const user = useUser();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {user.approved === false && (
            <Route path={"*"}>
              <AwaitingApproval />
            </Route>
          )}
          <Route path="/planet-search">
            <PlanetSearch />
          </Route>
          <Route path="/ore-buyback">
            <OreBuyback />
          </Route>
          <Route path="/admin/users">
            <Users />
          </Route>
          <Route path="/admin/ore-buyback">
            <OreBuybackList />
          </Route>
          <Route path="/admin/prices">
            <Prices />
          </Route>
          <Route path="/user-profile">
            <UserProfile />
          </Route>
          <Route path={"*"}>
            <ResourceSearch />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
