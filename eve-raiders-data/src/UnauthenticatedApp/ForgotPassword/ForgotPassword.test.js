import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "../testUtils";
import ForgotPassword from "./";

testRoute({
  route: "/forgot-password",
  loggedOutText: "Forgot Password",
});
