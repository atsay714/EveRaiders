import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "../../testUtils";
import PlanetSearch from "./";

testRoute({
  route: "/dashboard/planet-search",
  loggedInText: "Find Planets",
});
