import BasePage from './BasePage';

class ChatPage extends BasePage {
    get message() {
        return cy.get('.icon-messanger', { timeout: 10000 });
    } //click on Messages icon
    get viewallMessage() {
        return cy.get('.ant-list-footer');
    }
    get clickRudi() {
        return cy.get('#rudi-logo');
    }
    get typeChat() {
        return cy.get(
            '[style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto;"] > .ant-input-affix-wrapper > .ant-input'
        );
    }
    get clickonSend() {
        return cy.get(
            '[style="padding-left: 6px; padding-right: 6px; flex: 0 0 45px;"] > .button-create > .ant-btn'
        );
    }
    // get verifyRudiResponse() { return cy.get('.chat-body.rudy-chat') // Select the element by its classes
    //     .invoke('attr', 'class') // Get the class attribute
    //     .should('exist') // Ensure the class exists
    //     .then((className) => {
    //       console.log(className); // This will print the class names in the console
    //     });
    //   }
    get chatResponse() {
        return cy.get('.infinite-scroll-component > .container-fluid');
    } // Target the parent element
    get clickonChat() {
        return cy.get('.chat-menu-container');
    }

    gotoAllMessage() {
        cy.get(
            ':nth-child(1) > .edit-view-post-card > .post-card-header > .ant-row-space-between'
        ).should('be.visible');
        this.message.should('be.visible').click();
        this.viewallMessage.should('be.visible').click();
    }

    chatwithRudi() {
        this.clickRudi.click();
        this.typeChat.click().type('Hi');
        this.clickonSend.click({ force: true });
        this.chatResponse
            .contains('Hello! How can I assist you today? 😊') // Assert that the text is present
            // .should('be.visible'); // Ensure that the text is visible
            .should('contain', 'Hello! How can I assist you today? 😊');
    }

    chatwithIndividualFriend() {
        this.clickonChat.eq(0).find('.ant-menu-item').first().click(); //click on 1st availble friend
        this.typeChat.click().type('Hello jani');
        this.clickonSend.click({ force: true });
        this.chatResponse.contains('Hello jani');
    }

    chatwithGroup() {
        this.clickonChat.eq(1).find('.ant-menu-item').first().click();
        this.typeChat.click().type('Hello jani');
        this.clickonSend.click({ force: true });
    }
}

export default new ChatPage();
