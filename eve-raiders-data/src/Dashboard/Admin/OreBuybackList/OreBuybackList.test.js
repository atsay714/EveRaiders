import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../../Dashboard.test";

test("Route - /dashboard/admin/ore-buyback", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/admin/ore-buyback");

  render(<WrappedDashboard history={history} />);

  expect(await screen.findByText("Ore Buyback Administration"));
});
