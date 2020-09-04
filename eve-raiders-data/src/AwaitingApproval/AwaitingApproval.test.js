import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../Dashboard/Dashboard.test";

test("Route - /dashboard/awaiting-approval", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/awaiting-approval");

  render(<WrappedDashboard history={history} />);

  expect(await screen.findByText("Account is currently awaiting approval."));
});
