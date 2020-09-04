import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../../Dashboard.test";

test("Route - /dashboard/admin/prices", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/admin/prices");

  render(<WrappedDashboard history={history} />);

  expect(await screen.findByText("Prices"));
});
