/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should find our home page", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});
