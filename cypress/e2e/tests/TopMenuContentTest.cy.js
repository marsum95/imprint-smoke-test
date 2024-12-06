import AccountPage from "../pages/AccountPage";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import TopMenu from "../pages/TopMenu";

describe("Top Menu Verification", { tags: ['@Login', '@regression'] }, () => {

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

    it.only("Login and Verify that there is content in top menu", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        AccountPage.h2Heading
            .should('contains.text', 'Personal Tribe');

            TopMenu.homeButton()
        

    })

    it('Login user should access top menu and data should be present',{tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

            AccountPage.h2Heading
                .should('contains.text', 'Personal Tribe');

                // const visibleNotification = [
                //     { menuId: 'ant-menu-title-content', tooltip: 'Home', urlSegment: '' },
                //     { menuId: 'ant-menu-title-content', tooltip: 'News', urlSegment: 'news' },
                //     { menuId: 'ant-menu-title-content', tooltip: 'Entertainment', urlSegment: 'entertainment/good-deeds'},
                //     { menuId: 'ant-menu-title-content', tooltip: 'Notifications', urlSegment: '' },
                //     { menuId: 'ant-menu-title-content', tooltip: 'Messenger', urlSegment: '' },
                //     // Add other menu items following the same pattern
                //   ];
                  


                //   visibleNotification.forEach((notification) => {
                //     // Target the anchor tag with the specific title attribute
                //     cy.get(`.${notification.menuId} a[title="${notification.tooltip}"]`)
                //       .should('have.attr', 'title', notification.tooltip) // Validate the title attribute
                //       .then((menuItem) => {
                //         // Hover over the item
                //         cy.wrap(menuItem).trigger('mouseover');
                //       });
                  
                //     // Click the item and validate URL change
                //     cy.get(`.${notification.menuId} a[title="${notification.tooltip}"]`)
                //       .click()
                //       .then(() => {
                //         // Assert the URL includes the expected value
                //        // const expectedUrlSegment = notification.tooltip.toLowerCase(); // Assuming URL is based on tooltip text
                //         cy.url().should('include', `/${notification.urlSegment}`);
                //       });
                //   });

                  //validate the data is available in top menu bar 
                // Need to check News, Entertainment, Notification and Messages Have content

    })
  



})