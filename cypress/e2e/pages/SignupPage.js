import BasePage from './BasePage';
import { validationMessages } from '../config/errorMessages';
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from '../config/constants';

import { el, faker } from '@faker-js/faker';

class SignupPage extends BasePage {
    // get firstnameInput() { return cy.get('#email') }
    //  get lastnameInput() { return cy.get('#year') }
    get emailInput() {
        return cy.get(
            'input[placeholder="Enter email address or phone number"]'
        );
    } // getting email from the form
    get yearValue() {
        return cy.get('#year');
    }
    get monthValue() {
        return cy.get('#month');
    }
    get dayValue() {
        return cy.get('#day');
    }
    // get telephoneInput() { return cy.get('#input-telephone'); }
    get passwordInput() {
        return cy.get('#password');
    } // getting password from
    get passwordConfirmInput() {
        return cy.get('#confirmPassword');
    }
    get policyCheckbox() {
        return cy.get('.ant-checkbox-input');
    }
    get signupBtn() {
        return cy.get('button[text="Sign up"]');
    }
    get ageVeriyPopup() {
        return cy.get('.ant-modal-footer > .ant-btn-primary');
    }

    get inputValidationErr() {
        return (inputField) => cy.wrap(inputField).get('.error-label');
    }

    get alertMsg() {
        return cy.get('.ant-notification-notice-message');
    }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.REGISTRATION_ENDPOINT);
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
        this.emailInput.type(email).then((a) => {
            if (a.length > 0) {
                cy.log(email);
            }
        });

        return this;
    }
    enterYear(year) {
        this.yearValue.select(year);
        return this;
    }

    enterMonth(month) {
        this.monthValue.select(month).should('have.value', '0');
        return this;
    }

    enterDay(day) {
        this.dayValue.select(day);
        return this;
    }

    enterTelephone(telephone) {
        this.telephoneInput.type(telephone);
        return this;
    }

    confirmPolicy(value) {
        if (value) {
            this.policyCheckbox.check();
        } else {
            this.policyCheckbox.uncheck();
        }
        return this;
    }

    ageVerification() {
        this.ageVeriyPopup.click();
    }

    submitRegistraion() {
        this.signupBtn.click();
    }

    signupFormData() {
        this.enterEmail(faker.internet.email());
        // .invoke('text')
        // .then((email) => cy.log(email));
        this.enterYear('1995')
            .enterMonth('0')
            .enterDay('20')
            .enterPassword('Admin@123')
            .enterConfirmPassword('Admin@123')
            .confirmPolicy(true)
            .submitRegistraion();
    }

    // Function to check for validation messages and fix them one by one
    handleValidateAndFix() {
        cy.wrap([
            {
                field: this.emailInput,
                message: validationMessages.EMAIL,
                fix: () => this.enterEmail(faker.internet.email()),
            },
            {
                field: this.passwordInput,
                message: validationMessages.PASSWORD,
                fix: () => this.enterPassword('Admin@123'),
            },
            {
                field: this.passwordConfirmInput,
                message: validationMessages.CONFIRMPASSWORD,
                fix: () => this.enterConfirmPassword('Admin@123'),
            },
            {
                field: this.policyCheckbox,
                message: validationMessages.PRIVACY_POLICY,
                fix: () => this.confirmPolicy(true),
            },
        ]).each(({ field, message, fix }) => {
            this.submitRegistraion(); // Submit first to trigger next error

            // Check if the current field has an error message

            cy.validateFormField(field, message)
                .should('be.visible')
                .then(($error) => {
                    if ($error.length > 0) {
                        cy.log(`Fixing validation for: ${message}`);
                        fix(); // Fix the field by entering valid data
                    }
                });
        });
    }

    validateErrorMsg() {
        this.alertMsg
            .should('be.visible')
            .and('contain.text', validationMessages.AGEERROR)
            .invoke('text')
            .then((errorMsg) => {
                cy.log(errorMsg);
            });
    }
}

export default new SignupPage();
