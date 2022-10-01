describe('使用者登入', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('button.mat-icon-button').eq(1).click();
  });

  it('當點選登入按鈕, 應轉至登入頁面', () => {
    cy.url().should('include', '/login');
  });

  describe('登入作業', () => {
    before(() => {
      cy.request('POST', `${Cypress.env('apiUrl')}/users`, {
        id: 'userA',
        password: '1234567',
      });
    });

    beforeEach(() => {
      cy.get('input[type=text]').as('id');
      cy.get('input[type=password]').as('password');
      cy.get('button').contains('登入').parent().as('loginButton');
    });

    after(() => {
      cy.request('DELETE', `${Cypress.env('apiUrl')}/users/userA`);
    });

    it('當輸入不存在帳號, 應顯示錯誤訊息, 且無法按下登入按鈕', () => {
      cy.fixture('users/id-not-exists').then(({ id, password }) => {
        cy.get('@id').type(id).blur();
        cy.get('@loginButton').should('be.disabled');
        cy.get('mat-error').should('exist').and('have.text', '此帳號不存在');
      });
    });

    it('當輸入錯誤帳號密碼, 應登入失敗', () => {
      cy.fixture('users/login-failed').then(({ id, password }) => {
        cy.get('@id').type(id);
        cy.get('@password').type(password);
        cy.get('@loginButton').click({ force: true }).should('not.be.disabled');
        cy.get('.mat-snack-bar-container')
          .should('exist')
          .and('have.text', '登入失敗');
      });
    });

    it('當輸入正確帳號密碼, 應登入成功', () => {
      cy.fixture('users/login-success').then(({ id, password }) => {
        cy.get('@id').type(id);
        cy.get('@password').type(password);
        cy.get('@loginButton').click({ force: true }).should('not.be.disabled');
        cy.get('.mat-snack-bar-container')
          .should('exist')
          .and('have.text', '登入成功');
      });
    });
  });
});
