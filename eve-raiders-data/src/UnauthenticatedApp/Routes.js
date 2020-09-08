import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ResetPassword from "../ResetPassword";
import ForgotPassword from "../ForgotPassword";
import Login from "../Login";
import AwaitingApproval from "../AwaitingApproval";

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/forgot-password">
      <ForgotPassword />
    </Route>
    <Route path="/reset-password">
      <ResetPassword />
    </Route>
    <Route path="*">
      <Login />
    </Route>
  </Switch>
);

export default Routes;
