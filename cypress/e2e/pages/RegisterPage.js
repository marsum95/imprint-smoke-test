import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class RegisterPage extends BasePage{


   // get firstnameInput() { return cy.get('#email') }
  //  get lastnameInput() { return cy.get('#year') }
    get emailInput() { return cy.get('input[placeholder="Enter email address or phone number"]') } // getting email from the form 
    get yearValue() { return cy.get('#year')}
    get monthValue() { return cy.get('#month')}
    get dayValue() { return cy.get('#day')}
   // get telephoneInput() { return cy.get('#input-telephone'); }
    get passwordInput() { return cy.get('#password') } // getting password from 
    get passwordConfirmInput() { return cy.get('#confirmPassword') }
    get policyCheckbox() { return cy.get('input[type="checkbox"][name="agree"]'); }
    get signupBtn() { return cy.get(':nth-child(5) > .button-create > .ant-btn') }
    get ageVeriyPopup() { return cy.get('.ant-modal-footer > .ant-btn-primary')}

    get inputValidationErr() { return (inputField) => cy.wrap(inputField).get('.error-label'); }

    get alertMsg() { return cy.get('.ant-notification-notice-message'); }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.REGISTRATION_ENDPOINT)
    }


    enterfirstName(username) {
        this.firstnameInput.type(username);
        return this;
    }

    enterlastName(lastname) {
        this.lastnameInput.type(lastname);
        return this;
    }

    enterPassword(password) {
        this.passwordInput.type(password);
        return this;
    }

    enterConfirmPassword(password) {
        this.passwordConfirmInput.type(password);
        return this;
    }

    enterEmail(email) {
        this.emailInput.type(email);
        return this;
    }
    enterYear(year){
        this.yearValue.select(year)
        return this;
    }

    enterMonth(month){
        this.monthValue.select(month)
        return this;
    }

    enterDay(day){
        this.dayValue.select(day)
        return this;
    }

    enterTelephone(telephone) {
        this.telephoneInput.type(telephone);
        return this;
    }

    confirmPolicy(value) {

        if(value) {
            this.policyCheckbox.check();
        } else {
            this.policyCheckbox.uncheck();
        }
        return this;
    }

    ageVerification() {
        this.ageVeriyPopup.click()
    }


    submitRegistraion() {
        this.signupBtn.click();
    }


}


export default new RegisterPage();

