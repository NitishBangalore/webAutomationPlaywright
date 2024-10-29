class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.dashboardLeftNavButton = page.locator('#left-nav-body').getByText('Dashboard');
        this.dashboardHeader = page.locator('#header').getByText('Dashboard', { exact: true });
        this.businessName = page.locator("(//*[contains(@class,'profile-container')]//mbb-typography)[1]");
        this.shareSuggestionButton = page.getByRole('button', { name: 'Share Suggestion' });
        this.chatSupportButton = page.locator('text=Chat Support Alt + H');
        this.appSupportChatWidget = page.frameLocator('iframe[name="fc_widget"]').getByRole('heading', { name: 'My BillBook Web App Support' });
        this.closeAppsupportWidget = page.frameLocator('iframe[name="fc_widget"]').getByRole('button', { name: 'Close widget' });
        this.automatedBillingText = page.locator('text=Now Automate billing, reminders and payments end-to-end');
        this.automatedBillingImg = page.locator('.dashboard-card.position-relative.bg-automated-bill div:nth-child(2) img');
        this.toCollectText = page.locator('text=To Collect');
        this.toPayText = page.locator('text=To Pay');
        this.totalCashandBankBalanceText = page.getByText('Total Cash + Bank Balance');
        this.latestTransactions = page.locator('text=Latest Transactions');
        this.gotItText = page.locator('text=Got It');
        this.doneText = page.locator('text=Done');
        this.nextText = page.locator('button:has-text("Next")');
        this.finishText = page.locator('text=Finish');
        this.salesReportDropDownButton = page.locator('#dashboard-container #dropdownMenuButton >> text=Daily');
        this.weeklyReportText = page.locator('a:has-text("Weekly")');
        this.last7daysSalesText = page.locator('text=Last 7 days sales');
        this.last4weeksSalesText = page.locator('text=Last 4 week sales');
        this.date = page.locator('th:has-text("DATE")');
        this.type = page.locator('th:has-text("TYPE")');
        this.transaction = page.locator('text=TXN NO');
        this.partyName = page.locator('text=PARTY NAME');
        this.amount = page.locator('th:has-text("AMOUNT")');
        this.salesInvoice = page.locator('td:has-text("Sales Invoice")').first();
        this.partyLeftNavBar = page.locator('text=parties');
        this.toCollectAmount = page.locator("(//div[@class='heading-amount'])[1]");
        this.toPayAmount = page.locator("(//div[@class='heading-amount'])[2]");
        this.totalCashandBankAmount = page.locator("(//div[@class='heading-amount'])[3]");
        this.voucherCount = page.locator("//div[@featurename='view_sales_graph']/div[2]/div[2]/div[5]");
        this.seeAllTransactionbutton = page.locator('td:has-text("See All Transactions")');
        this.allTransactions = page.locator('div:has-text("all transactions")');
        this.secondInvoiceNumber = page.locator('#mbb-table-body tr:nth-child(2) td:nth-child(2)');
        this.searchInvoiceIcon = page.locator("mbb-search");
        this.searchInvoiceInputField = page.locator("mbb-input-field input");
        this.firstInvoiceNumber = page.locator('#mbb-table-body tr:nth-child(1) td:nth-child(2)');
        
        this.companyLogo = page.locator("//*[@class='company-logo' or @class='my-avatar']");
        this.secondBusiness = page.locator("//*[@class='company-list']//*[contains(text(),'Clean Business')]");

    }

    async switchBusiness(index) {
        await this.companyLogo.click();
        let classAttribute = await this.page.locator("//*[@class='company-list']//mbb-tooltip["+index+"]//label").getAttribute('class');
        if(classAttribute.includes('selected')){
            await this.companyLogo.click();
        }
        else{
            await this.page.locator("//*[@class='company-list']//mbb-tooltip["+index+"]//label").click();
            await this.page.waitForLoadState('domcontentloaded');
            try{
                await this.page.waitForSelector('div.table-responsive',{timeout: 5000});
            }
            catch{
                await this.dashboardLeftNavButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForSelector('div.table-responsive');
            }
        }
    }

    /*
    compoany with godown, batch, serialisation enabled : 1
    company with godown, batch, serialisation disabled : 2
    */
}
module.exports = { DashBoardPage };