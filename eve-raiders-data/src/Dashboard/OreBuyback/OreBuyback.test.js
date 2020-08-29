import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResourceSearch from ".";

const mockData = [
  {
    id: 40000002,
    name: "Tanoo I",
    type: "Temperate",
    system: "Tanoo",
    constellation: "San Matar",
    resources: [
      {
        type: "Base Metals",
        richness: "Medium",
      },
      {
        type: "Condensates",
        richness: "Medium",
      },
      {
        type: "Heavy Water",
        richness: "Rich",
      },
    ],
  },
];

const server = setupServer(
  rest.get(
    "https://everaiders.azurewebsites.net/api/planets",
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("submits correct values", async () => {
  const { container } = render(<ResourceSearch />);

  const names = [
    "name",
    "type",
    "system",
    "constellation",
    "resource_type",
    "richness",
  ];

  const elements = names.map((name) =>
    container.querySelector(`input[name="${name}"]`)
  );

  await Promise.all(
    elements.map((el, i) =>
      waitFor(() =>
        fireEvent.change(el, { target: { value: `mock_${names[i]}` } })
      )
    )
  );

  // expect(results.innerHTML).toBe(
  //   '{"email":"mock@email.com","name":"mockname","color":"green"}'
  // );
});
