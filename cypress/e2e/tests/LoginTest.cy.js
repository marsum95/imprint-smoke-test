import AccountPage from '../pages/AccountPage';
import BasePage from '../pages/BasePage';
import LoginPage from '../pages/LoginPage';

describe(
    'Success and Fail login flow',
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

            // cy.fixture('users.json').as('users');
            cy.login(); //login via custom command
        });

        it(
            'should login successfully with valid credentials',
            { tags: '@smoke' },
            function () {
                AccountPage.verifyTimelineHeading();
            }
        );

        it(
            'should fail to login with invalid credentials',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.invalidUser.email,
                    this.users.invalidUser.password
                );

                LoginPage.verifyAlert();
            }
        );

        it('should perform login and logout', function () {
            // cy.login(); //login via custom command

            basePage.header.performLogout();
            AccountPage.verifyLogout();
        });

        const notifications = [
            { menuId: 'ant-menu-title-content', tooltip: 'Home - Coming Soon' },
            { menuId: 'ant-menu-title-content', tooltip: 'News - Coming Soon' },
            {
                menuId: 'ant-menu-title-content',
                tooltip: 'Entertainment - Coming Soon',
            },
            {
                menuId: 'ant-menu-title-content',
                tooltip: 'Notifications - Coming Soon',
            },
            {
                menuId: 'ant-menu-title-content',
                tooltip: 'Messenger - Coming Soon',
            },
            // Add other menu items following the same pattern
        ];

        it.skip(`Should validate tooltips`, { tags: '@smoke' }, function () {
            LoginPage.loginWithUI(
                this.users.newUser.email,
                this.users.newUser.password
            );

            cy.url().should('include', '/profile');

            AccountPage.profileName.should(($el) => {
                const text = $el.text(); // Extract the text content of the element
                expect(text.trim()).to.not.be.empty; // Validate that the text is not empty or just whitespace
            });

            notifications.forEach((notification, index) => {
                cy.get('.' + notification.menuId)
                    .find('.disabled-text')
                    //.find('.icon-home')
                    .should('exist');

                // Hover and validate tooltip
                cy.get('.' + notification.menuId)
                    .eq(index)
                    .trigger('mouseover')
                    .then(() => {
                        cy.contains(notification.tooltip).should('be.visible');
                    });

                // Ensure clicking does not perform any action
                cy.get('.' + notification.menuId)
                    .eq(index)
                    .click({ multiple: true });
                cy.url().should(
                    'not.include',
                    `/${notification.menuId.split('-').pop()}`
                );
            });
        });

        it.skip(
            'Should open side menu and validate enabled and disabled options',
            { tags: '@smoke' },
            function () {
                LoginPage.loginWithUI(
                    this.users.newUser.email,
                    this.users.newUser.password
                );
                // cy.get(':nth-child(3) > .ant-avatar > img',{ timeout: 10000 }).click(); // Click on profile picture

                const menuItems = [
                    {
                        selector: '.ant-list-item-meta-description',
                        description: 'Main account',
                        disabled: false,
                    },
                    {
                        selector: '.ant-list-item-meta-description',
                        description: 'Access widget settings',
                        disabled: false,
                    },
                    {
                        selector: '.ant-list-item-meta-description',
                        description: 'Story about imprint',
                        disabled: false,
                    },
                    {
                        selector: '.ant-list-item-meta-description',
                        description: 'Imprints without limits',
                        disabled: false,
                    },
                    {
                        selector: '.ant-list-item-meta-description',
                        description: 'View value profile and analytics',
                        disabled: false,
                    },
                ];

                menuItems.forEach((item) => {
                    cy.get(':nth-child(3) > .ant-avatar > img', {
                        timeout: 10000,
                    }).click();
                    cy.get(item.selector, { timeout: 10000 })
                        .contains(item.description)
                        .should('exist') // Ensure the item exists
                        .then(($el) => {
                            if (item.disabled) {
                                const isDisabled =
                                    $el.hasClass('ant-list-item disabled') ||
                                    $el.css('pointer-events') === 'none' ||
                                    $el.css('opacity') < 1;
                                expect(isDisabled).to.be.true;
                            } else {
                                cy.wrap($el)
                                    .should('be.visible')
                                    .click({ force: true });
                                cy.url().should((url) => {
                                    expect(url).to.satisfy(
                                        (u) =>
                                            u.includes('/profile') ||
                                            u.includes('/about-imprints')
                                    );
                                });
                            }
                        });
                });

                AccountPage.h1Heading
                    .should('contains.text', 'Log Out')
                    .click({ force: true }); // Logout functionality
                cy.url().should('include', '/login'); // Ensure user is redirected to login page
            }
        );
    }
);
