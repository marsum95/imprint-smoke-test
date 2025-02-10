import BasePage from "./BasePage";
import { ENDPOINT_PREFIX } from "../config/constants";
import routes from "../config/routes";


class SubscriptionFlow extends BasePage{
    get clickonProfile() { return cy.get(':nth-child(3) > .ant-avatar > img')}
    get clickonSUbscription() {return cy.get('.ant-list-item-meta-title')}





}

export default new SubscriptionFlow()