import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../../testUtils";
import Prices from "./";

test("Route - /dashboard/admin/prices", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/admin/prices");

  render(
    <WrappedComponent history={history}>
      <Prices />
    </WrappedComponent>
  );

  expect(await screen.findByText("Prices"));
});
