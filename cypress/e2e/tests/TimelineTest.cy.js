import LoginPage from "../pages/LoginPage";
import BasePage from "../pages/BasePage";
import AccountPage from "../pages/AccountPage";
import Timeline from "../pages/Timeline";


describe("Post different content on timeline flow", { tags: ['@Login', '@regression'] }, () => {

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
        cy.wait(3000)
        Timeline.clickOnTimeline
            .should('be.visible')
            .click()
        Timeline.textImprint()
        Timeline.verifyImprint()
    })

    it("should login successfully and post a Media Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
        cy.wait(3000)
        Timeline.clickOnTimeline
            .should('be.visible')
            .click()
        Timeline.clickonEditor
            .should('be.visible')
        Timeline.mediaImprint()
        Timeline.verifyImprint()
    })

    it("should login successfully and post a Article Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
        cy.wait(3000)
        Timeline.clickOnTimeline
            .should('be.visible')
            .click()

        //Timeline.clickonEditor.should('be.visible')
        Timeline.articleImprint()
        Timeline.verifyImprint()
    })

    it("should login successfully and click on 3 dot then post a CheckIn Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
        cy.wait(3000)
        Timeline.clickOnTimeline
            .should('be.visible')
            .click()
        Timeline.checkinImprint()

         // Set environment variable to indicate a check-in test is running
        Cypress.env('CHECK_IN_TEST', true);

        Timeline.verifyImprint()
    })

    it("should login successfully and post a Verified Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
        cy.wait(3000)
        Timeline.clickOnTimeline
            .should('be.visible')
            .click()
        Timeline.checkVerifedImprint()
        Timeline.verifyImprint()
    })

    it("should login successfully and look for a Verified Imprint", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');
        
        Timeline.checkforVerifyTick
            .trigger('mouseover')
            .should('have.css', 'color', 'rgb(16, 20, 24)')
        
    })

    it("should login successfully and select the one filter", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        cy.get('.ant-menu-title-content').contains('Love').click()

        // Check if the image has alt="Life" and the src includes the correct image URL
        cy.get('img[alt="Love"]')
        .should('have.attr', 'src') // Check the src attribute of the image
        .and('include', 'value-love'); // Ensure that the src includes "value-life"
          
    })

    it.skip("should login successfully and select the multiple filter", {tags: '@smoke'}, function () { //fail test

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

        const valuesToClick = ['Love', 'Life', 'Respect', 'Purpose']; // You can modify this array as needed
    
        // Loop through the values and click each one
        valuesToClick.forEach((value) => {
            cy.get('.ant-menu-title-content')
                .contains(value) // Contains method allows you to click dynamically based on value
                    .then((item) => {
            // Scroll the element into view //TEST Fail at scroll to 3rd element as it not visible
                cy.get('#scrollableDiv') // This is the parent scrollable container
                    .scrollIntoView({ behavior: 'auto'}) // Scroll it into view if it's outside the viewport
                    .wait(5000) // Wait for the loader to show up, adjust this as necessary
                    .should('exist'); // Ensure that the loader disappears
              // Now that the parent container is scrolled into view, click the item
                cy.wrap(item).click();
            });

            // Check if the image has alt="Life" and the src includes the correct image URL
            cy.get('img[alt="' + value + '"]')
                // .should('be.visible')
                .should('have.attr', 'src') // Check the src attribute of the image
                .and('include', `value-${value.toLowerCase()}`); // Ensure that the src includes "value-life"

            //  Optionally, verify something after the click if needed
            cy.get('.ant-menu-item-selected')
                .should('contain', value); // Verifies that the item is selected
          
        })

    })

})
