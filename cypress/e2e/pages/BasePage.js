import TopMenuComponent from '../components/TopMenuComponent';

class BasePage {
    constructor() {
        this.header = new TopMenuComponent();
    }

    open(path) {
        return cy.visit(path);
    }
}

export default BasePage;
