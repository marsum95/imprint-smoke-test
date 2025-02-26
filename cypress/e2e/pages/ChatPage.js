import BasePage from './BasePage';

class ChatPage extends BasePage {
    get message() {
        return cy.get('.icon-messanger', { timeout: 10000 });
    } //click on Messages icon
    get viewallMessage() {
        return cy.get('.ant-list-footer');
    }
    get chatTitle() {
        return cy.get('.sidebar-chats-heading > h2');
    }
    get clickNew() {
        return cy.get('button[text="New"]');
    }
    get clickNewChat() {
        return cy.get('button[text="New Chat"]');
    }
    get clickRudi() {
        return cy.get('#rudi-logo');
    }
    get typeChat() {
        return cy.get(
            '[style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto;"] > .ant-input-affix-wrapper > .ant-input'
        );
    }
    get blockChat() {
        return cy.get('.chat-footer > .container-fluid > div');
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
        this.viewallMessage.should('have.text', 'View All').click();
    }

    createChatWithFriend() {
        this.clickNew.should('have.text', 'New').click();
        this.clickNewChat.should('have.text', 'New Chat').click();
        cy.get('.ant-spin-container').then(($container) => {
            cy.log('Container found'); // Debugging log

            const friendsList = $container.find('.friends-list');

            if (friendsList.length > 0) {
                cy.wrap(friendsList).then(($list) => {
                    cy.log('Found friends list:', $list);
                    cy.log('Number of friends list elements:', $list.length);

                    if ($list.length > 0) {
                        cy.log('Friends found');
                    } else {
                        cy.log('No friend found');
                    }
                });
            } else {
                cy.log('No friend found (element missing from DOM)');
            }
        });
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

    chatWithIndividualFriend() {
        cy.get('.ant-layout-sider-children')
            .invoke('text')
            .then((text) => {
                if (!text.includes('Chats')) {
                    cy.log('No Chats available, stopping test execution.');
                    return; // Stop execution if "Groups" is not found
                }
                this.chatTitle
                    .invoke('text')
                    .should('include', 'Chats')
                    .then(() => {
                        // Ensure there is at least one available chat before proceeding
                        this.clickonChat
                            .should('exist')
                            .eq(0)
                            .find('.ant-menu-item')
                            .first()
                            .click();
                    });

                // Check if the block message exists, but do not fail if it doesn't
                cy.get('.chat-footer > .container-fluid > div')
                    .invoke('text')
                    .then((text) => {
                        if (
                            text.includes(
                                'Please unblock messages for this user to start the conversation'
                            )
                        ) {
                            cy.log('User is Blocked, Stopping test execution');
                            return; // Stop execution if blocked
                        } else {
                            // If not blocked, proceed with chat actions
                            this.typeChat
                                .should('be.visible')
                                .click()
                                .type('Hello jani');
                            this.clickonSend
                                .should('be.visible')
                                .click({ force: true });

                            // Verify if the chat message is successfully sent
                            this.chatResponse.should(
                                'contain.text',
                                'Hello jani'
                            );
                        }
                    });
            });
    }

    chatWithGroup() {
        cy.get('.ant-layout-sider-children')
            .invoke('text')
            .then((text) => {
                if (!text.includes('Groups')) {
                    cy.log('No Groups available, stopping test execution.');
                    return; // Stop execution if "Groups" is not found
                }
                cy.log('Groups found, proceeding with test...');
                // Ensure there is at least one available chat before proceeding
                this.clickonChat.find('.ant-menu-item').last().click();
                this.typeChat.should('be.visible').click().type('Hello jani');
                this.clickonSend.should('be.visible').click({ force: true });
            });
    }
}

export default new ChatPage();
