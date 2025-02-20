import { validationMessages } from '../config/errorMessages';
import AccountPage from '../pages/AccountPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

import { el, faker } from '@faker-js/faker';

describe('Account Registration', { tags: ['@Register', '@regression'] }, () => {
    beforeEach(() => {
        cy.fixture('users.json').as('users');
        LoginPage.openRegistrationPage();
    });

    it('should register the new user', function () {
        // cy.fixture('users.json').then((users) => {
        // cy.log(JSON.stringify(this.users)); // Log the users object
        SignupPage.signupFormData();
        AccountPage.successSignup();
        // });
    });

    it(
        'should validate the error messages for missing input fields',
        { tags: '@smoke' },
        () => {
            // Call the function to handle validations progressively
            SignupPage.handleValidateAndFix();
            // Submit once more after all fixes
            SignupPage.submitRegistraion();
            // Final verification steps
            SignupPage.ageVerification();
            SignupPage.validateErrorMsg();
        }
    );
});
