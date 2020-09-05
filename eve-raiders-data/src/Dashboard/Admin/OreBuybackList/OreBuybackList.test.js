import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../../testUtils";
import OreBuybackList from "./";

test("Route - /dashboard/admin/ore-buyback", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/admin/ore-buyback");

  render(
    <WrappedComponent history={history}>
      <OreBuybackList />
    </WrappedComponent>
  );

  expect(await screen.findByText("Ore Buyback Administration"));
});
