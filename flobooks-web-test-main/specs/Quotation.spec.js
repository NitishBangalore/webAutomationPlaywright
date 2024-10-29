const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const QuotationStrings = require('../constants/QuotationStrings');
const SalesInvoiceStrings = require('../constants/SalesInvoiceStrings');
const PurchaseInvoiceString = require('../constants/PurchaseInvoiceString');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const newUserLoginDataset = JSON.parse(JSON.stringify(require('../resources/newUserValidLogin.json')));

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test.skip(`Validate quotation invoice page elements  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();

        await expect(QuotationPage.QuotationPageHeader).toContainText(QuotationStrings.QUOTATION_HEADER);
        const purchaseInvoicePage = poManager.getPurchasePage();
        await expect(purchaseInvoicePage.keyboardShortcutsButton).toBeVisible();
        await page.keyboard.press('Alt');
        await expect(purchaseInvoicePage.keyboardShortcutText).toContainText(QuotationStrings.KEYBOARD_SHORTCUT);
        await expect(purchaseInvoicePage.createText).toContainText(QuotationStrings.CREATE);
        await purchaseInvoicePage.keyboardShortcutsButton.click();
        await purchaseInvoicePage.closeKeyboardShortcutButton.click();
        await expect(QuotationPage.QuotationNumber).toContainText(QuotationStrings.QUOTATION_NUMBER);
        await expect(purchaseInvoicePage.dueIn).toContainText(PurchaseInvoiceString.DUE_IN);
        await expect(purchaseInvoicePage.amount).toContainText(PurchaseInvoiceString.AMOUNT);
        await expect(QuotationPage.dateFilterButton).toBeVisible();
    });
}

for (const data of newUserLoginDataset) {
    test.skip(`Validate Quotation invoice page for new user  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await expect(QuotationPage.newUserQuotationText).toContainText(QuotationStrings.NEW_USER_QUOTATION_TEXT);
    });
}


for (const data of logindataset) {
    test.skip(`Validate search and redirection for Quotation invoice  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.searchQuotationInput.click();
        await QuotationPage.searchQuotationInput.fill(QuotationStrings.SEARCH_QUOTATION_NO);
        await QuotationPage.searchInvoiceNumber.click();
        await expect(page).toHaveURL(QuotationStrings.SEARCH_QUOTATION_URL);
    });
}

for (const data of logindataset) {
    test.skip(`Validate show Open Quotations DropDown   ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.optionDropdown.click();
        await QuotationPage.showAllQuotation.click();
        await QuotationPage.optionDropdown.click();
        await QuotationPage.showClosedQuotation.click();

    });
}

for (const data of logindataset) {
    test.skip(`Validate create Quotation voucher  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();
        await expect(QuotationPage.createEditInvoiceHeader).toContainText(QuotationStrings.QUOTATION_INVOICE_HEADER);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();
        await page.keyboard.press('Shift+M');
        await expect(salesInvoicePage.addItemHeaderText).toContainText(SalesInvoiceStrings.ADD_ITEM);
        await expect(salesInvoicePage.itemCode).toBeVisible();
        await expect(salesInvoicePage.itemSalesPrice).toBeVisible();
        await expect(salesInvoicePage.itemPurchasePrice).toBeVisible();
        await expect(salesInvoicePage.itemCurrentStock).toBeVisible();
        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.itemDoneButton.click();

        await expect(salesInvoicePage.itemNumber).toBeVisible();
        await expect(salesInvoicePage.itemItems).toBeVisible();
        await expect(salesInvoicePage.itemHSN).toBeVisible();
        await expect(salesInvoicePage.itemQuantity).toBeVisible();
        await expect(salesInvoicePage.itemPrice).toBeVisible();
        await expect(salesInvoicePage.itemDiscount).toBeVisible();
        await expect(salesInvoicePage.itemTax).toBeVisible();
        await expect(salesInvoicePage.itemAmount).toBeVisible();
        await salesInvoicePage.saveSalesVoucher.click();
        await salesInvoicePage.closeToastButton.click();
    });
}

for (const data of logindataset) {
    test.skip(`Validate delete Quotation voucher  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();
        await expect(QuotationPage.createEditInvoiceHeader).toContainText(QuotationStrings.QUOTATION_INVOICE_HEADER);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();
        await page.keyboard.press('Shift+M');
        await expect(salesInvoicePage.addItemHeaderText).toContainText(SalesInvoiceStrings.ADD_ITEM);
        await expect(salesInvoicePage.itemCode).toBeVisible();
        await expect(salesInvoicePage.itemSalesPrice).toBeVisible();
        await expect(salesInvoicePage.itemPurchasePrice).toBeVisible();
        await expect(salesInvoicePage.itemCurrentStock).toBeVisible();
        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.itemDoneButton.click();

        await expect(salesInvoicePage.itemNumber).toBeVisible();
        await expect(salesInvoicePage.itemItems).toBeVisible();
        await expect(salesInvoicePage.itemHSN).toBeVisible();
        await expect(salesInvoicePage.itemQuantity).toBeVisible();
        await expect(salesInvoicePage.itemPrice).toBeVisible();
        await expect(salesInvoicePage.itemDiscount).toBeVisible();
        await expect(salesInvoicePage.itemTax).toBeVisible();
        await expect(salesInvoicePage.itemAmount).toBeVisible();
        await salesInvoicePage.saveSalesVoucher.click();
        await salesInvoicePage.closeToastButton.click();

        //delete quotation invoice
        await salesInvoicePage.deleteButton.click();
        await salesInvoicePage.yesDeleteButton.click();
    });
}

