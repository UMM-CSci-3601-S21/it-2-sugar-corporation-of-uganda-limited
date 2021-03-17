// import {ContextPack} from 'src/app/contextpack/contextpack';
// From Purple Tigers https://github.com/UMM-CSci-3601-S21/it-1-purple-tigers
// export class AddContextPackPage {
//   navigateTo() {
//     return cy.visit('/contextpacks/new');
//   }

//   getTitle() {
//     return cy.get('.add-contextpack-title');
//   }

//   addContextPackButton() {
//     return cy.get('[data-test=confirmAddContextPackButton]');
//   }

//   selectMatSelectValue(select: Cypress.Chainable, value: string) {
//     // Find and click the drop down
//     return select.click({multiple: true, force: true})
//       // Select and click the desired value from the resulting menu
//       .get(`mat-option[value="${value}"]`).click({multiple: true, force: true});
//   }

//   getFormField(fieldName: string) {
//     return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
//   }

//   addWordPack() {
//     return cy.get('mat-form-field [fomcontrolname=${fieldName}]');
//   }

//   addPosArray(pos: string){
//     return cy.get('.add-${pos}-button').click({force: true});
//   }

//   contextPackForm(){
//     return cy.get('.form-value');
//   }

//   addPack(newPack: ContextPack) {
//     this.getFormField('name').type(newPack.name);
//     this.getFormField('enabled').click({force: true});
//     this.addWordPack();
//     this.addPosArray('noun');
//     this.addPosArray('verb');
//     this.addPosArray('adjective');
//     this.addPosArray('misc');
//     if(newPack.wordPacks) {
//       this.getFormField('name').then(els => {
//         [...els].forEach(el => cy.wrap(el).type('fun', {force: true}));
//       });
//     }
//     this.selectMatSelectValue(this.getFormField('enabled'), newPack.enabled.toString());
//     return this.addContextPackButton().click({multiple: true, force: true });
//   }
// }
