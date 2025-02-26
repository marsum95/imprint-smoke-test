import LoginPage from '../pages/LoginPage';
//import BasePage from '../pages/BasePage';
import UiVerificationPage from '../pages/UiVerificationPage';
import ChatPage from '../pages/ChatPage';

describe(
    'Login and then cover Message flow which include chat with Rudi, Individual Chat and Group Chat',
    { tags: ['@Login', '@regression'] },
    () => {
        // let basePage;

        // before(() => {
        //     basePage = new BasePage();
        // });

        beforeEach(() => {
            //Aliasing cy.fixture() data and then using this to access it via the alias.
            //Note the use of the standard function syntax.
            //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

            cy.login();
        });

        it(
            'should login successfully, go to all Message and chat with Rudi',
            { tags: '@smoke' },
            function () {
                UiVerificationPage.verifyTimelineHeading();
                // cy.wait(4000)
                ChatPage.gotoAllMessage();
                ChatPage.chatwithRudi();
            }
        );

        it(
            'Login and go to all Message and chat with a Friend',
            { tags: '@smoke' },
            function () {
                UiVerificationPage.verifyTimelineHeading();
                // cy.wait(4000)
                ChatPage.gotoAllMessage();
                ChatPage.chatWithIndividualFriend();
            }
        );

        it(
            'Login and go to all Message and chat with Group',
            { tags: '@smoke' },
            function () {
                UiVerificationPage.verifyTimelineHeading();
                // cy.wait(4000)
                ChatPage.gotoAllMessage();
                ChatPage.chatWithGroup();
            }
        );

        it.only('Add friend to chat', { tag: '@smoke' }, function () {
            //issue in this need to fix
            UiVerificationPage.verifyTimelineHeading();
            ChatPage.gotoAllMessage();
            //ChatPage.clickNew();
            ChatPage.createChatWithFriend();
        });
    }
);
