export default class HeaderComponent {

    get searchInput() { return cy.get('#search input[name="search"]'); }
    get searchBtn() { return cy.get('#search button'); }
    get myAccountDropdown() { return cy.get('.ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(3)'); } //need to change it to click on myprofile icon 
    get shoppingCart() { return cy.get('#top-links a[title="Shopping Cart"]'); }
    get logoutLink() { return cy.get('.ant-list-footer > div').contains('Log Out'); } //change this to click on logout button 
    get wishListMenu() { return cy.get('#top-links #wishlist-total'); }

    searchProduct(product) {
        this.searchInput.clear()
        this.searchInput.type(product);
        this.searchBtn.click();
    }

    performLogout() {
        this.myAccountDropdown.click();
        this.logoutLink.click();
    }

    openShoppingCart() {
        this.shoppingCart.click()
    }

    openWishlist() {
        this.wishListMenu.click();
    }

}
