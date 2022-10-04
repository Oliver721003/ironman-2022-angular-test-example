import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('瀏覽 2022 鐵人賽範例首頁', () => {
  cy.visit('/');
});

Then('瀏覽器標題顯示為 {string}', (expected: string) => {
  cy.title().should('eq', expected);
});

Then('標題列文字應為 {string}', (expected: string) => {
  cy.get('[color="primary"]').find('span').contains(expected);
});

Then('應進入商品清單頁面', () => {
  cy.url().should('include', '/product/list');
});
