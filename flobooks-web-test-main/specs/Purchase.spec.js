const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const PurchaseInvoiceStrings = require('../constants/PurchaseInvoiceString');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const newUserLoginDataset = JSON.parse(JSON.stringify(require('../resources/newUserValidLogin.json')));
const SalesInvoiceStrings = require('../constants/SalesInvoiceStrings');
const { ItemUtils } = require('../resources/utils/ItemUtilits');
const { VoucherIndexPageUtils } = require('../resources/utils/VoucherIndexPageUtils');

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate purchase Dashboard page element ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();

        await expect(purchaseInvoicePage.purchaseInvoiceNumberHeader).toContainText(PurchaseInvoiceStrings.PURCHASE_INVOICE_NUMBER);
        await expect(purchaseInvoicePage.dueInHeader).toContainText(PurchaseInvoiceStrings.DUE_IN);
        await expect(purchaseInvoicePage.amountHeader).toContainText(PurchaseInvoiceStrings.AMOUNT);
        //keyboard shorcut
        await expect(purchaseInvoicePage.keyboardShortcutsButton).toBeVisible();
        await page.keyboard.press('Alt');
        await expect(purchaseInvoicePage.keyboardShortcutText).toContainText(PurchaseInvoiceStrings.KEYBOARD_SHORTCUT);
        await expect(purchaseInvoicePage.createText).toContainText(PurchaseInvoiceStrings.CREATE);
        await purchaseInvoicePage.closeKeyboardShortcutButton.click();
        //Date Range 
        await expect(purchaseInvoicePage.dateFilterButton).toBeVisible();

    });
}

for (const data of logindataset) {
    test(`Validate search and redirection of purchase invoices ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();

        await VoucherIndexPageUtils.scrollPage(2,page);
        let invoiceNumber = await purchaseInvoicePage.invoice20.textContent();
        await purchaseInvoicePage.invoice20.click();
        console.log(await purchaseInvoicePage.pdfInvoiceNumber.textContent());
        await expect(purchaseInvoicePage.pdfInvoiceNumber).toContainText(invoiceNumber);
    });
}

for (const data of newUserLoginDataset) {
    test.skip(`Validate Purchase invoice page for new user  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await expect(purchaseInvoicePage.newUserPurchase).toContainText(PurchaseInvoiceStrings.EMPTY_PURCHASE);

    });
}

for (const data of logindataset) {
    test.skip(`Validate purchase invoice view  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.DashboardLeftNavButton.click();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.searchPurchaseInvoice.click();
        await purchaseInvoicePage.searchPurchaseInvoice.fill(PurchaseInvoiceStrings.SEARCH_INVOICE_NUMBER);
        await page.keyboard.press('Enter');
        await purchaseInvoicePage.searchInvoiceNumber.click();

        //invoice view 
        await expect(purchaseInvoicePage.invoiceHeader).toContainText(PurchaseInvoiceStrings.PURCHASE_HEADER_INVOICE_NUMBER);
        await expect(purchaseInvoicePage.keyboardShortcutInvoiceView).toBeVisible();
    });
}

for (const data of logindataset) {
    test(`Validate create purchase invoice${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        await page.keyboard.press('Shift+M');
        await expect(salesInvoicePage.addItemHeaderText).toContainText(SalesInvoiceStrings.ADD_ITEM);
        await expect(salesInvoicePage.itemCode).toBeVisible();
        await expect(salesInvoicePage.itemSalesPrice).toBeVisible();
        await expect(salesInvoicePage.itemPurchasePrice).toBeVisible();
        await expect(salesInvoicePage.itemCurrentStock).toBeVisible();
        await salesInvoicePage.addItemButton.click();
        await expect(salesInvoicePage.itemNameDetail).toContainText(SalesInvoiceStrings.ITEM_NAME);
        await salesInvoicePage.addItemGodownPopUp.click();
        await salesInvoicePage.saveItemButton.click();
        await salesInvoicePage.itemDoneButton.click();

        await expect(salesInvoicePage.itemNumber).toBeVisible();
        await expect(salesInvoicePage.itemItems).toBeVisible();
        await expect(salesInvoicePage.itemHSN).toBeVisible();
        await expect(salesInvoicePage.itemQuantityText).toBeVisible();
        await expect(salesInvoicePage.itemPrice).toBeVisible();
        await expect(salesInvoicePage.itemTax).toBeVisible();
        await expect(salesInvoicePage.itemAmount).toBeVisible();
        await salesInvoicePage.saveSalesVoucher.click();

        await purchaseInvoicePage.notificationToast.waitFor();
        await expect(purchaseInvoicePage.notificationToast).toContainText("Purchase invoice created successfully", { timeout: 2000 });
    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice print ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();

        await purchaseInvoicePage.invoiceFirst.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        //print buttons 
        await expect(salesInvoicePage.downloadPdfButton).toBeVisible();
        await expect(salesInvoicePage.printButton).toBeVisible();
        await purchaseInvoicePage.printDropDown.click();
        await expect(purchaseInvoicePage.printThermalButton).toBeVisible();
    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice download ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();

         await purchaseInvoicePage.invoiceFirst.click();

        //Download pdfs 
        await purchaseInvoicePage.downloadPdfButton.click();
        page.on('download', download => download.path().then(console.log));

    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice pdf elements ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        await page.keyboard.press('Shift+M');
        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.addItemGodownPopUp.click();
        await salesInvoicePage.saveItemButton.click();
        await salesInvoicePage.itemDoneButton.click();
        await salesInvoicePage.saveSalesVoucher.click();
        await salesInvoicePage.closeToastButton.click();

        //pdf validations 
        await expect(salesInvoicePage.companyName).toBeVisible();
        await expect(salesInvoicePage.companyLogo).toBeVisible();
        await expect(salesInvoicePage.companyAddress).toBeVisible();
        await expect(salesInvoicePage.companyPhoneNumber).toBeVisible();
        await expect(salesInvoicePage.InvoiceDueDate).toBeVisible();
        await expect(purchaseInvoicePage.BillFrom).toBeVisible();
        await expect(purchaseInvoicePage.ShipFrom).toBeVisible();
        await expect(salesInvoicePage.BillTocompanyName).toContainText(SalesInvoiceStrings.PARTY_NAME);
        await expect(salesInvoicePage.ShipToCompanyName).toContainText(SalesInvoiceStrings.PARTY_NAME);
        await expect(salesInvoicePage.pdfItems).toBeVisible();
        await expect(salesInvoicePage.pdfHSN).toBeVisible();
        await expect(salesInvoicePage.pdfQuantity).toBeVisible();
        await expect(salesInvoicePage.pdfRate).toBeVisible();
        await expect(salesInvoicePage.pdfTax).toBeVisible();
        await expect(salesInvoicePage.pdfAmount).toBeVisible();
        await expect(salesInvoicePage.pdfSubtotal).toBeVisible();
        await expect(salesInvoicePage.pdfTermsAndCondition).toBeVisible();
        await expect(salesInvoicePage.pdfTotalAmount).toBeVisible();
        await expect(salesInvoicePage.pdfTotalAmountinWords).toBeVisible();

    });
}


