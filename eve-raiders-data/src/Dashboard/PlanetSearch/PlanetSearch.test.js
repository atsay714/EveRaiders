import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../testUtils";
import PlanetSearch from "./";

test("Route - /dashboard/planet-search", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/planet-search");

  render(
    <WrappedComponent history={history}>
      <PlanetSearch />
    </WrappedComponent>
  );

  expect(await screen.findByText("Find Planets"));
});
