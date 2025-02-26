import BasePage from './BasePage';
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from '../config/Constants';

class SigninPage extends BasePage {
    get loginInput() {
        return cy.get('input[name="email"]');
    }

    get passwordInput() {
        return cy.get('input[name="password"]');
    }

    get loginBtn() {
        return cy.get('button[type="submit"]');
    }

    get continueBtn() {
        return cy.get('a').contains('Sign Up');
    }
    //get alertMsg() { return cy.get('.ant-notification-notice-message'); }
    //get googleSign(){ return cy.get(':nth-child(5) > .ant-row > .ant-col > .button-create > .ant-btn')}

    // signin flow
    get uploadPic() {
        return cy.get('input[type="file"]');
    }
    get uploadBtn() {
        return cy.get('button[type="button"]').contains('OK');
    }
    get displaynameInput() {
        return cy.get('#displayName');
    }
    get usernameInput() {
        return cy.get('#username');
    }
    get aboutInput() {
        return cy.get('#about');
    }
    get registerBtn() {
        return cy.get('button[type="submit"]');
    }

    get inputValidationErr() {
        return (inputField) => cy.wrap(inputField).get('.error-label');
    }

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT);
    }

    openquiz() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open('https://sigma.imprint.live/value-profile-quiz');
    }

    openRegistrationPage() {
        this.open();
        //this.continueBtn.click();
    }

    // loginWithUI(email, password) {
    //     this.open();
    //     this.loginInput.type(email);
    //     this.passwordInput.type(password);
    //     this.loginBtn.click();
    // }

    userProfilePic() {
        this.uploadPic.selectFile('cypress/fixtures/Sofie.jpg', {
            force: true,
        });
        this.uploadBtn.click();
    }

    userDisplayName(displayname) {
        this.displaynameInput.type(displayname);
    }
    userNameValid(username) {
        this.usernameInput.type(username);
    }
    userAboutme(aboutme) {
        this.aboutInput.type(aboutme);
    }

    registerProfile() {
        this.registerBtn.click();
    }

    clickOnSingupBtn() {
        this.continueBtn.click();
    }
}

export default new SigninPage();
