import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./context/auth";
import AwaitingApproval from "./AwaitingApproval";

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
    <Redirect from="/" to="/login" exact />
    <Route path="/awaiting-approval">
      <AwaitingApproval />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
  </Switch>
);

export default Routes;

const RestrictedRoute = ({ children }) => {
  const { token } = useAuth();

  return (
    <Route>
      {(props) =>
        token ? (
          <Redirect to="/dashboard" />
        ) : (
          React.cloneElement(children, props)
        )
      }
    </Route>
  );
};
