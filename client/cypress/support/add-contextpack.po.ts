import {ContextPack} from 'src/app/contextpack/contextpack';

export class AddContextPackPage {
  navigateTo() {
    return cy.visit('/contextpacks/new');
  }

  getTitle() {
    return cy.get('.add-contextpack-title');
  }

  addContextPackButton() {
    return cy.get('[data-test=confirmAddContextPackButton]');
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    // Find and click the drop down
    return select.click({multiple: true, force: true})
      // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click({multiple: true, force: true});
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
  }

  addUser(newUser: User) {
    this.getFormField('name').type(newUser.name);
    this.getFormField('age').type(newUser.age.toString());
    if (newUser.company) {
      this.getFormField('company').type(newUser.company);
    }
    if (newUser.email) {
      this.getFormField('email').type(newUser.email);
    }
    this.selectMatSelectValue(this.getFormField('role'), newUser.role);
    return this.addUserButton().click();
  }
}
