// import UiVerificationPage from '../pages/UiVerificationPage';
// import BasePage from '../pages/BasePage';
import LoginPage from '../pages/LoginPage';
import TopMenuPage from '../pages/TopMenuPage';

describe('Top Menu Verification', { tags: ['@Login', '@regression'] }, () => {
    // let basePage;

    // before(() => {
    //     basePage = new BasePage();
    // });

    //Mocha automatically shares contexts for us across all applicable hooks for each test.
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {
        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax.
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users');
        cy.get('@users').then((users) => {
            LoginPage.loginWithUI(
                users.validUser.email,
                users.validUser.password
            );
        });
    });

    it(
        'Login and Verify that there is content in top menu',
        { tags: '@smoke' },
        function () {
            TopMenuPage.homeButton();

            TopMenuPage.newsButton();

            TopMenuPage.entertainmentButton();

            TopMenuPage.notificationButton();

            TopMenuPage.messageButton();

            TopMenuPage.analyticalButton();
        }
    );
});
