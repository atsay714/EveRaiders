describe("Dashboard", () => {
  afterEach(() => {
    cy.contains("Logout").click({ force: true });
  });

  it("unapproved", () => {
    cy.login("unapproved");

    cy.visit("http://localhost:3000/");
    cy.contains("Account is currently awaiting approval");
  });

  it("approved - normal", () => {
    cy.login("normal");

    cy.visit("http://localhost:3000/");
    cy.contains("Find Resources");
  });

  it("approved - admin  ", () => {
    cy.login("admin");

    cy.visit("http://localhost:3000/");
    cy.contains("Find Resources");
  });
});
