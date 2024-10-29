class PaymentInPage {
    constructor(page) {
        this.page = page;
        this.leftNavSalesBtn = page.getByTestId('left-nav-body').getByText('Sales');
        this.leftNavPaymentInBtn = page.getByTestId('left-nav-body').getByText('payment in');
        //Dashboard
        this.gotItText = page.locator('text=Got It');
        this.pageHeader = page.locator("//mbb-screen-header//mbb-typography/div").first();
        this.createPaymentInButton = page.locator("//button//*[contains(text(),'Create Payment In')]");
        this.invoiceSettingsButton = page.locator("//mbb-screen-header//*[@name='ic-settings-outlined']");
        this.dateColumn = page.locator("//th[1]/mbb-typography");
        this.PaymentNumberColumn = page.locator("//th[2]/mbb-typography");
        this.PartyNameColumn = page.locator("//th[3]/mbb-typography");
        this.DueInColumn = page.locator("//th[normalize-space()='Due In']");
        this.AmountColumn = page.locator("//th[4]/mbb-typography");
        this.keyboardShortcutsButton = page.locator("//*[@name='ic-keyboard-0-2']");
        this.voucherFirst_number = page.locator("//tbody[@id='mbb-table-body']//tr[1]//td[2]");
        //search
        this.invoiceFirst = page.locator("//tbody[@id='mbb-table-body']/tr[1]");
        this.searchInvoiceButton = page.locator("//mbb-search//button");
        this.searchPaymentIn = page.locator("//input[@placeholder='Search Payment In']");
        this.searchInvoiceNumber = page.locator("//td[@class='col-2'][normalize-space()='1']");
        this.lastVoucher = page.locator("//tbody[@id='mbb-table-body']/tr/td[2]").nth(-1);
        //Date Filter 
        this.dateFilterButton = page.locator("//section[@class='mbb-datepicker-container']");
        this.dateFilterToday = page.getByText('Today').first();
        this.dateFilterYesterday = page.getByText('Yesterday').first();;
        this.dateFilterThisWeek = page.locator("div[class='range-view d-block'] div:nth-child(4) div:nth-child(1)");
        this.dateFilterLast7Days = page.locator("div[class='range-view d-block'] div:nth-child(4) div:nth-child(1)");
        this.dateFilterThisMonth = page.locator("div[class='range-view d-block'] div:nth-child(5) div:nth-child(1)");
        this.dateFilterLast365Days = page.locator("div[class='range-view d-block'] div:nth-child(10) div:nth-child(1)");
        //createPaymentIn
        this.createPaymentInHeader = page.locator("//div[@class='text-xlarge d-flex']");
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
        this.invoiceAmount = page.locator("//tr[1]/td[5]");
        this.invoiceAmountPaid = page.locator("//tr[1]/td[6]/span");
        this.paymentModeDropDown = page.locator("//*[contains(text(),'Payment Mode')]//parent::div//*[@class='mbb-dropdown-container']");
        this.cashPaymentMode = page.locator("//*[@class='mbb-dropdown-list']//*[contains(text(),'Cash')]");
        this.bankPaymentMode = page.locator("//*[@class='mbb-dropdown-list']//*[contains(text(),'Bank')]");
        this.chequePaymentMode = page.locator("//*[@class='mbb-dropdown-list']//*[contains(text(),'Cheque')]");
        this.paymentRecievedInDropdown = page.locator("//*[contains(text(),'Payment Received') or contains(text(),'Payment Deducted')]//parent::div//*[@class='mbb-dropdown-container']");
        this.selectPaymentReceiveIn = page.locator("//*[@class='mbb-dropdown-list']/div").first();
        this.notes = page.locator("//*[@id='payment-notes']");
        this.saveInvoice = page.locator("//button[@type='button'][normalize-space()='Save']");
        this.firstVoucherInList_Number = page.locator("//tbody/tr[1]/td[4]");
        this.firstVoucherInList_AmountPending = page.locator("//tbody/tr[1]/td[5]/span");
        this.firstInvoiceSettle = page.locator("//tr[1]/td[1]//label")
        this.saveInvoice = page.locator("//mbb-button//*[contains(text(),'Save')]");
        this.toast = page.locator("//*[@role='alert']");

        //Invoice View
        this.invoiceHeader = page.locator("//div[@id='header']/div[1]");
        this.deleteVoucher = page.locator("//button//*[@name='ic-delete']");
        this.deleteConfirm = page.getByRole('button',{name:'Yes, Delete'});
        
    }

    async goto() {
        try{
            await this.leftNavSalesBtn.click();
            await this.gotItText.click();
            await this.leftNavPaymentInBtn.click();
            await this.gotItText.click({timeout:2000});
        }
        catch{}
    }
    
    async getPendingAmount(){
        let pending = (await this.firstVoucherInList_AmountPending.textContent()).trim();
        let pendingAmt = pending.replace(/[^0-9.]/g, '');
        return pendingAmt;
    }


}

module.exports = { PaymentInPage };