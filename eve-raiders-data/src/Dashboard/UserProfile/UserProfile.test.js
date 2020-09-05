import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../testUtils";
import UserProfile from "../";

jest.mock("../../api/users", () => ({
  getCurrentUser: () => ({
    pilotNames: [{ id: 0, name: "Test Pilot" }],
  }),
}));

test("Route - /dashboard/user-profile", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/user-profile");

  render(
    <WrappedComponent history={history}>
      <UserProfile />
    </WrappedComponent>
  );
  expect(await screen.findAllByText("User Profile"));
});
