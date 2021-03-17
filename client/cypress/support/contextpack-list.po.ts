export class ContextpackListPage {
  navigateTo() {
    return cy.visit('');
  }

  getUrl() {
    return cy.url();
  }

  getContextpackCards() {
    return cy.get('.packs-cards-container app-contextpack-card');
  }

  getContextpackTitle() {
    return cy.get('.contextpack-list-title');
  }

  addContextpackButton() {
    return cy.get('[data-test=addContextpackButton]');
  }
}
