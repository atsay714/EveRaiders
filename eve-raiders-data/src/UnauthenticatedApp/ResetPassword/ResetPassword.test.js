import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "../testUtils";
import ResetPassword from "./";

testRoute({
  route: "/reset-password?token=12345",
  loggedOutText: "Reset Password",
});
