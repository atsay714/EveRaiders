import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "testUtils";
import UserAdmin from "./";

testRoute({
  route: "/admin/users",
  loggedInText: "User Administration",
});
