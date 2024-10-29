const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const SalesInvoiceStrings = require('../constants/SalesInvoiceStrings');
const {InvoiceCreationUtil} = require('../resources/utils/InvoiceCreationUtil.js');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const newUserLoginDataset = JSON.parse(JSON.stringify(require('../resources/newUserValidLogin.json')))
const addDiscountDataset = JSON.parse(JSON.stringify(require('../resources/addDiscount.json')))

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
     test(`Validate Create Sales invoice page elements for  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();

        await expect(salesInvoicePage.createSalesInvoiceHeader).toContainText(SalesInvoiceStrings.CREATE_SALES_INVOICE);
        await expect(salesInvoicePage.BillToText).toContainText(SalesInvoiceStrings.BILL_TO);
        await expect(salesInvoicePage.setCashAsDefaultCheckBox).toContainText(SalesInvoiceStrings.CASH_DEFAULT);
        await expect(salesInvoicePage.addPartyButton).toContainText(SalesInvoiceStrings.ADD_PARTY);
        await expect(salesInvoicePage.salesInvoiceNumber).toContainText(SalesInvoiceStrings.SALES_INVOICE_NUMBER);
        await expect(salesInvoicePage.salesInvoiceDate).toContainText(SalesInvoiceStrings.SALES_INVOICE_DATE);
        await expect(salesInvoicePage.paymentTerms).toContainText(SalesInvoiceStrings.PAYMENT_TERMS);
        await expect(salesInvoicePage.dueDate).toContainText(SalesInvoiceStrings.DUE_DATE);
        await expect(salesInvoicePage.itemNoText).toContainText(SalesInvoiceStrings.ITEM_NO);
        await expect(salesInvoicePage.itemsServiceText).toContainText(SalesInvoiceStrings.ITEMS_SERVICES);
        await expect(salesInvoicePage.hsnSacText).toContainText(SalesInvoiceStrings.HSN_SAC);
        await expect(salesInvoicePage.quantityText).toContainText(SalesInvoiceStrings.QUANTITY);
        await expect(salesInvoicePage.priceItemText).toContainText(SalesInvoiceStrings.PRICE_ITEM);
        await expect(salesInvoicePage.taxText).toContainText(SalesInvoiceStrings.TAX);
        await expect(salesInvoicePage.amountText).toContainText(SalesInvoiceStrings.AMOUNT);
        await expect(salesInvoicePage.addColumnsButtom).toBeVisible();
        await expect(salesInvoicePage.scanBarcode).toBeVisible();
        await expect(salesInvoicePage.subtotalText).toContainText(SalesInvoiceStrings.SUBTOTAL);
        await expect(salesInvoicePage.addNotesButton).toBeVisible();
        await expect(salesInvoicePage.termsAndConditionHeader).toContainText(SalesInvoiceStrings.TERMS_AND_CONDITION);
        await expect(salesInvoicePage.termsAndConditionText).toBeVisible();
        await expect(salesInvoicePage.taxableAmountHeader).toContainText(SalesInvoiceStrings.TAXABLE_AMOUNT);
        await expect(salesInvoicePage.autoRoundOffcheckBox).toBeVisible();
        await expect(salesInvoicePage.amountRecieved).toContainText(SalesInvoiceStrings.AMOUNT_RECEIVED);
        await expect(salesInvoicePage.balanceAmount).toContainText(SalesInvoiceStrings.BALANCE_AMOUNT);
        await expect(salesInvoicePage.signatureText).toContainText(SalesInvoiceStrings.SIGNATURE_TEXT);

    });
}

for (const data of logindataset) {
     test(`Validate sales invoice party search with party details ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
         
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.dashboardLeftNavButton.click();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();
        await salesInvoicePage.addPartyButton.click();
        await salesInvoicePage.searchParty.fill(SalesInvoiceStrings.PARTY_NAME);
        await salesInvoicePage.partySearchNameResult.click();
        await expect(salesInvoicePage.billAddress).toBeVisible();
        await expect(salesInvoicePage.billPhoneNumber).toBeVisible();
        await expect(salesInvoicePage.billPanNumber).toBeVisible();
        await expect(salesInvoicePage.billGST).toBeVisible();
    });
}

