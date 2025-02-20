import { validationMessages } from '../config/errorMessages';
import UiVerificationPage from '../pages/UiVerificationPage';
import BasePage from '../pages/BasePage';
import SigninPage from '../pages/SigninPage';

import { faker } from '@faker-js/faker';

describe('Login and Quiz Flow', { tags: ['@Login', '@regression'] }, () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    });

    beforeEach(() => {
        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax.
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users');

        cy.get('@users').then((users) => {
            SigninPage.loginWithUI(users.newUser.email, users.newUser.password);
        });
    });

    it.only(
        'should login successfully with valid credentials and complete signup flow',
        { tags: '@smoke' },
        function () {
            UiVerificationPage.verifyWelcomeText();
            SigninPage.userProfilePic();
            SigninPage.userDisplayName(faker.person.fullName());
            SigninPage.userNameValid(faker.person.firstName());
            SigninPage.userAboutme(faker.person.bio());
            SigninPage.registerProfile();
            UiVerificationPage.verifyNameOnQuiz();
        }
    );

    it(
        'should not login and give validation error',
        { tags: '@smoke' },
        function () {
            UiVerificationPage.verifyWelcomeText();
            SigninPage.registerProfile();
            cy.validateFormField(
                SigninPage.displaynameInput,
                validationMessages.DISPLAYNAME
            );
            SigninPage.userDisplayName(faker.person.fullName());
            SigninPage.registerProfile();
            cy.validateFormField(
                SigninPage.usernameInput,
                validationMessages.USERNAME
            );
            SigninPage.userNameValid(faker.person.firstName());
            UiVerificationPage.verifyUsernameAvailablity();

            SigninPage.userAboutme(faker.person.bio());

            cy.validateFormField(
                SigninPage.displaynameInput,
                validationMessages.DISPLAYPIC
            );
            SigninPage.userProfilePic();
            SigninPage.registerProfile();
        }
    );

    it.skip('Login and fill Quiz', { tags: '@smoke' }, function () {
        SigninPage.openquiz();
    });
});
