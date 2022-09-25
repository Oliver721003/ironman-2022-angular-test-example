describe('AppComponent', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('2022 鐵人賽範例');
  });
});
