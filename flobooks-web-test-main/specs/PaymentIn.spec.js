const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const paymentString = require('../constants/PaymentInStrings');
const QuotationStrings = require('../constants/QuotationStrings');
const { PaymentVoucherCreationUtil } = require('../resources/utils/PaymentVoucherCreationUtil');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const paymentInDataset = JSON.parse(JSON.stringify(require('../resources/paymentInData.json')));

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Payment In Dashboard ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentInPage = poManager.getPaymentInPage();
        await paymentInPage.goto();

        await expect(paymentInPage.pageHeader).toContainText(paymentString.PAGE_HEADER_PAYMENT_IN);
        await expect(paymentInPage.dateColumn).toContainText(paymentString.TABLE_HEADER_DATE);
        await expect(paymentInPage.PaymentNumberColumn).toContainText(paymentString.TABLE_HEADER_PAYMENT_NUMBER);
        await expect(paymentInPage.PartyNameColumn).toContainText(paymentString.TABLE_HEADER_PARTY_NAME);
        await expect(paymentInPage.AmountColumn).toContainText(paymentString.TABLE_HEADER_AMOUNT);
        await expect(paymentInPage.invoiceSettingsButton).toBeVisible();
        await expect(paymentInPage.createPaymentInButton).toBeVisible();
        const purchaseInvoicePage = poManager.getPurchasePage();
        await expect(purchaseInvoicePage.keyboardShortcutsButton).toBeVisible();
        await page.keyboard.press('Alt');
        await expect(purchaseInvoicePage.keyboardShortcutText).toContainText(QuotationStrings.KEYBOARD_SHORTCUT);
        await expect(purchaseInvoicePage.createText).toContainText(paymentString.CREATE_PAYMENT_IN);
        await purchaseInvoicePage.closeKeyboardShortcutButton.click();
    });
}

for (const data of logindataset) {
    test(`Validate Payment In search and date filter ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //Date filter 
        const paymentInPage = poManager.getPaymentInPage();
        await paymentInPage.goto();
        //search 
        let lastVoucherNumber = await paymentInPage.lastVoucher.textContent();
        await paymentInPage.searchInvoiceButton.click();
        await paymentInPage.searchPaymentIn.click();
        await paymentInPage.searchPaymentIn.fill(lastVoucherNumber.trim());
        await loginPage.delay(2000);    //wait since there is no loader in the screen
        await paymentInPage.invoiceFirst.click();
        await expect(await paymentInPage.invoiceHeader).toContainText(lastVoucherNumber);
    });
}

for (const data of paymentInDataset) {
    test(`Validate create PaymentIn ${data.customSettle} ${data.paymentMode}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentInPage = poManager.getPaymentInPage();
        await paymentInPage.goto();

        await paymentInPage.createPaymentInButton.click();
        await PaymentVoucherCreationUtil.createPayment(page,"testParty",data);
    });
}

for (const data of logindataset){
    test(`Validate create Payment In from Sales Invoice ${data.number}`, async({page}) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentInPage = poManager.getPaymentInPage();
        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        await salesInvoicePage.gotItText.click();

        await salesInvoicePage.firstUnpaidinvoice.click();
        let amt = await salesInvoicePage.pdfInvoiceAmount.textContent();
        let totalAmt = parseFloat(amt.trim().replace(/[^0-9.]/g, ''));
        await salesInvoicePage.recordPaymentInButton.click();
        
        expect(await salesInvoicePage.piAmountField.inputValue()).toMatch(totalAmt.toString(),{timeout:5000});
        await salesInvoicePage.piPaymentModeDropDown.click();
        await salesInvoicePage.piBankPaymentMode.click();
        await salesInvoicePage.piPaymentReceivedInDropDown.click();
        await salesInvoicePage.piSelectPaymentReceiveIn.click()
        await salesInvoicePage.piNotesField.click();
        await salesInvoicePage.piNotesField.fill(totalAmt.toString());
        await salesInvoicePage.piSaveButton.click();

        await paymentInPage.toast.waitFor();
        expect(await paymentInPage.toast).toContainText("Payment created successfully");
    })
}


for (const data of logindataset){
    test(`Validate delete Payment In invoice ${data.number}`, async({page}) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentInPage = poManager.getPaymentInPage();
        await paymentInPage.goto();

        const voucherNumber = await paymentInPage.voucherFirst_number.textContent();
        await paymentInPage.voucherFirst_number.click();

        expect(await paymentInPage.invoiceHeader).toContainText(voucherNumber);
        await paymentInPage.deleteVoucher.click();
        await paymentInPage.deleteConfirm.click();
        await paymentInPage.toast.waitFor();
        expect(await paymentInPage.toast).toContainText("Payment deleted successfully");
    });
}
}