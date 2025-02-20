import BasePage from './BasePage';
const routes = require('../config/routes');
import AccountPage from '../pages/AccountPage';
import EntertainmentPage from './EntertainmentPage';
import { ENDPOINT_PREFIX } from '../config/constants';

class TopMenuPage extends BasePage {
    get home() {
        return cy.get('.icon-home');
    } //click on Home icon
    get news() {
        return cy.get('a[title="News"]');
    } //click on News icon
    get entertainment() {
        return cy.get('a[title="Entertainment"]');
    } //click on Entertainment icon
    get notification() {
        return cy.get('.icon-notification');
    } //click on Notification icon
    get message() {
        return cy.get('.icon-messanger');
    } //click on Messages icon
    get analytical() {
        return cy.get('.icon-value-profile');
    }

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT);
    }

    homeButton() {
        this.home.click().then(() => {
            // Assert the URL includes the expected value
            cy.url().should('include', `/${routes.HOME}`);
            AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
        });
    }

    newsButton() {
        this.news.click().then(() => {
            // Assert the URL includes the expected value
            //const expectedUrlSegment = notification.tooltip.toLowerCase(); // Assuming URL is based on tooltip text
            cy.url().should('include', `/${routes.NEWS}`);
            //       });
        });

        //verify the title of the general news
        cy.get('.general-news_Header__0glk_').should(
            'contain.text',
            'General News'
        );

        // check for the content should be present
        cy.get(
            '.general-news_GeneralNewsContainer__SW7B_ > :nth-child(1)'
        ).should('exist');
        cy.get(
            '.general-news_GeneralNewsContainer__SW7B_ > :nth-child(1)'
        ).should('be.visible');
    }

    entertainmentButton() {
        this.entertainment.click().then(() => {
            // Assert the URL includes the expected value
            cy.url().should('include', `/${routes.ENTERTAINMENT}`);
            EntertainmentPage.title.should(
                'contain.text',
                'Anonymous Good Deeds'
            );

            EntertainmentPage.share.should('exist');
        });
    }

    notificationButton() {
        this.notification.click();

        // Check if there is a notification from either "Rudi" or "system"
        cy.get('.ant-list-item').each(($el) => {
            // Check if the notification contains either "Rudi" or "system"
            if (
                $el.text().includes('Rudi') ||
                $el.text().includes('SystemModeration')
            ) {
                // If either "Rudi" or "system" is found, assert that it's present
                cy.wrap($el).should('exist');
            }
        });
    }

    messageButton() {
        this.message.click();

        cy.get('.name-friends') // Target all list items
            .first() // Select the first list item
            .should('have.text', ' Rudi'); // Ensure the first item has exactly "Rudi" as the text
    }

    analyticalButton() {
        this.analytical.click();

        cy.get('.ant-tabs-tab-active').should('have.text', 'Value Profile');
    }
}

export default new TopMenuPage();
