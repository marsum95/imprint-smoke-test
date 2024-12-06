import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class LoginPage extends BasePage{

    get continueBtn() { return cy.get('a').contains('Sign Up'); }
    get loginInput() { return cy.get('input[name="email"]'); }
    get passwordInput() { return cy.get('input[name="password"]'); }
    get loginBtn() { return cy.get('button[type="submit"]'); }
    get alertMsg() { return cy.get('.ant-notification-notice-message'); }
    get googleSign(){ return cy.get(':nth-child(5) > .ant-row > .ant-col > .button-create > .ant-btn')}
    

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }

    openRegistrationPage() {
        this.open();
        this.continueBtn.click();
    }

    loginWithUI(email, password) {
        this.open();
        this.loginInput.type(email)
        this.passwordInput.type(password)
        this.loginBtn.click()
    }


}


export default new LoginPage();

