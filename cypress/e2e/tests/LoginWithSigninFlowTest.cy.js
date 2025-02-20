import { validationMessages } from '../config/errorMessages';
import AccountPage from '../pages/AccountPage';
import BasePage from '../pages/BasePage';
import SigninFlowPage from '../pages/SigninFlowPage';

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
            SigninFlowPage.loginWithUI(
                users.newUser.email,
                users.newUser.password
            );
        });
    });

    it.only(
        'should login successfully with valid credentials and complete signup flow',
        { tags: '@smoke' },
        function () {
            AccountPage.verifyWelcomeText();
            SigninFlowPage.userProfilePic();
            SigninFlowPage.userDisplayName(faker.person.fullName());
            SigninFlowPage.userNameValid(faker.person.firstName());
            SigninFlowPage.userAboutme(faker.person.bio());
            SigninFlowPage.registerProfile();
            AccountPage.verifyNameOnQuiz();
        }
    );

    it(
        'should not login and give validation error',
        { tags: '@smoke' },
        function () {
            AccountPage.verifyWelcomeText();
            SigninFlowPage.registerProfile();
            cy.validateFormField(
                SigninFlowPage.displaynameInput,
                validationMessages.DISPLAYNAME
            );
            SigninFlowPage.userDisplayName(faker.person.fullName());
            SigninFlowPage.registerProfile();
            cy.validateFormField(
                SigninFlowPage.usernameInput,
                validationMessages.USERNAME
            );
            SigninFlowPage.userNameValid(faker.person.firstName());
            AccountPage.verifyUsernameAvailablity();

            SigninFlowPage.userAboutme(faker.person.bio());

            cy.validateFormField(
                SigninFlowPage.displaynameInput,
                validationMessages.DISPLAYPIC
            );
            SigninFlowPage.userProfilePic();
            SigninFlowPage.registerProfile();
        }
    );

    it.skip('Login and fill Quiz', { tags: '@smoke' }, function () {
        SigninFlowPage.openquiz();
    });
});
