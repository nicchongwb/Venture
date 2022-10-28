describe("test home screen of main application", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("should display the main page of the applciation", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});
