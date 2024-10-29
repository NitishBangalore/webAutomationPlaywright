const { expect } = require('@playwright/test');
const { POManager } = require('../../page-objects/POManager');
const SalesInvoiceStrings = require('../../constants/SalesInvoiceStrings');

class InvoiceCreationUtil {

    static async openItemModal(page) {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const salesInvoicePage = poManager.getSalesInvoicePage();

        let attemmpt = 0;
        while (attemmpt < 2) {
            //here we are looping a maxium of 2 times(as in 2 tries), if create item modal opens instead of add item modal
            try {
                await this.addPartyToInvoice(page,SalesInvoiceStrings.PARTY_NAME);
                //add item
                await page.keyboard.press('Shift+M');
                await expect(salesInvoicePage.addItemHeaderText).toContainText(SalesInvoiceStrings.ADD_ITEM);
                await expect(salesInvoicePage.itemCode).toBeVisible();

                break;  //if nothing fails exit while loop
            }
            catch (error) {
                attemmpt++;
                await loginPage.goTo();     //navigating to dashboard to load all user data
                await salesInvoicePage.createSalesInvoiceLeftNavButton.click();
                await page.waitForLoadState('domcontentloaded');
            }
        }
    }

    static async addPartyToInvoice(page,partyName) {

        const poManager = new POManager(page);
        const salesInvoicePage = poManager.getSalesInvoicePage();

        //add party
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(partyName);
        await salesInvoicePage.partySearchNameResult.click();
    }

}

module.exports = { InvoiceCreationUtil };