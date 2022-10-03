describe('2022 鐵人賽範例', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('顯示瀏覽器標題為 "2022 鐵人賽範例"', () => {
    cy.title().should('eq', '2022 鐵人賽範例');
  });

  it('顯示標題為 "2022 鐵人賽範例"', () => {
    // cy.contains('2022 鐵人賽範例');
    // cy.contains('.title', '2022 鐵人賽範例');
    // cy.get('.title').contains('2022 鐵人賽範例');
    cy.get('[color="primary"]').find('span').contains('2022 鐵人賽範例');
  });

  specify('進入商品清單頁面', () => {
    cy.url().should('include', '/product/list');
  });
});
