import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getCurrentUser } from "../../api/users";
import { testRoute } from "../../testUtils";
import OreBuyback from "./";

jest.mock("../../api/users", () => ({
  getCurrentUser: jest.fn(),
}));

testRoute({
  route: "/ore-buyback",
  loggedInText: "Ore Buyback",
});

test("Has pilot names ", async () => {
  getCurrentUser.mockImplementation(() => ({
    pilotNames: [{ id: 0, name: "Test Pilot" }],
  }));

  render(<OreBuyback />);

  expect(await screen.findByText("Ore Buyback"));
});

test("Has no pilot names ", async () => {
  getCurrentUser.mockImplementation(() => ({ pilotNames: [] }));

  render(<OreBuyback />);
  expect(await screen.findByText("Ore Buyback"));
});
