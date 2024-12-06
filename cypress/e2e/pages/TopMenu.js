import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class TopMenu extends BasePage{

    get home() { return cy.get('.icon-home')}//click on Home icon 
    get news() { return cy.get('[style="opacity:1;order:1"] > .ant-menu-title-content > a')}//click on News icon 
    get entertainment() { return cy.get('[style="opacity:1;order:2"] > .ant-menu-title-content')}//click on Entertainment icon
    get notification() { return cy.get('[style="opacity:1;order:3"] > .ant-menu-title-content')}//click on Notification icon 
    get message() { return cy.get('[style="opacity:1;order:4"] > .ant-menu-title-content')}//click on Messages icon 
 
    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }

    homeButton() {
        this.home.click()
        .then(() => {
            // Assert the URL includes the expected value
            //const expectedUrlSegment = notification.tooltip.toLowerCase(); // Assuming URL is based on tooltip text
                cy.url().should('include', `/${notification.urlSegment}`);
            //       });
    }

    newsButton() {
        this.news.click();
    }

    entertainmentButton() {
        this.entertainment.click();
    }

    notificationButton() {
        this.notification.click();
    }

    messageButton() {
        this.message.click();
    }


}


export default new TopMenu();

