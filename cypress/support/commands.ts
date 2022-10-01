declare namespace Cypress {
  interface Chainable<Subject = any> {
    gotoLogin(): Chainable<JQuery<HTMLElement>>;
    inputIdAndPassword(
      id: string,
      password: string
    ): Chainable<JQuery<HTMLElement>>;
    login(): Chainable<JQuery<HTMLElement>>;
    snackBarShouldBe(message: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('gotoLogin', () =>
  cy.get('button.mat-icon-button').eq(1).click()
);

Cypress.Commands.add('inputIdAndPassword', (id: string, password: string) => {
  cy.get('input[type=text]').type(id).blur();
  if (password) {
    cy.get('input[type=password]').type(password);
  }
});

Cypress.Commands.add('login', () => {
  return cy.get('button').contains('登入').parent().click({ force: true });
});

Cypress.Commands.add('snackBarShouldBe', (message: string) =>
  cy.get('.mat-snack-bar-container').should('exist').and('have.text', message)
);
