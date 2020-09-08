describe("Login", () => {
  beforeEach(() => {
    cy.contains("Logout").click({ force: true });
  });

  it("Shows login field validation", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Username is required").should("not.exist");
    cy.contains("Password is required").should("not.exist");

    cy.contains("Log in").click();

    cy.contains("Username is required");
    cy.contains("Password is required");
  });

  it("Shows register field validation", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Create Account").click();

    cy.contains("Username is required").should("not.exist");
    cy.contains("Email is required").should("not.exist");
    cy.contains("Password is required").should("not.exist");
    cy.contains("Discord User is required").should("not.exist");

    cy.contains("Register").click();

    cy.contains("Username is required");
    cy.contains("Email is required");
    cy.contains("Password is required");
    cy.contains("Discord User is required");
  });

  it("Switches between login and register", () => {
    cy.contains("Create Account").click();
    cy.contains("Back to login").click();

    cy.contains("Log in");
  });
});
