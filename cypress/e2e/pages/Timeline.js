import BasePage from "./BasePage";
import AccountPage from "../pages/AccountPage";
import { ENDPOINT_PREFIX } from "../config/constants";
import routes from "../config/routes";

class Timeline extends BasePage{
    
    get clickOnTimeline() { return cy.get('.post-card') }
    get clickonEditor() { return cy.get('.editor-container > .quill > .ql-container > .ql-editor > p') }
    get clickonPublishbtn() { return cy.get('button[text="Publish"]') }
    get postedContent() {return cy.get(':nth-child(1) > .edit-view-post-card > .post-card-content > .ant-row > :nth-child(1)')}

    //Media Imprint
    get clickonMedia() { return cy.get(':nth-child(3) > .button-create > .ant-btn > :nth-child(2)')}
    get clickonUploadBtn() { return cy.get('.ant-upload > :nth-child(2) > div')}

    get fileInput() { return cy.get('input[type="file"]')} // Adjust to the correct file input selector 


    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }
    
    textImprint(){
        cy.wait(1000)
        this.clickOnTimeline.click()
        // copied from another script
        const imprintText = 'Hi I am doing it from Automation';

        this.clickonEditor.click()
            .type(imprintText);

            this.clickonPublishbtn.click();

    } 

    getEditorContent(){
        return  this.clickonEditor
                .invoke('text')  // Or use 'html' if you need to get the inner HTML
                .then((content)=> {
                    return content
                })
            }

    verifyContent(content){
       // cy.wait(4000)
        this.postedContent
            .should('include.text',content)
        }

    verifyImprint(){
        this.getEditorContent().then(content => {
           // cy.wait(5000)
           
            this.verifyContent(content);  // Pass the actual content text to verifyContent
        });
    }

    mediaImprint(){
        cy.wait(1000)
        this.clickOnTimeline.click()
        this.clickonMedia.click()

       // this.clickonUploadBtn.click({force: true})

        const filePath = 'media/Sofie.jpg'
        this.fileInput.attachFile(filePath)

        cy.log('File uploaded: ', filePath)

        this.clickonPublishbtn.click();

        
    }
    
}

export default new Timeline()