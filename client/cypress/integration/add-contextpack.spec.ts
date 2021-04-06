import { ContextPack } from 'src/app/contextpack/contextpack';
import { AddWordListPage } from '../support/add-contextpack.po';

describe('Add a Context pack', () => {
  const page = new AddWordListPage();

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'Create A New Context Pack');
  });

  it('Should show error messages for invalid inputs', () => {
    // Before doing anything there shouldn't be an error
    cy.get('[data-test=nameError]').should('not.exist');
    // Just clicking the name field without entering anything should cause an error message
    page.getFormField('name').click().blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    // Entering a valid name should remove the error.
    page.getFormField('name').clear().type('Jojo').blur();
    cy.get('[data-test=nameError]').should('not.exist');


    page.addWordList();
    page.addPosArray('noun');
    cy.get('[data-test=nameError]').should('not.exist');
    page.getFormField('name').then(els => {
      [...els].forEach(el => cy.wrap(el).click().blur());
    });
    page.getFormField('name').then(els => {
      [...els].forEach(el => cy.wrap(el).type('horsies'));
    });
    cy.get('[data-test=nameError]').should('not.exist');

  });
 });
