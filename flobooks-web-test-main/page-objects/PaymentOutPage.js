class PaymentOutPage {
    constructor(page) {
        this.page = page;
        this.leftNavPurchaseBtn = page.getByTestId('left-nav-body').getByText('Purchase');
        this.leftNavPaymentOutBtn = page.getByTestId('left-nav-body').getByText('payment out');
        //Dashboard
        this.gotItText = page.locator('text=Got It');
        this.pageHeader = page.locator("//mbb-screen-header//mbb-typography/div").first()
        this.pageHeaderText = page.locator("//div[normalize-space()='Record receipts for payments made to your suppliers']");
        this.createPaymentOutButton = page.locator("//button//*[contains(text(),'Create Payment Out')]");
        this.invoiceSettingsButton = page.locator("//mbb-screen-header//*[@name='ic-settings-outlined']");
        this.dateColumn = page.locator("//th[1]/mbb-typography");
        this.PaymentNumberColumn = page.locator("//th[2]/mbb-typography");
        this.PartyNameColumn = page.locator("//th[3]/mbb-typography");
        this.AmountColumn = page.locator("//th[4]/mbb-typography");
        this.firstInvoice_Number = page.locator("//tbody[@id='mbb-table-body']/tr[1]/td[2]");
        this.firstInvoice_PartyName = page.locator("//tbody[@id='mbb-table-body']/tr[1]/td[3]");
        this.firstInvoice_InvoiceDate = page.locator("//tbody[@id='mbb-table-body']/tr[1]/td[1]");
        this.firstInvoice_Amount = page.locator("//tbody[@id='mbb-table-body']/tr[1]/td[4]");

        //search
        this.invoiceFirst = page.locator("//tbody[@id='mbb-table-body']/tr[1]");
        this.searchInvoiceButton = page.locator("//mbb-search//button");
        this.searchPaymentOut = page.locator("//input[@placeholder='Search Payment Out']");
        this.searchInvoiceNumber = page.locator("//td[@class='col-2'][normalize-space()='1']");
        this.lastVoucher = page.locator("//tbody[@id='mbb-table-body']/tr/td[2]").nth(-1);
        //Date Filter 
        this.dateFilterButton = page.locator("//div[@class='date-picker-label cursor-pointer width-280']//img");
        this.dateFilterToday = page.locator("div[class='range-view d-block'] div:nth-child(1) div:nth-child(1)");
        this.dateFilterYesterday = page.locator("div[class='range-view d-block'] div:nth-child(2) div:nth-child(1)");
        this.dateFilterThisWeek = page.locator("div[class='range-view d-block'] div:nth-child(4) div:nth-child(1)");
        this.dateFilterLast7Days = page.locator("div[class='range-view d-block'] div:nth-child(4) div:nth-child(1)");
        this.dateFilterThisMonth = page.locator("div[class='range-view d-block'] div:nth-child(5) div:nth-child(1)");
        this.dateFilterLast365Days = page.locator("div[class='range-view d-block'] div:nth-child(10) div:nth-child(1)");
        //createPaymentOut
        this.createPaymentOutHeader = page.locator("(//*[contains(@class,'mbb-screen-header')]//mbb-typography)[1]");
        this.partyNameText = page.locator("//body/app-root/div[@class='position-relative']/div[@class='d-flex h-100']/div[@class='position-relative width-82']/app-home/app-payments/div[@id='payment-container']/div[@id='body']/div[@class='form-container']/div[@class='d-flex']/div[@class='section w-50 border-right-0']/div[@class='party-selection']/label[1]");
        this.partySearchBar = page.locator("//*[@labelfield='name']");
        this.selectParty = page.locator("(//div[contains(@class,'mbb-dropdown-list')]//mbb-typography)[1]");
        this.currentPartyBalanceText = page.locator("Current Party Balance");
        this.currentPartyBalaceAmount = page.locator("//span[@class='ml-1 text-red']");
        this.EnterPaymentAmountText = page.locator("//div[@class='label']");
        this.enterpaymentAmountInput = page.locator("//input[@id='amount-field']");
        this.paymentDate = page.locator("//label[normalize-space()='Payment Date']");
        this.paymentMode = page.locator("//label[normalize-space()='Payment Mode']");
        this.paymentInNumber = page.locator("//label[normalize-space()='Payment In Number']");
        this.invoiceAmount = page.locator("(//td[contains(text(),'₹1,770')])[1]");
        this.invoiceAmountPaid = page.locator("//span[@class='ml-2']");
        this.paymentModeDropDown = page.locator("//div[@class='payment-type-selection w-35 ml-3']//div//mbb-dropdown-icon//*[name()='svg']");
        this.cashPaymentMode = page.locator("div[class='section w-50'] li:nth-child(1) a:nth-child(1) span:nth-child(1)");
        this.bankPaymentMode = page.locator("div[class='section w-50'] li:nth-child(2) a:nth-child(1) span:nth-child(1)");
        this.chequePaymentMode = page.locator("div[class='section w-50'] li:nth-child(3) a:nth-child(1) span:nth-child(1)");
        this.paymentRecievedInText = page.locator("//label[normalize-space()='Payment Received In']");
        this.paymentRecievedInDropdown = page.locator("//div[@class='w-35 ml-3']//mbb-dropdown-icon//*[name()='svg']");
        this.selectPaymentReceiveIn = page.locator("//span[normalize-space()='Business Account']");
        this.notes = page.locator("//textarea[@placeholder='Enter notes']");
        this.firstInvoiceSettle = page.locator("(//*[name()='svg'])[15]");
        this.saveInvoice = page.locator("//button[@type='button'][normalize-space()='Save']");

        //Payment out Voucher View 
        this.voucherHeader = page.locator("//div[@id='header']/div[1]");
        this.partyName = page.locator("//label[normalize-space()='PARTY NAME']/following-sibling::div");
        this.paymentDate = page.locator("//label[normalize-space()='PAYMENT DATE']/following-sibling::div");
        this.paymentAmount = page.locator("//label[normalize-space()='PAYMENT AMOUNT']/following-sibling::div");
        this.paymentType = page.locator("//label[normalize-space()='PAYMENT TYPE']");
        this.settlementText = page.locator("//div[contains(text(),'Invoices settled with this payment')]");
        this.notes = page.locator("//label[normalize-space()='NOTES']");
        this.date = page.locator("//label[normalize-space()='PAYMENT DATE']");
        this.invoiceNumber = page.locator("//th[normalize-space()='INVOICE NUMBER']");
        this.clickLinkedInvoice_first = page.locator("//tbody//tr[1]");
        this.deleteVoucher = page.locator("//button//*[@name='ic-delete']");
        this.deleteConfirm = page.getByRole('button',{name:'Yes, Delete'});
        this.linkedVoucherNumber_first = page.locator("//tr[1]//td[2]");

        this.toast = page.locator("//div[@role='alert']");
    }

    async goto() {
        try{
            await this.leftNavPurchaseBtn.click();
            await this.gotItText.click();
            await this.leftNavPaymentOutBtn.click();
            await this.gotItText.click({timeout:2000});
        }
        catch{}
    }
}

module.exports = { PaymentOutPage };