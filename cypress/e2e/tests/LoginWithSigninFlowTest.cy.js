import { validationMessages } from "../config/errorMessages";
import AccountPage from "../pages/AccountPage";
//import BasePage from "../pages/BasePage";
import SigninFlowPage from "../pages/SigninFlowPage";

import { faker } from '@faker-js/faker';


describe("Signup, Login and Quiz Flow", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    // before(() => {
    //     basePage = new BasePage();
    // })

    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    it("should login successfully with valid credentials and complete signup flow", { tags: '@smoke' }, function () {

        SigninFlowPage
            .loginWithUI(this.users.newUser.email, this.users.newUser.password)

        AccountPage.signinWelcome
            .should('have.text', 'Welcome!');

        SigninFlowPage
            .userProfilePic()
        

        SigninFlowPage
            .userDisplayName(faker.person.fullName())

        SigninFlowPage
            .userNameValid(faker.person.firstName())
        
        SigninFlowPage
            .userAboutme(faker.person.bio())
            
        SigninFlowPage
            .registerProfile()
        
    })

    it("should not login and give validation error", { tags: '@smoke' }, function () {

        SigninFlowPage
            .loginWithUI(this.users.newUser.email, this.users.newUser.password)

        AccountPage.signinWelcome
            .should('have.text', 'Welcome!');

        SigninFlowPage.registerProfile()

        cy.validateFormField(SigninFlowPage.displaynameInput, validationMessages.DISPLAYNAME);
        SigninFlowPage.userDisplayName(faker.person.fullName())
        SigninFlowPage.registerProfile()
        cy.validateFormField(SigninFlowPage.usernameInput, validationMessages.USERNAME);
        SigninFlowPage.userNameValid(faker.person.firstName())

        AccountPage.successLabel
            .should('have.text', 'Username is available')

        SigninFlowPage.userAboutme(faker.person.bio())

        cy.validateFormField(SigninFlowPage.displaynameInput, validationMessages.DISPLAYPIC);
        SigninFlowPage.userProfilePic()
        SigninFlowPage.registerProfile()

    })

    it.only("should not login and give validation error", { tags: '@smoke' }, function () {

        SigninFlowPage
            .loginWithUI(this.users.newUser.email, this.users.newUser.password)


    })


})