for (const data of logindataset) {
    test.skip(`Validate quotation invoice print  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.searchQuotationInput.click();
        await QuotationPage.searchQuotationInput.fill(QuotationStrings.SEARCH_QUOTATION_NO);
        await QuotationPage.searchInvoiceNumber.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        //validate print buttons
        await expect(salesInvoicePage.printButton).toBeVisible();
        await expect(salesInvoicePage.thermalButton).toBeVisible();
    });
}

for (const data of logindataset) {
    test.skip(`Validate quotation invoice download   ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.searchQuotationInput.click();
        await QuotationPage.searchQuotationInput.fill(QuotationStrings.SEARCH_QUOTATION_NO);
        await QuotationPage.searchInvoiceNumber.click();
        //validate download button
        await QuotationPage.downloadPdfButton.click();
        page.on('download', download => download.path().then(console.log));

    });
}

for (const data of logindataset) {
    test.skip(`Validate quotation invoice change party Name ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();

        //change party 
        await salesInvoicePage.changePartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.SECOND_PARTY);
        await salesInvoicePage.secondPartySearch.click();
        await expect(salesInvoicePage.secondPartyBillTo).toContainText(SalesInvoiceStrings.SECOND_PARTY);
        await expect(salesInvoicePage.secondPPartyShipTo).toContainText(SalesInvoiceStrings.SECOND_PARTY);


    });
}

for (const data of logindataset) {
    test.skip(`Validate quotation invoice change  shipping addresss  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();

        //change shipping address 
        await salesInvoicePage.changeShippingAddressButton.click();
        await salesInvoicePage.firstShippingAddress.click();
        await salesInvoicePage.secondShippingAddress.click();
        await salesInvoicePage.changeShippingAddressDone.click();

    });
}

for (const data of logindataset) {
    test.skip(`Validate quotation invoice for batched items  ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();
        await page.keyboard.press('Shift+M');
        //Add Serialized Item      
        await salesInvoicePage.showBatchingButton.click();
        await QuotationPage.addBatchedItemButton.click();
        await salesInvoicePage.itemDoneButton.click();
        await expect(salesInvoicePage.BatchHeader).toBeVisible();
        await expect(salesInvoicePage.BatchNumber).toContainText(' Batch #1');

    });
}


for (const data of logindataset) {
    test.skip(`Validate quotation invoice for serialized items ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();
        await page.keyboard.press('Shift+M');
        //Add Serialized Item 
        await salesInvoicePage.addSerialItem.click();
        await salesInvoicePage.itemDoneButton.click();
    });
}

for (const data of logindataset) {
    test.skip(`Validate convert quotation to invoice ${data.number} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const QuotationPage = poManager.getQuotationPage();
        await QuotationPage.goto();
        await QuotationPage.gotItText.click();
        await QuotationPage.createQuotationButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchName.click();
        await page.keyboard.press('Shift+M');

        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.itemDoneButton.click();
        await salesInvoicePage.saveSalesVoucher.click();
        await salesInvoicePage.closeToastButton.click();

        await QuotationPage.convertToInvoice.click();
        await expect(QuotationPage.covertToInvoiceToastMessage).toBeVisible();
        await salesInvoicePage.closeToastButton.click();
        await salesInvoicePage.deleteButton.click();


    });
}

}