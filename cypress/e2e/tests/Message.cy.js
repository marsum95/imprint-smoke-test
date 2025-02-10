import LoginPage from "../pages/LoginPage";
import BasePage from "../pages/BasePage";
import AccountPage from "../pages/AccountPage";
import MessageChatFlow from "../pages/MessageChatFlow";


describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    it("should login successfully, go to all Message and chat with Rudi", {tags: '@smoke'}, function () {
    
        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
           // cy.wait(4000)
        MessageChatFlow.gotoAllMessage()
        MessageChatFlow.chatwithRudi()
    })

    it("should login successfully, go to all Message and chat with individual Friend", {tags: '@smoke'}, function () {
    
        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
           // cy.wait(4000)
        MessageChatFlow.gotoAllMessage()
        MessageChatFlow.chatwithIndividualFriend()      
    })

    it.only("should login successfully, go to all Message and chat with Group", {tags: '@smoke'}, function () {
    
        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
           // cy.wait(4000)
        MessageChatFlow.gotoAllMessage()
        MessageChatFlow.chatwithGroup()      
    })

})