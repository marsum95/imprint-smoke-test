import AccountPage from "../pages/AccountPage";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    //Mocha automatically shares contexts for us across all applicable hooks for each test. 
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    
    it("should login successfully with valid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
    })

    it("should fail to login with invalid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)

        LoginPage.alertMsg
            .should('contains.text', 'Verification Error');
    })

    it("should perform login and logout", function () {

        cy.login(); //login via custom command

        basePage.header.performLogout();

        AccountPage.h1Heading
            .should('contains.text', 'Log Out');
    })
/**
 * This spec needs to run first to make sure the user is logged in before accessing
 * the normal flow of the application. Renaming the file to '01_[filename]' does the trick :).
 */
  /**
   * 2nd param replaces the global config (cypress.dev.json) only in the scope of the current .spec.
   * Similar to: Cypress.config('baseUrl', 'https://accounts.google.com');
   */
  it.only('should mock Google login', () => {
    // Intercept the authentication API
    cy.intercept('POST', '/api/auth/google', {
      statusCode: 200,
      body: { token: 'mock-token', user: { id: 1, name: 'Test User', email: 'test@example.com' } },
    }).as('googleAuth');

    // Visit the login page
    cy.visit('https://sigma.imprint.live/login');

    // Trigger the Google login button (ensure it exists on the page)
    cy.get(':nth-child(5) > .ant-row > .ant-col > .button-create > .ant-btn').click();

    // Wait for the mocked request
    cy.wait('@googleAuth');

    // Assert that the user is logged in
    cy.get('[data-cy="user-dashboard"]').should('be.visible');
  })

})
