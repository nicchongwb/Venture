describe("test home screen of main application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the main page of the applciation", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});
