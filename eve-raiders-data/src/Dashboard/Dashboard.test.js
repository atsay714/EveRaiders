import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, screen } from "@testing-library/react";
import { TokenContext, UserContext } from "../contexts";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./";

const user = {
  approved: true,
  discordUser: "testuser#12345",
  id: "8b4c6a9d-b00d-4530-acd1-deda79b666b4",
  pilotNames: [{ id: 1, name: "Test Pilot" }],
  superAdmin: true,
  username: "testuser",
};

export const WrappedDashboard = ({ history, token = "12345" }) => (
  <Router history={history}>
    <UserContext.Provider value={user}>
      <TokenContext.Provider value={[token, () => {}]}>
        <Dashboard />
      </TokenContext.Provider>
    </UserContext.Provider>
  </Router>
);

test("Default route", async () => {
  const history = createMemoryHistory();

  render(<WrappedDashboard history={history} token={""} />);

  expect(await screen.findByText("Raiders EVE Echoes Tools"));
});

test("Route - /dashboard/awaiting-approval", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/awaiting-approval");

  render(<WrappedDashboard history={history} />);

  expect(await screen.findByText("Account is currently awaiting approval."));
});
