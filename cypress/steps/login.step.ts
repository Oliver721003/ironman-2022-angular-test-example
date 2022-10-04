import {
  After,
  Before,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: '@login' }, function () {
  cy.request('POST', `${Cypress.env('apiUrl')}/users`, {
    id: 'userA',
    password: '1234567',
  });
});

After({ tags: '@login' }, function () {
  cy.request('DELETE', `${Cypress.env('apiUrl')}/users/userA`);
});

Given('瀏覽 2022 鐵人賽範例登入頁面', () => {
  cy.visit('/');
});

When('點選標題列登入按鈕', () => {
  cy.gotoLogin();
});

When('輸入帳號 {string} 與密碼 {string}', (id: string, password: string) => {
  cy.inputIdAndPassword(id, password);
});

When('點選登入按鈕', () => {
  cy.login().should('not.be.disabled');
});

Then('應轉至登入頁面', () => {
  cy.url().should('include', '/login');
});

Then('錯誤訊息應顯示 {string}', (expected: string) => {
  cy.get('mat-error').should('exist').and('have.text', expected);
});

Then('顯示 {string} 訊息', (expected: string) => {
  cy.snackBarShouldBe(expected);
});

Then('無法按下登入按鈕', () => {
  cy.login().should('be.disabled');
});
