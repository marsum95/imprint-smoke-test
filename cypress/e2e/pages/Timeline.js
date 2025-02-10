import BasePage from "./BasePage";
import { ENDPOINT_PREFIX } from "../config/constants";
import routes from "../config/routes";

class Timeline extends BasePage{
   // cy.get('[style="padding-left: 12px; padding-right: 12px; flex: 1 1 auto;"] > .quill > .ql-container > .ql-editor > p')
    
    get clickOnTimeline() { return cy.get('.post-card > .post-card-content')}
    get clickonEditor() { return cy.get('.editor-container > .quill > .ql-container > .ql-editor > p') }
    get clickonPublishbtn() { return cy.get('button[text="Publish"]') }
    get postedContent() {return cy.get(':nth-child(1) > .edit-view-post-card > .post-card-content > .ant-row > :nth-child(1)')}

    //Media Imprint
    get clickonMedia() { return cy.get('button[text="Media"]').eq(1)}
    get clickonUploadBtn() { return cy.get('.ant-upload > :nth-child(2) > div')}

    //Article imprint
    get clickonArticle() { return cy.get('button[text="Articles"]').eq(1)}

    //click on 3 dot
    get clickon3Dots() { return cy.get('.icon-v-ellipses').eq(1)} //click on 3 dots

    //checkin Imprint
    get clickonCheckIn() { return cy.get('button[text="Check-ins"]')}
    get clickonSearchMap() { return cy.get('input[placeholder="Street, Postal Code"]')}

    //click on verify imprint and post text as an imprint
    get clickonVerify() { return cy.get('button[text="Verify"]')}

    //for file upload in media and article
    get fileInput() { return cy.get('input[type="file"]')} // Adjust to the correct file input selector 

    //check filter verification
    //get filter() {return }

    get checkforVerifyTick() {return cy.get(':nth-child(1) > .edit-view-post-card > .post-card-header > .ant-row-space-between')
        .find('.ant-space-item')
        //.eq(1)
        .find('.icon-check-green')
        .should('exist')
    }
    
    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }
    
    textImprint(){
        //this.clickOnTimeline.should('be.visible').click()
        // copied from another script
        const imprintText = 'Hi I am doing it from Automation';

        this.clickonEditor.should('be.visible').click()
            .type(imprintText);

            this.clickonPublishbtn.should('be.enabled').click();

    } 

    getEditorContent(){
        return  this.clickonEditor
                .invoke('text')  // Or use 'html' if you need to get the inner HTML
                .then((content)=> {
                    return content 
                })
            }

    verifyContent(content){
        this.postedContent
            .should('include.text',content)
        }

    verifyImprint(){

        if (Cypress.env('CHECK_IN_TEST')) {
            cy.log('Running check-in specific verification.');
            cy.get('.badge-strong') // Replace with actual class
                .eq(1)
                .should('be.visible')
               // .and('contain.text', 'Expected Check-in Text');
            } else {
                this.getEditorContent().then(content => {
                cy.log(content)
                this.verifyContent(content);  // Pass the actual content text to verifyContent
            })
        }
    }

    mediaImprint(){
        //this.clickOnTimeline.should('be.visible').click()
        this.clickonMedia.should('have.text','Media').click()
        // this.clickonUploadBtn.click({force: true})
        cy.get('body').then(($body) => {
            const popup = $body.find('.ant-notification-notice-message'); // Adjust the selector as needed

            if (popup.length > 0 && popup.text().includes('Upgrade Plan')) {
                // Log a message and return early to stop further execution
                cy.log('Upgrade required: Skipping further execution.');
                Cypress.env('STOP_TEST', true); // Set a Cypress environment variable
                return;
            } else {
                // If no popup appears, proceed with file upload
                const filePath = 'media/Sofie.jpg';
                this.fileInput.attachFile(filePath);
                cy.log('File uploaded:', filePath);
                this.clickonPublishbtn.click();
            }
        });
    }

    articleImprint(){
        //this.clickOnTimeline.should('be.visible').debug().click({ force: true })
        this.clickonArticle.should('be.visible').click()
        // Check if the upgrade popup appears and contains "Upgrade Plan" text
        cy.get('body').then(($body) => {
            const popup = $body.find('.ant-notification-notice-message'); // Replace with actual popup selector
            if (popup.length > 0 && popup.text().includes('Upgrade Plan')) {
                // If popup appears and contains "Upgrade Plan" text, stop execution
                cy.log('Upgrade required: Cannot proceed further.');
               // throw new Error('Upgrade Plan detected, stopping test execution.'); 
            } else {
                // If no popup appears or does not contain "Upgrade Plan", proceed
                const filePath = 'media/abcd.docx';
                this.fileInput.attachFile(filePath);
                cy.log('File uploaded:', filePath);
                this.clickonPublishbtn.click();
            }
        });
    }

    checkinImprint(){
        //this.clickOnTimeline.should('be.visible').click()
        this.clickon3Dots.click()
        this.clickonCheckIn
            .should('be.visible')
            .click()
        this.clickonSearchMap
            .click()
        this.clickonSearchMap
            .type('Folio3')
            .focused()
            .type('{downarrow}')
            .type('{enter}')
        // .should('be.visible')
        // .next()
        // .click()
        this.clickonPublishbtn.click();
    }

    checkVerifedImprint(){
        //this.clickOnTimeline.should('be.visible').next().debug().click({ force: true })
        this.clickon3Dots.should('be.visible').click()
        this.clickonVerify.should('be.visible').click()
        this.textImprint()
    }

}

export default new Timeline()