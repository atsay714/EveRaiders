import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../Dashboard/Dashboard.test";

test("Route - /login", async () => {
  const history = createMemoryHistory();
  history.push("/login");

  render(<WrappedDashboard history={history} token={""} />);

  expect(await screen.findByText("Raiders EVE Echoes Tools"));
  expect(await screen.findByText("Create Account"));
});