for (const data of logindataset) {
     test(`Validate create a new sales invoice${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();
        
        await InvoiceCreationUtil.openItemModal(page);      //this will add party and open add item modal

        await expect(salesInvoicePage.itemSalesPrice).toBeVisible();
        await expect(salesInvoicePage.itemPurchasePrice).toBeVisible();
        await expect(salesInvoicePage.itemCurrentStock).toBeVisible();
        await salesInvoicePage.searchItemField.click();
        await salesInvoicePage.searchItemField.fill(SalesInvoiceStrings.ITEM_NAME);
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
        await salesInvoicePage.closeToastButton.click();
        await expect(salesInvoicePage.downloadPdfButton).toBeVisible();
        await expect(salesInvoicePage.printButton).toBeVisible();

    });
}

for (const data of logindataset) {
     test(`Validate pdf components ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();

        await InvoiceCreationUtil.openItemModal(page);      //this will add party and open add item modal

        await salesInvoicePage.searchItemField.click();
        await salesInvoicePage.searchItemField.fill(SalesInvoiceStrings.ITEM_NAME);
        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.addItemGodownPopUp.click();
        await salesInvoicePage.saveItemButton.click();
        await salesInvoicePage.itemDoneButton.click();
        await salesInvoicePage.saveSalesVoucher.click();
        //pdf validations 
        await expect(salesInvoicePage.taxInvoiceHeader).toBeVisible();
        await expect(salesInvoicePage.companyName).toBeVisible();
        await expect(salesInvoicePage.companyLogo).toBeVisible();
        await expect(salesInvoicePage.companyAddress).toBeVisible();
        await expect(salesInvoicePage.companyPhoneNumber).toBeVisible();
        await expect(salesInvoicePage.InvoiceNo).toBeVisible();
        await expect(salesInvoicePage.InvoiceDate).toBeVisible();
        await expect(salesInvoicePage.InvoiceDueDate).toBeVisible();
        await expect(salesInvoicePage.BillTo).toBeVisible();
        await expect(salesInvoicePage.ShipTo).toBeVisible();
        await expect(salesInvoicePage.BillTocompanyName).toContainText(SalesInvoiceStrings.PARTY_NAME);
        await expect(salesInvoicePage.ShipToCompanyName).toContainText(SalesInvoiceStrings.PARTY_NAME);
        await expect(salesInvoicePage.pdfItems).toBeVisible();
        await expect(salesInvoicePage.pdfHSN).toBeVisible();
        await expect(salesInvoicePage.pdfQuantity).toBeVisible();
        await expect(salesInvoicePage.pdfRate).toBeVisible();
        await expect(salesInvoicePage.pdfTax).toBeVisible();
        await expect(salesInvoicePage.pdfAmount).toBeVisible();
        await expect(salesInvoicePage.pdfSubtotal).toBeVisible();
        await expect(salesInvoicePage.pdfBankDetails).toBeVisible();
        await expect(salesInvoicePage.pdfTermsAndCondition).toBeVisible();
        await expect(salesInvoicePage.pdfTotalAmount).toBeVisible();
        await expect(salesInvoicePage.pdfTotalAmountinWords).toBeVisible();
    });
}

for (const data of newUserLoginDataset) {
     test.skip(`Validate sales invoice page for new user  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await page.waitForSelector('div.table-responsive');

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();
        // await expect(salesInvoicePage.salesInvoicePageHeader).toBeVisible();
        await expect(salesInvoicePage.salesInvoicePageSubHeader).toContainText(SalesInvoiceStrings.SALES_INVOICE_SUB_HEADER);
        await expect(salesInvoicePage.newUserSalesInvoice).toContainText(SalesInvoiceStrings.NEW_USER_SALES_INVOICE_PAGE_TEXT);

    });
}

for (const data of logindataset) {
     test(`Validate change date range  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        await salesInvoicePage.gotItText.click();

        await salesInvoicePage.dateDropDownButton.click();
        await salesInvoicePage.dateFilterToday.click();
        await expect(salesInvoicePage.thirtyDays).toContainText("30 Days");
        await salesInvoicePage.dateDropDownButton.click();
        await salesInvoicePage.dateFilterYesterday.click();
        await expect(salesInvoicePage.twentyNineDays).toContainText("29 Days");

    });
}

for (const data of logindataset) {
     test(`Validate download e-invoice bill ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        await salesInvoicePage.gotItText.click();

        await salesInvoicePage.searchInvoiceButton.click();
        await salesInvoicePage.searchSalesInvoice.fill('79');
        await loginPage.delay(1000);
        await salesInvoicePage.openFirstInvoice.click();
        await salesInvoicePage.downloadPdfButton.click();
        page.on('download', download => download.path().then(console.log));
    });
}

for (const data of logindataset) {
     test(`Validate change Party invoice ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();;

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

for (const data of logindataset) {
     test(`Validate change shipping address  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();;

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
     test(`Validate edit invoice prefix and suffix ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        salesInvoicePage.gotItText.click();

        await salesInvoicePage.invoiceSettingsIndexPage.click();
        //generate random prefix
        let seq = Math.random() * 10;
        try{
            await expect(salesInvoicePage.invoiceSettingsSequenceNumber).toBeVisible({timeout:3000});
        }
        catch{
            await salesInvoicePage.invoicePrefixToggle.click();
        }

        await salesInvoicePage.invoiceSettingsSequenceNumber.fill(seq.toString())

    });
}

for (const data of logindataset) {
     test(`Validate change invoice data and Due Date  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        await salesInvoicePage.gotItText.click();

        await salesInvoicePage.searchInvoiceButton.click();
        await salesInvoicePage.searchSalesInvoice.type('79');
        await salesInvoicePage.openFirstInvoice.click();
        await salesInvoicePage.editInvoiceButton.click();

    });
}

for (const data of logindataset) {
     test(`Validate batching item added to voucher   ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();;

        await InvoiceCreationUtil.openItemModal(page);      //this will add party and open add item modal

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
    });
}

