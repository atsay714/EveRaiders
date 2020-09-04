import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../../Dashboard/Dashboard.test";

test("Route - /dashboard/resource-search", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/resource-search");

  render(<WrappedDashboard history={history} />);

  expect(await screen.findByText("Find Resources"));
});
