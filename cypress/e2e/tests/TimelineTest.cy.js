import LoginPage from '../pages/LoginPage';
import BasePage from '../pages/BasePage';
import AccountPage from '../pages/AccountPage';
import TimelinePage from '../pages/Timeline';

describe(
    'Post different content on TimelinePage flow',
    { tags: ['@Login', '@regression'] },
    () => {
        let basePage;

        before(() => {
            basePage = new BasePage();
        });

        //Mocha automatically shares contexts for us across all applicable hooks for each test.
        //Additionally these aliases and properties are automatically cleaned up after each test.
        beforeEach(() => {
            //Aliasing cy.fixture() data and then using this to access it via the alias.
            //Note the use of the standard function syntax.
            //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

            cy.fixture('users.json').as('users');
        });

        it(
            'should login successfully and post a text Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
                cy.wait(3000);
                Timeline.clickOnTimeline.should('be.visible').click();
                Timeline.textImprint();
                Timeline.verifyImprint();
            }
        );

        it(
            'should login successfully and post a Media Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
                cy.wait(3000);
                Timeline.clickOnTimeline.should('be.visible').click();
                Timeline.clickonEditor.should('be.visible');
                Timeline.mediaImprint();
                Timeline.verifyImprint();
            }
        );

        it(
            'should login successfully and post a Article Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
                cy.wait(3000);
                Timeline.clickOnTimeline.should('be.visible').click();

                //Timeline.clickonEditor.should('be.visible')
                Timeline.articleImprint();
                Timeline.verifyImprint();
            }
        );

        it.skip(
            'should login successfully and click on 3 dot then post a CheckIn Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
                cy.wait(3000);
                Timeline.clickOnTimeline.should('be.visible').click();
                Timeline.checkinImprint();

                // Set environment variable to indicate a check-in test is running
                Cypress.env('CHECK_IN_TEST', true);

                Timeline.verifyImprint();
            }
        );

        it(
            'should login successfully and post a Verified Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');
                cy.wait(3000);
                Timeline.clickOnTimeline.should('be.visible').click();
                Timeline.checkVerifedImprint();
                Timeline.verifyImprint();
            }
        );

        it(
            'should login successfully and look for a Verified Imprint',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');

                Timeline.checkforVerifyTick
                    .trigger('mouseover')
                    .should('have.css', 'color', 'rgb(16, 20, 24)');
            }
        );

        it(
            'should login successfully and select one filter',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.validUser.email,
                    this.users.validUser.password
                );
                AccountPage.h2Heading.should('contains.text', 'Personal Tribe');

                cy.get('.ant-menu-title-content').contains('Love').click();
                // Check if the image has alt="Life" and the src includes the correct image URL
                cy.get('img[alt="Love"]')
                    .should('have.attr', 'src') // Check the src attribute of the image
                    .and('include', 'value-love'); // Ensure that the src includes "value-life"
            }
        );

        it.only(
            'should login successfully and select multiple filter',
            { tags: '@smoke' },
            function () {
                //fail test

                const email = this.users.validUser.email;
                const password = this.users.validUser.password;

                //login request

                cy.request({
                    method: 'POST',
                    url: `${Cypress.config(
                        'baseUrl'
                    )}/backend/api/v2/auth/login`,
                    headers: {
                        'Content-Type': 'application/json',
                        Origin: Cypress.config('baseUrl'), // Ensure origin is set
                    },
                    body: { email: `${email}`, password: `${password}` },
                }).then((loginResponse) => {
                    const authToken = loginResponse.body.tokens.accessToken;
                    cy.log(authToken);

                    //insert the posts that contain each value badge through API
                    //"LIFE POST"
                    cy.request({
                        method: 'POST',
                        url: '/backend/api/v2/imprint', // Change this to your API endpoint
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                            Origin: Cypress.config('baseUrl'), // Ensure origin is set
                        },
                        body: {
                            description:
                                "Today, I learned about water scarcity issues in some parts of the world. It's a reminder of how lucky I am to have access to clean water",
                            mediaQuantity: 0,
                            isCheckIn: false,
                            isGlobal: false,
                        },
                    }).then((response) => {
                        expect(response.status).to.eq(201); // Ensure it's created
                        expect(response.body).to.have.property('id'); // Check if an ID is returned
                        const lifeImprintId = response.body.id; // Capture inserted user's ID
                        cy.log(lifeImprintId);

                        //"LOVE POST"
                        cy.request({
                            method: 'POST',
                            url: '/backend/api/v2/imprint', // Change this to your API endpoint
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authToken}`,
                                Origin: Cypress.config('baseUrl'), // Ensure origin is set
                            },
                            body: {
                                description:
                                    "Love is a powerful force that unites us all. Let's celebrate love in all its forms and spread kindness today and every day.",
                                mediaQuantity: 0,
                                isCheckIn: false,
                                isGlobal: false,
                            },
                        }).then((response) => {
                            expect(response.status).to.eq(201); // Ensure it's created
                            expect(response.body).to.have.property('id'); // Check if an ID is returned
                            const loveImprintId = response.body.id; // Capture inserted user's ID
                            cy.log(loveImprintId);

                            //"RESPECT POST"
                            cy.request({
                                method: 'POST',
                                url: '/backend/api/v2/imprint', // Change this to your API endpoint
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${authToken}`,
                                    Origin: Cypress.config('baseUrl'), // Ensure origin is set
                                },
                                body: {
                                    description:
                                        "Respect for each other's beliefs and practices is the foundation of a harmonious world. 🙏 Let's champion religious freedom and tolerance for all faiths.",
                                    mediaQuantity: 0,
                                    isCheckIn: false,
                                    isGlobal: false,
                                },
                            }).then((response) => {
                                expect(response.status).to.eq(201); // Ensure it's created
                                expect(response.body).to.have.property('id'); // Check if an ID is returned
                                const respectImprintId = response.body.id; // Capture inserted user's ID
                                cy.log(respectImprintId);

                                //"SAFETY POST"
                                // cy.request({
                                //     method: "POST",
                                //     url: "/backend/api/v2/imprint", // Change this to your API endpoint
                                //     headers: {
                                //         "Content-Type": "application/json",
                                //         "Authorization": `Bearer ${authToken}`,
                                //         "Origin": Cypress.config("baseUrl")  // Ensure origin is set
                                //     },
                                //     body: {
                                //         "description": "Today, I learned about water scarcity issues in some parts of the world. It's a reminder of how lucky I am to have access to clean water",
                                //         "mediaQuantity": 0,
                                //         "isCheckIn": false,
                                //         "isGlobal": false,
                                //     }
                                // }).then((response) => {
                                //         expect(response.status).to.eq(201); // Ensure it's created
                                //         expect(response.body).to.have.property("id"); // Check if an ID is returned
                                //         const safetyImprintId = response.body.id; // Capture inserted user's ID
                                //         cy.log(safetyImprintId)
                                //     })

                                //"PURPOSE POST"
                                cy.request({
                                    method: 'POST',
                                    url: '/backend/api/v2/imprint', // Change this to your API endpoint
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${authToken}`,
                                        Origin: Cypress.config('baseUrl'), // Ensure origin is set
                                    },
                                    body: {
                                        description:
                                            "As a lifelong learner, I've realized that education doesn't stop after graduation. My pursuit of knowledge has led me to new opportunities and personal growth I never thought possible.",
                                        mediaQuantity: 0,
                                        isCheckIn: false,
                                        isGlobal: false,
                                    },
                                }).then((response) => {
                                    expect(response.status).to.eq(201); // Ensure it's created
                                    expect(response.body).to.have.property(
                                        'id'
                                    ); // Check if an ID is returned
                                    const purposeImprintId = response.body.id; // Capture inserted user's ID
                                    cy.log(purposeImprintId);

                                    //"LAUGHTER POST"
                                    // cy.request({
                                    //     method: "POST",
                                    //     url: "/backend/api/v2/imprint", // Change this to your API endpoint
                                    //     headers: {
                                    //         "Content-Type": "application/json",
                                    //         "Authorization": `Bearer ${authToken}`,
                                    //         "Origin": Cypress.config("baseUrl")  // Ensure origin is set
                                    //     },
                                    //     body: {
                                    //         "description": "Why did the therapist bring a ladder to work? Because they wanted to help their patients reach new heights!",
                                    //         "mediaQuantity": 0,
                                    //         "isCheckIn": false,
                                    //         "isGlobal": false,
                                    //     }
                                    // }).then((response) => {
                                    //         expect(response.status).to.eq(201); // Ensure it's created
                                    //         expect(response.body).to.have.property("id"); // Check if an ID is returned
                                    //         const laughterImprintId = response.body.id; // Capture inserted user's ID
                                    //         cy.log(laughterImprintId)

                                    LoginPage.loginWithUI(
                                        this.users.validUser.email,
                                        this.users.validUser.password
                                    );

                                    AccountPage.h2Heading.should(
                                        'contains.text',
                                        'Personal Tribe'
                                    );

                                    const valuesToClick = [
                                        'Life',
                                        'Love',
                                        'Purpose',
                                        'Respect',
                                        'Laughter',
                                    ]; // You can modify this array as needed

                                    // Loop through the values and click each one
                                    valuesToClick.forEach((value) => {
                                        cy.get('.ant-menu-title-content')
                                            .contains(value) // Contains method allows you to click dynamically based on value
                                            .then((item) => {
                                                // Scroll the element into view //TEST Fail at scroll to 3rd element as it not visible
                                                cy.get('#scrollableDiv') // This is the parent scrollable container
                                                    .scrollIntoView({
                                                        behavior: 'auto',
                                                    }) // Scroll it into view if it's outside the viewport
                                                    .wait(5000) // Wait for the loader to show up, adjust this as necessary
                                                    .should('exist'); // Ensure that the loader disappears
                                                // Now that the parent container is scrolled into view, click the item
                                                cy.wrap(item).click();
                                            });

                                        // Check if the image has alt="Life" and the src includes the correct image URL
                                        cy.get('img[alt="' + value + '"]')
                                            // .should('be.visible')
                                            .should('have.attr', 'src') // Check the src attribute of the image
                                            .and(
                                                'include',
                                                `value-${value.toLowerCase()}`
                                            ); // Ensure that the src includes "value-life"

                                        //  Optionally, verify something after the click if needed
                                        cy.get(
                                            '.ant-menu-item-selected'
                                        ).should('contain', value); // Verifies that the item is selected
                                    });

                                    //Delete all posted post
                                    //DELETE LOVE POST
                                    cy.request({
                                        method: 'DELETE',
                                        url: `/backend/api/v2/imprint/delete-imprint/${loveImprintId}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${authToken}`,
                                            Origin: Cypress.config('baseUrl'), // Ensure origin is set
                                        },
                                    }).then((deleteResponse) => {
                                        expect(deleteResponse.status).to.eq(
                                            200
                                        );
                                    });

                                    //DELETE LIFE POST
                                    cy.request({
                                        method: 'DELETE',
                                        url: `/backend/api/v2/imprint/delete-imprint/${lifeImprintId}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${authToken}`,
                                            Origin: Cypress.config('baseUrl'),
                                        },
                                    }).then((deleteResponse) => {
                                        expect(deleteResponse.status).to.eq(
                                            200
                                        );
                                    });

                                    //DELETE PURPOSE POST
                                    cy.request({
                                        method: 'DELETE',
                                        url: `/backend/api/v2/imprint/delete-imprint/${purposeImprintId}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${authToken}`,
                                            Origin: Cypress.config('baseUrl'),
                                        },
                                    }).then((deleteResponse) => {
                                        expect(deleteResponse.status).to.eq(
                                            200
                                        );
                                    });

                                    //DELETE LAUGHTER POST
                                    cy.request({
                                        method: 'DELETE',
                                        url: `/backend/api/v2/imprint/delete-imprint/${laughterImprintId}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${authToken}`,
                                            Origin: Cypress.config('baseUrl'), // Ensure origin is set
                                        },
                                    }).then((deleteResponse) => {
                                        expect(deleteResponse.status).to.eq(
                                            200
                                        );
                                    });

                                    //DELETE RESPECT POST
                                    cy.request({
                                        method: 'DELETE',
                                        url: `/backend/api/v2/imprint/delete-imprint/${respectImprintId}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${authToken}`,
                                            Origin: Cypress.config('baseUrl'), // Ensure origin is set
                                        },
                                    }).then((deleteResponse) => {
                                        expect(deleteResponse.status).to.eq(
                                            200
                                        );
                                    });

                                    //DELETE SAFETY POST
                                    // cy.request({
                                    //     method: "DELETE",
                                    //     url: `/backend/api/v2/imprint/delete-imprint/${safetyImprintId}`,
                                    //     headers: {
                                    //         "Content-Type": "application/json",
                                    //         "Authorization": `Bearer ${authToken}`,
                                    //         "Origin": Cypress.config("baseUrl")  // Ensure origin is set
                                    //     },
                                    // }).then((deleteResponse) => {
                                    //         expect(deleteResponse.status).to.eq(200);
                                    //     });
                                });
                            });
                        });
                    });
                });
            }
        );
    }
);
