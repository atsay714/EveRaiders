import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedDashboard } from "../../Dashboard/Dashboard.test";
import { getCurrentUser } from "../../api/users";

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

    render(<WrappedDashboard history={history} />);

    expect(await screen.findByText("Ore Buyback"));
  });

  test("Has no pilot names ", async () => {
    const history = createMemoryHistory();
    history.push("/dashboard/ore-buyback");

    getCurrentUser.mockImplementation(() => ({ pilotNames: [] }));

    render(<WrappedDashboard history={history} />);

    expect(await screen.findByText("Ore Buyback"));
  });
});
