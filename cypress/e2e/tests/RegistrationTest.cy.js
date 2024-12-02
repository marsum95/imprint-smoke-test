import { validationMessages } from "../config/errorMessages";
import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"

import { faker } from '@faker-js/faker';

describe("Account Registration", { tags: ['@Register', '@regression'] }, () => {

    beforeEach(() => {
        LoginPage.openRegistrationPage();
    });

    //Unique credentials are required for registration, so we use faker library to generate test data
    it("should register the new user", ()=> {

        let password = faker.internet.password();

        RegisterPage
          //  .enterfirstName(faker.person.firstName())
          //  .enterlastName(faker.person.lastName())
            .enterEmail(faker.internet.email())
          //  .enterTelephone(faker.phone.number())
            .enterYear('1995')
            .enterMonth('December')
            .enterDay('20')
            .enterPassword('Admin@123')
            .enterConfirmPassword('Admin@123')
           // .confirmPolicy(true)
            .submitRegistraion()
            ;

        AccountPage.successMsg
            .should('have.text', 'Signup SuccessPlease check your email for verification. If you are still having trouble, please contact support.');

    })

    it.only('should validate the error messages for missing input fields', {tags: '@smoke'}, () => {
       RegisterPage.submitRegistraion();

       //Instead of repeating the below code for querying and asserting each input field repeatedly
        /* RegisterPage.firstnameInput
       .then(($input) => RegisterPage.inputValidationErr($input))
        .should('be.visible')
        .and('have.text', validationMessages.FIRSTNAME) */

       //Better approach is to write a custom command and call it with input field parameters to validate
      // cy.validateFormField(RegisterPage.firstnameInput, validationMessages.FIRSTNAME);
      // cy.validateFormField(RegisterPage.lastnameInput, validationMessages.LASTNAME);
       cy.validateFormField(RegisterPage.emailInput, validationMessages.EMAIL);
       RegisterPage.enterEmail(faker.internet.email())
      // cy.validateFormField(RegisterPage.telephoneInput, validationMessages.TELEPHONE);
      RegisterPage.submitRegistraion();
       cy.validateFormField(RegisterPage.passwordInput, validationMessages.PASSWORD);
       RegisterPage.enterPassword('Admin@123')
       cy.validateFormField(RegisterPage.passwordConfirmInput, validationMessages.CONFIRMPASSWORD)
       RegisterPage.enterConfirmPassword('Admin@123')
       RegisterPage.submitRegistraion();
       RegisterPage.ageVerification();


       

       RegisterPage.alertMsg
        .should('be.visible')
        .and('contain.text', validationMessages.AGEERROR);

    });
})