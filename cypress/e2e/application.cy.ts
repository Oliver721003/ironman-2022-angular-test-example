describe('2022 鐵人賽範例', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('顯示瀏覽器標題為 "2022 鐵人賽範例"', () => {
    cy.title().should('eq', '2022 鐵人賽範例');
  });

  specify('進入商品清單頁面', () => {
    cy.url().should('include', '/product/list');
  });
});
