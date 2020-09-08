import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testRoute } from "../../../testUtils";
import OreBuybackList from "./";

testRoute({
  route: "/admin/ore-buyback",
  loggedInText: "Ore Buyback Administration",
});