for (const data of logindataset) {
     test(`Validate serialising item added to voucher   ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();;
        
        await InvoiceCreationUtil.openItemModal(page);      //this will add party and open add item modal

        //Add Serialized Item 
        await salesInvoicePage.searchItemField.click();
        await salesInvoicePage.searchItemField.fill(SalesInvoiceStrings.SERIAL_ITEM_NAME);
        await salesInvoicePage.addItemButton.click();
        var serialNumber = await salesInvoicePage.lastSerialNumber.textContent();
        await salesInvoicePage.lastSerialCheckBox.click();
        await salesInvoicePage.dialogSerialNumberSave.click();
        await salesInvoicePage.itemDoneButton.click();
        await expect(salesInvoicePage.itemSerialNumberOnVoucher).toContainText(serialNumber);

        await salesInvoicePage.saveSalesVoucher.click();

    });
}

for (const data of addDiscountDataset) {
     test(`Validate invoice calculation ${data.number} ${data.DiscountType}  ${data.AdditionalCharge} ${data.AdditionalChargeTax} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoCreateSaleInvoice();;

        await InvoiceCreationUtil.openItemModal(page);      //this will add party and open add item modal

        await salesInvoicePage.addItemButton.click();
        await salesInvoicePage.addItemGodownPopUp.click();
        await salesInvoicePage.saveItemButton.click();
        await salesInvoicePage.itemDoneButton.click();

        const taxableAmt = parseInt(data.taxableAmount.replace(/\D/g, ""));
        const sGST = parseFloat(data.SGST);
        const cGST = parseFloat(data.CGST);
        const discount = parseInt(data.DiscountValue);
        let additionalCharge = parseInt(data.AdditionalChargeValue);

        //additional charges 
        if (await data.AdditionalCharge == true) {
            await salesInvoicePage.addAdditionalChargesButton.click();
            await salesInvoicePage.addAdditionalChargesInput.fill(data.AdditionalChargeField);
            await salesInvoicePage.addAdditionalChargeValueInput.fill(data.AdditionalChargeValue);
            await salesInvoicePage.addAdditionalChargeValueDropDown.click();
            if (await data.AdditionalChargeTax == 'No tax Applicable') {
                await salesInvoicePage.noTaxApplicable.click();
            } else {
                await salesInvoicePage.gst18percent.click();
                additionalCharge = 0;
            }
        }

        //validate Discount Button Changes
        if (await data.DiscountType == 'After Tax') {
            await salesInvoicePage.addDiscountButton.click();
            await salesInvoicePage.invoiceDiscountPercent.fill(data.DiscountPercent);
            await salesInvoicePage.autoRoundOffButton.click();
            await expect(salesInvoicePage.taxableAmount).toContainText(data.taxableAmount);
            await expect(salesInvoicePage.totalAmount).toContainText(data.TotalAmount);

            //validate calculation 
            const totalAmt = (taxableAmt + sGST + cGST - discount + additionalCharge);
            const result = parseFloat(data.TotalAmount.replace(/\D/g, ""));
            await expect(result).toBe(totalAmt);

        }
        else if (await data.DiscountType == 'Before Tax') {
            await salesInvoicePage.addDiscountButton.click();
            await salesInvoicePage.discountDropDown.click();
            await salesInvoicePage.discountBeforeTax.click();
            await salesInvoicePage.invoiceDiscountPercent.fill(data.DiscountPercent);
            await salesInvoicePage.autoRoundOffButton.click();
            await expect(salesInvoicePage.taxableAmount).toContainText(data.taxableAmount);
            await expect(salesInvoicePage.totalAmount).toContainText(data.TotalAmount);

            //validate calculation 
            const totalAmt = (taxableAmt + sGST + cGST + additionalCharge);
            const result = parseInt(data.TotalAmount.replace(/\D/g, ""));
            await expect(result).toBe(totalAmt);

        }
    });
}

for (const data of logindataset){
    test(`Validate delete invoice   ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.leftNavSalesBtn.click();
        await salesInvoicePage.gotItText.click();

        await salesInvoicePage.dateDropDownButton.click();
        await salesInvoicePage.dateFilterToday.click();
        await loginPage.delay(1500);
        for (const li of await salesInvoicePage.checkBoxVoucher.all())
            await li.click();
        
    });
}
}