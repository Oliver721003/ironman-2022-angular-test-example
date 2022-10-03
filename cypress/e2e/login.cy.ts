describe('使用者登入', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.gotoLogin();
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

    after(() => {
      cy.request('DELETE', `${Cypress.env('apiUrl')}/users/userA`);
    });

    it('當輸入不存在帳號, 應顯示錯誤訊息, 且無法按下登入按鈕', () => {
      cy.fixture('users/id-not-exists').then(({ id, password }) => {
        cy.inputIdAndPassword(id, password);
        cy.login().should('be.disabled');
        cy.get('mat-error').should('exist').and('have.text', '此帳號不存在');
        cy.screenshot();
      });
    });

    it('當輸入錯誤帳號密碼, 應登入失敗', () => {
      cy.fixture('users/login-failed').then(({ id, password }) => {
        cy.inputIdAndPassword(id, password);
        cy.login().should('not.be.disabled');
        cy.snackBarShouldBe('登入失敗');
        cy.screenshot();
      });
    });

    it('當輸入正確帳號密碼, 應登入成功', () => {
      cy.fixture('users/login-success').then(({ id, password }) => {
        cy.inputIdAndPassword(id, password);
        cy.login().should('not.be.disabled');
        cy.snackBarShouldBe('登入成功');
        cy.screenshot();
      });
    });
  });
});
