import BasePage from './BasePage';
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from '../config/Constants';

class EntertainmentPage extends BasePage {
    get entertainment() {
        return cy.get('a[title="Entertainment"]');
    } //click on Entertainment icon
    get title() {
        return cy.get('.entertainment-page_header__kBkg1 > h1');
    } // verify the header of the Entertainment section
    get anonymouseGoodDeed() {
        return cy.get('.mob-scroll > .ant-menu > .ant-menu-item-selected');
    } //click on Anonymouse Good Deed
    get quoteOfTheDay() {
        return cy.get('.ant-menu-title-content').contains('Quote of the Day');
    } //click on Quote of the day
    get jokeOfTheDay() {
        return cy.get('.ant-menu-title-content').contains('Joke of the Day');
    } //click on Joke of the day
    get quiz() {
        return cy.get(':nth-child(4) > .ant-menu-submenu-title');
    } // click on quiz section
    get games() {
        return cy.get(':nth-child(5) > .ant-menu-submenu-title');
    } //click on game section

    // Anounymous Good Deed
    //get sharecontent() {return cy.get('button[text="Share"]').eq(0)} //click on 1st sahre button
    get publishAGD() {
        return cy.get('.ant-btn-primary');
    }
    get cancelAGD() {
        return cy.get('.ant-modal-footer > .ant-btn-default');
    }
    get selectTribe() {
        return cy.get('.ant-select-selection-item');
    }
    get contentAGD() {
        return cy.get('.entertainment-modal_PreviewCardBody__pvES8');
    }
    get gotoTimeline() {
        return cy.get('.right-border');
    }

    get postedContent() {
        return cy.get(
            ':nth-child(1) > .edit-view-post-card > .post-card-content > .ant-row > :nth-child(1)'
        );
    }

    //QOD
    get QODtext() {
        return cy.get('.entertainment-modal_PreviewCardBody__pvES8');
    }

    //Quiz
    get share() {
        return cy.get('button[text="Share"]').eq(0);
    } //share button in entertainment section AGD, QOD, JOD, Quiz
    get start() {
        return cy.get('button[text="Start"]').eq(0);
    }
    get reattempt() {
        return cy.get('button[text="Reattempt"]').eq(0);
    }
    get selectOptions() {
        return cy.get('.entertainment-modal_Question__d6H8I');
    }

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT);
    }

    clickOnEntertainmentButton() {
        //cy.wait(5000);
        this.entertainment
            .should('be.visible')
            .click()
            .then(() => {
                // Assert the URL includes the expected value
                //const expectedUrlSegment = notification.tooltip.toLowerCase(); // Assuming URL is based on tooltip text
                cy.url().should('include', `/${routes.ENTERTAINMENT}`);
                //       });
            });
    }

    getAGDContent() {
        return this.contentAGD
            .invoke('text') // Or use 'html' if you need to get the inner HTML
            .then((content) => {
                return content;
            });
    }

    verifyContent(content) {
        this.postedContent.should('include.text', content);
    }

    verifyQODContent() {
        return this.QODtext.invoke('text').then((content) => {
            const cleanedText = content.split('.')[0].trim();
            expect(cleanedText).to.not.be.empty;
            cy.log(cleanedText);

            this.selectTribe.click();
            this.publishAGD.click();
            this.gotoTimeline.click();
            this.postedContent.should('contain.text', cleanedText);
        });
    }

    selectAnswer() {
        this.selectOptions.each(($question) => {
            // Inside each question, find all available options and select one option
            cy.wrap($question).within(() => {
                // Select the first answer for each question as an example, you can change the logic here
                cy.get('.entertainment-modal_Option__5N7_Q')
                    .first() // Select the first option, you can also use `.eq(index)` to select other options dynamically
                    .click(); // Click the selected option
            });
        });
        cy.get('.ant-btn-primary').click();
    }

    verifyTimelinePost() {
        this.getAGDContent().then((content) => {
            this.selectTribe.click();
            this.publishAGD.click();
            this.gotoTimeline.click();
            this.verifyContent(content);
        });
    }

    clickOnQuiz() {
        this.quiz.click();
    }

    playQuiz() {
        // cy.get('.quiz_QuizzesContainer__mjj8L > :nth-child(1) > .ant-row').should('be.visible').then(($body) => {
        //    // cy.get('.quiz_QuizzesContainer__mjj8L > :nth-child(1) > .ant-row').should('be.visible')
        //     if ($body.find('button[text="Start"]').length > 0) {
        //         cy.get('button[text="Start"]').eq(0).should('be.visible').click();
        //         cy.log('Start button found, proceeding with test');
        //         this.selectAnswer();
        //         this.verifyTimelinePost();
        //     } else {
        //         cy.log('Start button NOT found, stopping test execution');
        //     }
        // })

        cy.get('.quiz_QuizzesContainer__mjj8L')
            .should('be.visible')
            .each(($quiz) => {
                // Wrap the quiz element to ensure Cypress chaining
                cy.wrap($quiz)
                    .find('button')
                    .contains('Start')
                    .then(($btn) => {
                        if ($btn.length > 0) {
                            // Click the first available "Start" button
                            cy.wrap($btn).first().should('be.visible').click();
                            cy.log('Start button found, proceeding with test');
                            // Ensure Cypress properly chains commands
                            cy.then(() => {
                                this.selectAnswer();
                                this.verifyTimelinePost();
                            });
                            // Stop further execution in .each()
                            return false; // Stops the loop
                        }
                    });
            })
            .then(() => {
                cy.log(
                    'No available Start button found, stopping test execution'
                );
            });
    }

    verifyPageTitle() {
        this.title.should('contain.text', 'Anonymous Good Deeds');
    }

    clickOnShare() {
        this.share.click();
    }

    clickOnQOD() {
        this.quoteOfTheDay.click();
    }

    clickOnJOD() {
        this.jokeOfTheDay.click();
    }

    clickOnReattempt() {
        this.reattempt.click();
    }
}

export default new EntertainmentPage();
