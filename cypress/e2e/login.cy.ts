describe('使用者登入', () => {
  before(() => {
    cy.request('POST', 'http://localhost:3000/users', {
      id: 'userA',
      password: '1234567',
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('button.mat-icon-button').eq(1).click();
  });

  after(() => {
    cy.request('DELETE', 'http://localhost:3000/users/userA');
  });

  it('當點選登入按鈕, 應轉至登入頁面', () => {
    cy.url().should('include', '/login');
  });

  it('當輸入不存在帳號, 應顯示錯誤訊息, 且無法按下登入按鈕', () => {
    cy.get('button.mat-icon-button').contains('login').click();
    cy.get('input[type=text]').type('userB').blur();
    // cy.contains('此帳號不存在').should('exist');
    // cy.get('mat-error').should('have.text', '此帳號不存在');
    // cy.get('mat-error').should('exist').and('have.text', '此帳號不存在');
    cy.get('mat-error').should((target) => {
      expect(target).to.exist;
      expect(target).to.have.text('此帳號不存在');
    });
    cy.get('button').contains('登入').parent().should('be.disabled');
    // cy.get('button')
    //   .contains('登入')
    //   .parent()
    //   .should('have.class', 'mat-button-disabled');
  });

  it('當輸入錯誤帳號密碼, 應登入失敗', () => {
    cy.get('button.mat-icon-button').contains('login').click();
    cy.get('input[type=text]').type('userA');
    cy.get('input[type=password]').type('00000');
    cy.get('button').contains('登入').parent().should('not.be.disabled');
    cy.get('button').contains('登入').click();
    cy.contains('登入失敗').should('exist');
  });

  it('當輸入正確帳號密碼, 應登入成功', () => {
    cy.get('button.mat-icon-button').contains('login').click();
    cy.get('input[type=text]').type('userA');
    cy.get('input[type=password]').type('1234567');
    cy.get('button').contains('登入').parent().should('not.be.disabled');
    cy.get('button').contains('登入').click();
    cy.contains('登入成功').should('exist');
  });
});
