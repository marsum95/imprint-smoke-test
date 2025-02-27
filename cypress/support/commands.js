// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

import LoginPage from '../e2e/pages/LoginPage';
import SignupPage from '../e2e/pages/SignupPage';

Cypress.Commands.add('login', () => {
    //command for login with valid user

    cy.fixture('users.json').then((users) => {
        LoginPage.loginWithUI(users.validUser.email, users.validUser.password);
    });
});

Cypress.Commands.add('validateFormField', (inputField, message) => {
    return inputField
        .then(($input) => SignupPage.inputValidationErr($input))
        .should('be.visible')
        .and('have.text', message);
});
