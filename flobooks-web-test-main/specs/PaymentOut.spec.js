const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const QuotationStrings = require('../constants/QuotationStrings');
const { PaymentVoucherCreationUtil } = require('../resources/utils/PaymentVoucherCreationUtil');
const paymentString = require('../constants/PaymentInStrings');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const paymentInDataset = JSON.parse(JSON.stringify(require('../resources/paymentInData.json')));

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Payment Out Dashboard ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        await expect(paymentOutPage.pageHeader).toContainText(paymentString.PAGE_HEADER_PAYMENT_OUT);
        await expect(paymentOutPage.dateColumn).toContainText(paymentString.TABLE_HEADER_DATE);
        await expect(paymentOutPage.PaymentNumberColumn).toContainText(paymentString.TABLE_HEADER_PAYMENT_NUMBER);
        await expect(paymentOutPage.PartyNameColumn).toContainText(paymentString.TABLE_HEADER_PARTY_NAME);
        await expect(paymentOutPage.AmountColumn).toContainText(paymentString.TABLE_HEADER_AMOUNT);
        await expect(paymentOutPage.invoiceSettingsButton).toBeVisible();
        await expect(paymentOutPage.createPaymentOutButton).toBeVisible();
        const purchaseInvoicePage = poManager.getPurchasePage();
        await expect(purchaseInvoicePage.keyboardShortcutsButton).toBeVisible();
        await page.keyboard.press('Alt');
        await expect(purchaseInvoicePage.keyboardShortcutText).toContainText(QuotationStrings.KEYBOARD_SHORTCUT);
        await expect(purchaseInvoicePage.createText).toContainText(paymentString.CREATE_PAYMENT_OUT);
        await purchaseInvoicePage.closeKeyboardShortcutButton.click();
    });
}

for (const data of logindataset) {
    test(`Validate Payment Out search and date filter ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        //search 
        let lastVoucherNumber = await paymentOutPage.lastVoucher.textContent();
        await paymentOutPage.searchInvoiceButton.click();
        await paymentOutPage.searchPaymentOut.click();
        await paymentOutPage.searchPaymentOut.fill(lastVoucherNumber.trim());
        await loginPage.delay(1000);
        await paymentOutPage.invoiceFirst.click();
        await expect(await paymentOutPage.voucherHeader).toContainText(lastVoucherNumber);
    });
}

for (const data of logindataset) {
    test(`Validate Payment Out voucher view  ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        //search 
        let invoiceNumber = await paymentOutPage.firstInvoice_Number.textContent();
        let invoicePartyName = await paymentOutPage.firstInvoice_PartyName.textContent();
        let invoiceDate = await paymentOutPage.firstInvoice_InvoiceDate.textContent();
        let invoiceAmount = (await paymentOutPage.firstInvoice_Amount.textContent()).replace(/[^0-9.]/g, '');

        await paymentOutPage.searchInvoiceButton.click();
        await paymentOutPage.searchPaymentOut.fill(invoiceNumber.trim());
        await paymentOutPage.invoiceFirst.click();

        await expect(paymentOutPage.partyName).toContainText(invoicePartyName);
        await expect(paymentOutPage.paymentDate).toContainText(invoiceDate);
        await expect(paymentOutPage.paymentAmount).toContainText(invoiceAmount);
        await expect(paymentOutPage.paymentType).toContainText(paymentString.VOUCHER_VIEW_PAYMENT_TYPE);
        await expect(paymentOutPage.date).toContainText(paymentString.VOUCHER_VIEW_PAYMENT_DATE);

        let linkedVoucherNumber = await paymentOutPage.linkedVoucherNumber_first.textContent();
        await paymentOutPage.clickLinkedInvoice_first.click();

        let purchasePage = poManager.getPurchasePage();
        await purchasePage.pdfInvoiceNumber.waitFor();
        expect(await purchasePage.pdfInvoiceNumber).toContainText(linkedVoucherNumber);
    });
}

for (const data of paymentInDataset) {
    test(`Validate Payment Out create voucher for ${data.customSettle} ${data.paymentMode}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        //create Payment out voucher 
        await paymentOutPage.createPaymentOutButton.click();
        await expect(paymentOutPage.createPaymentOutHeader).toContainText("Record Payment Out");
        await PaymentVoucherCreationUtil.createPayment(page,'testParty',data);

    });
}

for (const data of logindataset){
    test(`Validate create Payment Out from Purchase Invoice ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        const purchaseInvoicePage = poManager.getPurchasePage();
        await purchaseInvoicePage.goto();

        await salesInvoicePage.firstUnpaidinvoice.click();
        let amt = await salesInvoicePage.pdfInvoiceAmount.textContent();
        let totalAmt = parseFloat(amt.trim().replace(/[^0-9.]/g, ''));
        await purchaseInvoicePage.recordPaymentOutButton.click();
        
        expect(await salesInvoicePage.piAmountField.inputValue()).toMatch(totalAmt.toString(),{timeout: 2500});
        await salesInvoicePage.piPaymentModeDropDown.click();
        await salesInvoicePage.piBankPaymentMode.click();
        await salesInvoicePage.piPaymentReceivedInDropDown.click();
        await salesInvoicePage.piSelectPaymentReceiveIn.click()
        await salesInvoicePage.piNotesField.click();
        await salesInvoicePage.piNotesField.fill(totalAmt.toString());
        await salesInvoicePage.piSaveButton.click();

        await paymentOutPage.toast.waitFor();
        expect(await paymentOutPage.toast).toContainText("Payment created successfully",{timeout: 2500});

        
    });
}

for (const data of logindataset){
    test(`Validate Payment Out delete voucher ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const paymentOutPage = poManager.getPaymentOutPage();
        await paymentOutPage.goto();

        let voucherNumber = await paymentOutPage.firstInvoice_Number.textContent();
        await paymentOutPage.firstInvoice_Number.click();

        expect(await paymentOutPage.voucherHeader).toContainText(voucherNumber);
        await paymentOutPage.deleteVoucher.click();
        await paymentOutPage.deleteConfirm.click();
        
        await paymentOutPage.toast.waitFor();
        expect(await paymentOutPage.toast).toHaveText("Payment deleted successfully");

    });
}
}