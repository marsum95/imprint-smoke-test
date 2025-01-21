// import { ENTERTAINMENT } from "../config/routes";
import AccountPage from "../pages/AccountPage";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import EntertainmentPage from "../pages/EntertainmentPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    //Mocha automatically shares contexts for us across all applicable hooks for each test. 
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    it("should login successfully and submit a AGD", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.title
            .should('contain.text', 'Anonymous Good Deeds')

        EntertainmentPage.shareAGD
            .click()

        EntertainmentPage.verifyTimelinePost()

    })

    it.skip("should login successfully and submit a QOTD", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.quoteOfTheDay
            .click()

        EntertainmentPage.shareAGD
            .click()

        EntertainmentPage.verifyTimelinePost()

    })

    it("should login successfully and submit a JOTD", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.jokeOfTheDay
            .click()

        EntertainmentPage.shareAGD
            .click()

        EntertainmentPage.verifyTimelinePost()
    })


    it("should login successfully and share a Quiz", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.quiz
            .click()

        EntertainmentPage.share
            .eq(0)
            .click()

        EntertainmentPage.verifyTimelinePost()

    })

    it("should login successfully and Re-Attempt a Quiz", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.quiz
            .click()

        EntertainmentPage.reattempt
            .eq(0)
            .click()

        EntertainmentPage.selectAnswer()

        EntertainmentPage.verifyTimelinePost()

    })

    it("should login successfully and Play a Quiz", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        EntertainmentPage.entertainmentButton()

        EntertainmentPage.quiz
            .click()

        EntertainmentPage.start
            .eq(0)
            .click()

        EntertainmentPage.selectAnswer()

        EntertainmentPage.verifyTimelinePost()

    })

})