describe("Log in", () => {
  it("unapproved", () => {
    cy.login("unapproved");

    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/dashboard/awaiting-approval");
  });

  it("approved - normal", () => {
    cy.login("normal");

    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/dashboard/resource-search");
  });

  it("approved - admin  ", () => {
    cy.login("admin");

    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/dashboard/resource-search");
  });
});
