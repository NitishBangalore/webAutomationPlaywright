class PurchasePage {
    constructor(page) {
        this.page = page;
        this.purchaseSideNav = page.locator("//mbb-left-nav-option//*[contains(text(),'Purchases')]");
        this.createPurchaseButton = page.locator("//mbb-button//*[contains(text(),'Create Purchase')]");
        this.gotItButton = page.locator('text=Got It');
        this.purchaseInvoicesHeader = page.locator(".title.d-flex.align-items-center");
        this.emptyPurchasePageText = page.locator("div[class='d - flex justify - content - start mt - 3'] span");
        this.keyboardShortCut = page.locator('img[src="assets / icons / shortcut - icon.svg"]');
        this.purchaseInvoiceNumberHeader = page.locator("//*[@class='voucher-table-container']//thead//th[2]");
        this.partyName = page.locator("//*[@class='voucher-table-container']//thead//th[3]");
        this.dueInHeader = page.locator("//*[@class='voucher-table-container']//thead//th[4]");
        this.amountHeader = page.locator("//*[@class='voucher-table-container']//thead//th[5]");
        this.keyboardShortcutsButton = page.locator("//*[@name='ic-keyboard-0-2']");
        this.keyboardShortcutText = page.locator("//div[normalize-space()='Keyboard shortcuts']");
        this.createText = page.locator("//mbb-button//*[contains(text(),'Create')]");
        this.closeKeyboardShortcutButton = page.locator("//i[@class='material-icons cursor-pointer']");
        this.searchInvoiceButton = page.locator("//mbb-search//button");
        this.searchPurchaseInvoice = page.getByPlaceholder('Search Purchase Invoice');
        this.searchInvoiceNumber = page.locator("(//td[@class='col-2'][normalize-space()='2'])[1]");
        this.dateFilterButton = page.locator("//*[@class='mbb-datepicker-container']");
        this.dateToday = page.locator("//div[@class='range-view d-block']//div[@class='title'][normalize-space()='Today']");
        this.dateYesterday = page.locator("//div[@class='range-view d-block']//div[@class='title'][normalize-space()='Yesterday']");
        this.dateThisMonth = page.locator("//div[@class='range-view d-block']//div[@class='title'][normalize-space()='This Month']");
        this.newUserPurchase = page.locator("//span[contains(text(),'No Purchase Invoice made during the selected time ')]");
        this.invoiceHeader = page.locator("//*[@class='header']//*[contains(text(),'Purchase Invoice')]");
        this.invoiceDueDate = page.locator("//div[contains(text(),'Due in')]");
        this.keyboardShortcutInvoiceView = page.locator("//img[@src='assets/icons/shortcut-icon.svg']");
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
        this.yesDeleteButton = page.locator("//div[@class='modal modal-backdrop in']//button[@class='btn-delete'][normalize-space()='Yes, Delete']");
        this.printButton = page.locator("//*[contains(text(),'Print PDF')]");
        this.printDropDown = page.locator("(//*[@class='suffix overlay'])[2]");
        this.printThermalButton = page.locator("//*[contains(text(),'Print Thermal')]");
        this.downloadPdfButton = page.locator("//*[contains(text(),'Download PDF')]");

        this.invoiceFirst = page.locator("//tbody[@id='mbb-table-body']/tr[1]");
        this.invoice20 = page.locator("//tbody[@id='mbb-table-body']/tr[20]/td[2]");

        //pdf locators 
        this.companyName = page.frameLocator('#invoice-preview-iframe').locator('#company-name');
        this.taxInvoiceHeader = page.frameLocator('#invoice-preview-iframe').getByText('TAX INVOICE');
        this.orignalForReciept = page.frameLocator('#invoice-preview-iframe').getByText('Original for Recipient');
        this.companyLogo = page.frameLocator('#invoice-preview-iframe').locator('#company-logo');
        this.companyPhoneNumber = page.frameLocator('#invoice-preview-iframe').locator('#company-mobile-number');
        this.pdfCompanyAddress = page.frameLocator('#invoice-preview-iframe').locator('#company-address');
        this.pdfInvoiceNumber = page.frameLocator('#invoice-preview-iframe').locator('#invoice-number');
        this.pdfInvoiceDate = page.frameLocator('#invoice-preview-iframe').locator('#invoice-date');
        this.pdfInvoiceDueDate = page.frameLocator('#invoice-preview-iframe').locator('#invoice-due-date');
        this.pdfBillTo = page.frameLocator('#invoice-preview-iframe').getByText('BILL TO');
        this.pdfShipTo = page.frameLocator('#invoice-preview-iframe').getByText('SHIP TO');
        this.pdfBillTocompanyName = page.frameLocator('#invoice-preview-iframe').locator('#bill-to-company-name');
        this.ShipToCompanyName = page.frameLocator('#invoice-preview-iframe').locator('#ship-to-company-name');
        this.pdfItems = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'ITEMS' });
        this.pdfHSN = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'HSN' });
        this.pdfQuantity = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'QTY.' });
        this.pdfRate = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'RATE' });
        this.pdfTax = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'TAX' });
        this.pdfAmount = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'AMOUNT' });
        this.pdfSubtotal = page.frameLocator('#invoice-preview-iframe').getByRole('cell', { name: 'SUBTOTAL', exact: true });
        this.pdfBankDetails = page.frameLocator('#invoice-preview-iframe').getByText('BANK DETAILS');
        this.pdfTermsAndCondition = page.frameLocator('#invoice-preview-iframe').getByText('TERMS AND CONDITIONS');
        this.pdfTotalAmount = page.frameLocator('#invoice-preview-iframe').getByRole('cell', { name: 'TOTAL AMOUNT', exact: true });
        this.pdfTotalAmountinWords = page.frameLocator('#invoice-preview-iframe').getByText('Total Amount (in words)');
        this.BillFrom = page.frameLocator('#invoice-preview-iframe').getByText('BILL FROM');
        this.ShipFrom = page.frameLocator('#invoice-preview-iframe').getByText('SHIP FROM');
        this.spinButton = page.getByRole('spinbutton');
        this.addNewSerialNumberButton = page.getByRole('cell', { name: '+ Add New Serial Number' });
        this.addNewSerialNumberButtonInput = page.locator("//*[@id='serial-0']");
        this.addNewSerialNumberButtonInputValue = page.getByPlaceholder('Enter Serial Number ex - SR1231AGHTX');

        this.recordPaymentOutButton = page.locator("//mbb-button//*[contains(text(),'Record Payment Out')]");
        this.pdfInvoiceNumber = page.frameLocator('#invoice-preview-iframe').locator("//div[@id='invoice-number']");

        //createinvoice
        this.serialNumberModalSave = page.locator("//app-add-serial-numbers-modal//*[contains(text(),'Save')]").first();
        this.notificationToast = page.locator("//*[@role='alert']");

        //paymentout
    }


    async goto() {
        await this.purchaseSideNav.click();
        try{
            await this.gotItButton.click({timeout:5000});
        }
        catch{}
    }

    async scroll2Page(){
        await mouse.move(0,0);
        await mouse.wheel(0, 200);
    }
}
module.exports = { PurchasePage };
