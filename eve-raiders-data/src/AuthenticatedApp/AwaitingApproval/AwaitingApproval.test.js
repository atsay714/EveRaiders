import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AwaitingApproval from "./";
import { testRoute } from "testUtils";

testRoute({
  route: "/awaiting-approval",
  loggedInText: "Account is currently awaiting approval.",
  approved: false,
});
