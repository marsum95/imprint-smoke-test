import UiVerificationPage from '../pages/UiVerificationPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

describe('Account Registration', { tags: ['@Register', '@regression'] }, () => {
    beforeEach(() => {
        cy.fixture('users.json').as('users');
        LoginPage.openRegistrationPage();
    });

    it('should register the new user', { tags: '@smoke' }, function () {
        // cy.fixture('users.json').then((users) => {
        // cy.log(JSON.stringify(this.users)); // Log the users object
        SignupPage.signupFormData();
        UiVerificationPage.successSignup();
        // });
    });

    it('should validate Missing Input Fields', { tags: '@smoke' }, function () {
        // Call the function to handle validations progressively
        SignupPage.handleValidateAndFix();
        // Submit once more after all fixes
        SignupPage.submitRegistraion();
        // Final verification steps
        SignupPage.ageVerification();
        SignupPage.validateErrorMsg();
    });
});
