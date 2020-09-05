import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../testUtils";
import ResourceSearch from "./";

test("Route - /dashboard/resource-search", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/resource-search");

  render(
    <WrappedComponent history={history}>
      <ResourceSearch />
    </WrappedComponent>
  );

  expect(await screen.findByText("Find Resources"));
});
