import LoginPage from "../pages/LoginPage";
import BasePage from "../pages/BasePage";
import AccountPage from "../pages/AccountPage";
import Timeline from "../pages/Timeline";





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

     it("should login successfully and post a text Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        Timeline.textImprint()

        Timeline.verifyTextImprint()

     })


})
