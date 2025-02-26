import LoginPage from '../pages/LoginPage';
// import BasePage from '../pages/BasePage';
import UiVerificationPage from '../pages/UiVerificationPage';
import SubscriptionPage from '../pages/SubscriptionPage';

describe(
    'Login as New user and Buy Subscription',
    { tags: ['@Login', '@regression'] },
    () => {
        //Mocha automatically shares contexts for us across all applicable hooks for each test.
        //Additionally these aliases and properties are automatically cleaned up after each test.
        beforeEach(() => {
            //Aliasing cy.fixture() data and then using this to access it via the alias.
            //Note the use of the standard function syntax.
            //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

            cy.fixture('users.json').as('users');
        });

        it(
            'should login and go to subscription page',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                UiVerificationPage.h2Heading.should(
                    'contains.text',
                    'Personal Tribe'
                );
                cy.wait(3000);
                SubscriptionPage.clickonProfile.click();
                SubscriptionPage.clickonSUbscription
                    .eq(3)
                    .should('have.text', 'Subscription')
                    .click();
                UiVerificationPage.subscriptionPageTitle.should(
                    'contain.text',
                    'Amplify Your Imprint'
                );

                // Intercept both the request to b.stripecdn.com and billing.stripe.com
                cy.intercept('GET', '**/b.stripecdn.com/**').as('cdnRedirect');
                cy.intercept('GET', '**billing.stripe.com/**').as(
                    'stripeRedirect'
                );

                // Click the "View Billing Portal" button
                cy.contains('button', 'View Billing Portal')
                    .should('be.visible')
                    .click();

                // Wait for the b.stripecdn.com request
                cy.wait('@cdnRedirect').then((interception) => {
                    // Log and check if the request to b.stripecdn.com is as expected
                    cy.log(
                        'Intercepted CDN Request:',
                        interception.request.url
                    );
                    expect(interception.request.url).to.include(
                        'b.stripecdn.com'
                    );
                    expect(interception.request.url).to.include(
                        'billing.stripe.com'
                    ); // Confirm that it includes billing.stripe.com as a reference
                });

                // Now wait for the final billing.stripe.com redirect
                // cy.wait('@stripeRedirect').then((interception) => {
                //     // Log and verify the final redirect URL
                //     cy.log('Intercepted Stripe Redirect:', interception.request.url);
                //     expect(interception.request.url).to.include('billing.stripe.com');
                // });

                // Finally, ensure the URL has been updated
                // cy.url({timeout: 20000}).should('include', 'billing.stripe.com');
            }
        );
    }
);
