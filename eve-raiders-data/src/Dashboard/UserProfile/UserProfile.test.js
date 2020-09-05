import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "../../testUtils";
import UserProfile from "../";

jest.mock("../../api/users", () => ({
  getCurrentUser: () => ({
    pilotNames: [{ id: 0, name: "Test Pilot" }],
  }),
}));

testRoute({
  route: "/dashboard/user-profile",
  loggedInText: "User Profile",
});
