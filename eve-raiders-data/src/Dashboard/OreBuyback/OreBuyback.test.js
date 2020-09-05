import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../testUtils";
import { getCurrentUser } from "../../api/users";
import OreBuyback from "./";

jest.mock("../../api/users", () => ({
  getCurrentUser: jest.fn(),
}));

describe("Route - /dashboard/ore-buyback", () => {
  test("Has pilot names ", async () => {
    const history = createMemoryHistory();
    history.push("/dashboard/ore-buyback");

    getCurrentUser.mockImplementation(() => ({
      pilotNames: [{ id: 0, name: "Test Pilot" }],
    }));

    render(
      <WrappedComponent history={history}>
        <OreBuyback />
      </WrappedComponent>
    );

    expect(await screen.findByText("Ore Buyback"));
  });

  test("Has no pilot names ", async () => {
    const history = createMemoryHistory();
    history.push("/dashboard/ore-buyback");

    getCurrentUser.mockImplementation(() => ({ pilotNames: [] }));

    render(
      <WrappedComponent history={history}>
        <OreBuyback />
      </WrappedComponent>
    );
    expect(await screen.findByText("Ore Buyback"));
  });
});
