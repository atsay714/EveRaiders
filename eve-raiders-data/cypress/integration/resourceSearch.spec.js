beforeEach(() => {
  cy.login();
  cy.visit("http://localhost:3000/dashboard/resource-search");
});

describe("Resource Search", () => {
  it("Shows validation errors", () => {
    cy.contains("Resource is required").should("not.exist");

    cy.contains("Submit").click();

    cy.contains("Resource is required");
  });

  it("Retrieve data", () => {
    cy.get("#downshift-3-toggle-button").click();
    cy.contains("Lustering Alloy").click();

    cy.contains("Submit").click();

    cy.contains("J1AU-9");
  });
});
