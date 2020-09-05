import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./context/auth";

const Routes = () => (
  <Switch>
    <RestrictedRoute path="/login">
      <Login />
    </RestrictedRoute>
    <RestrictedRoute path="/forgot-password">
      <ForgotPassword />
    </RestrictedRoute>
    <RestrictedRoute path="/reset-password">
      <ResetPassword />
    </RestrictedRoute>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Redirect from="/" to="/login" />
  </Switch>
);

export default Routes;

const RestrictedRoute = ({ children }) => {
  const { token } = useAuth();

  return <Route>{token ? <Redirect to="/dashboard" /> : children}</Route>;
};
