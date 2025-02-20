// import { ENTERTAINMENT } from "../config/routes";
import AccountPage from '../pages/AccountPage';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/LoginPage';
import EntertainmentPage from '../pages/EntertainmentPage';

describe('Entertainment flow', { tags: ['@Login', '@regression'] }, () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    });

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
        AccountPage.h2Heading.should('contains.text', 'Personal Tribe');

        EntertainmentPage.clickOnEntertainmentButton();
    });

    it(
        'should login successfully and submit a AGD',
        { tags: '@smoke' },
        function () {
            EntertainmentPage.verifyPageTitle();
            EntertainmentPage.clickOnShare();
            EntertainmentPage.verifyTimelinePost();
        }
    );

    it(
        'should login successfully and submit a QOTD',
        { tags: '@smoke' },
        function () {
            EntertainmentPage.clickOnQOD();
            EntertainmentPage.clickOnShare();
            EntertainmentPage.verifyQODContent();
        }
    );

    it(
        'should login successfully and submit a JOTD',
        { tags: '@smoke' },
        function () {
            EntertainmentPage.clickOnJOD();
            EntertainmentPage.clickOnShare();
            EntertainmentPage.verifyTimelinePost();
        }
    );

    it.only(
        'should login successfully and Play a Quiz',
        { tags: '@smoke' },
        function () {
            //Hard to find start button

            EntertainmentPage.clickOnQuiz();
            EntertainmentPage.playQuiz();
        }
    );

    it(
        'should login successfully and share a Quiz',
        { tags: '@smoke' },
        function () {
            EntertainmentPage.clickOnQuiz();
            EntertainmentPage.clickOnShare();
            EntertainmentPage.verifyTimelinePost();
        }
    );

    it(
        'should login successfully and Re-Attempt a Quiz',
        { tags: '@smoke' },
        function () {
            EntertainmentPage.clickOnQuiz();
            EntertainmentPage.clickOnReattempt();
            EntertainmentPage.selectAnswer();
            EntertainmentPage.verifyTimelinePost();
        }
    );
});
