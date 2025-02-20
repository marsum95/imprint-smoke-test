import BasePage from './BasePage';
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from '../config/constants';

class UiVerificationPage extends BasePage {
    //refer to the elements in tests as UiVerificationPage.elements.h1Heading()
    /* elements = {
        h1Heading : () => cy.get('#content h1') ,
        h2Heading : () => cy.get('#content h2'),
    } */

    //Alternative better approach is to define the getters for elements and refer to them in tests directly as UiVerificationPage.h1Heading
    // In JavaScript, getters are special methods that allow you to access an object's properties like they were regular properties,
    //but you can also execute code when they are accessed.
    //The advantage of using getter and setter is that we can use them as properties instead of functions.
    get successMsg() {
        return cy.get('.ant-notification-notice');
    }
    get errorMsg() {
        return cy.get('.error-label');
    }
    get logout() {
        return cy.get('.ant-list-footer > div');
    }
    get timelineTitle() {
        return cy.get('.ant-space-item');
    }
    get signinWelcome() {
        return cy.get('.create-profile_title__3mn9Q');
    }
    get successLabel() {
        return cy.get('.success-label');
    }
    get usernameOnQuiz() {
        return cy.get('h1');
    }
    get profileName() {
        return cy.get('.flex-badge > h2');
    }
    get subscriptionPageTitle() {
        return cy.get('.heading > h1');
    }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.ACCOUNT_ENDPOINT);
    }

    verifyLogout() {
        this.verifyLogout.should('contains.text', 'Log Out');
    }

    verifyTimelineHeading() {
        this.timelineTitle.should('contains.text', 'Personal Tribe');
    }

    verifyWelcomeText() {
        this.signinWelcome.should('have.text', 'Welcome!');
    }

    verifyNameOnQuiz() {
        this.usernameOnQuiz.should('have.text', 'Welcome!');
    }

    verifyUsernameAvailablity() {
        this.successLabel.should('have.text', 'Username is available');
    }

    successSignup() {
        this.successMsg.should(($el) => {
            const text = $el.text().trim();
            expect(text).to.satisfy(
                (msg) =>
                    msg.includes('Signup Success') ||
                    msg.includes('Signup Failed') ||
                    msg.includes('Email Sent Successfully') ||
                    msg.includes('Email Already Exists')
            );
        });
    }
}

export default new UiVerificationPage();