for (const data of logindataset) {
    test(`Validate purchase invoice for serialized items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        await page.keyboard.press('Shift+M');
        //Add Serialized Item 
        await salesInvoicePage.searchItemField.click();
        await salesInvoicePage.searchItemField.fill(SalesInvoiceStrings.SERIAL_ITEM_NAME);
        await salesInvoicePage.addItemButton.click();

        await purchaseInvoicePage.spinButton.click();
        await purchaseInvoicePage.spinButton.fill('1');
        await purchaseInvoicePage.addNewSerialNumberButton.click();
        await purchaseInvoicePage.addNewSerialNumberButtonInput.click();
        await purchaseInvoicePage.addNewSerialNumberButtonInputValue.fill((await ItemUtils.getItemSerialNumber()).toString());
        await purchaseInvoicePage.serialNumberModalSave.click();
        await salesInvoicePage.itemDoneButton.click();

        await salesInvoicePage.saveSalesVoucher.click();
        await purchaseInvoicePage.notificationToast.waitFor();
        await expect(purchaseInvoicePage.notificationToast).toContainText("Purchase invoice created successfully", { timeout: 2000 });
    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice for Batched items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        await page.keyboard.press('Shift+M');
        //Add Batching Item 
        await salesInvoicePage.showBatchingButton.click();
        await salesInvoicePage.addBatchingItem.click();
        try{
            await salesInvoicePage.addItemGodownPopUp.click({setTimeout:'2000'});
            await salesInvoicePage.saveItemButton.click({setTimeout:'2000'});
        }
        catch{}
        await salesInvoicePage.itemDoneButton.click();
        await expect(salesInvoicePage.BatchHeader).toBeVisible();
        await expect(salesInvoicePage.BatchNumber).toContainText(' Batch #1');

        await salesInvoicePage.saveSalesVoucher.click();
        await purchaseInvoicePage.notificationToast.waitFor();
        await expect(purchaseInvoicePage.notificationToast).toContainText("Purchase invoice created successfully", { timeout: 2000 });
    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice change shipping address ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_MULTIPLE_ADDRESS);
        await salesInvoicePage.partySearchNameResult.click();
        //change shipping address 

        await salesInvoicePage.changeShippingAddressButton.click();
        await salesInvoicePage.secondShippingAddress.click();
        await salesInvoicePage.changeShippingAddressDone.click();

    });
}

for (const data of logindataset) {
    test(`Validate purchase invoice change Party ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();
        await purchaseInvoicePage.createPurchaseButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();

        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        //change party 

        await salesInvoicePage.changePartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.SECOND_PARTY);
        await salesInvoicePage.secondPartySearch.click();
        await expect(salesInvoicePage.secondPartyBillTo).toContainText(SalesInvoiceStrings.SECOND_PARTY);
        await expect(salesInvoicePage.secondPPartyShipTo).toContainText(SalesInvoiceStrings.SECOND_PARTY);
    });
}

}