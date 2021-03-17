import { ContextPack } from '../../src/app/contextpack/contextpack';

export class AddContextpackPage {
  navigateTo() {
    return cy.visit('/contextpack/new');
  }

  getTitle() {
    return cy.get('.add-contextpack-title');
  }

  addContextPackButton() {
    return cy.get('[data-test=confirmAddContextPackButton]');
  }

  selectMatSelectValue(select: Cypress.Chainable, value: boolean) {
    // Find and click the drop down
    return select.click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click();
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
  }

  addContextPack(newContextPack: ContextPack) {
    this.getFormField('name').type(newContextPack.name);
    this.getFormField('icon').type(newContextPack.icon);
    if (newContextPack.wordPacks[0]) {
      this.getFormField('name').type(newContextPack.wordPacks[0].name);
      //more fields here
    }
    this.selectMatSelectValue(this.getFormField('enabled'), newContextPack.enabled);
    return this.addContextPackButton().click();
  }
}
