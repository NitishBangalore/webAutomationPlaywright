class QuotationPage {
    constructor(page) {
        this.page = page;
        this.leftNavSalesBtn = page.getByTestId('left-nav-body').getByText('Sales');
        this.leftNavQuotationBtn = page.getByTestId('left-nav-body').getByText('Quotation');
        this.QuotationPageHeader = page.locator("//mbb-screen-header//mbb-typography").first();
        this.QuotationNumber = page.locator("//th[normalize-space()='quotation Number']");
        this.newUserQuotationText = page.locator("div[class='d-flex justify-content-start mt-3'] span");
        this.searchQuotationInput = page.locator("//input[@placeholder='Search Quotations']");
        this.searchInvoiceNumber = page.locator("//td[@class='col-2'][normalize-space()='2']");
        this.gotItText = page.locator('text=Got It');
        this.dateFilterButton = page.locator("//div[@class='date-picker-label cursor-pointer width-280']//input[@type='text']");
        this.optionDropdown = page.locator("//mbb-dropdown[@placeholder='Status Categories']//mbb-dropdown-icon//*[name()='svg']");
        this.showOpenQuotation = page.locator("//div[contains(text(),'Show Open Quotations')]");
        this.showAllQuotation = page.locator("//span[normalize-space()='Show All Quotations']");
        this.showClosedQuotation = page.locator("//span[normalize-space()='Show Closed Quotations']");
        this.createQuotationButton = page.locator("//button[@class='btn btn-primary text-capitalize']");
        //invoice view
        this.createEditInvoiceHeader = page.locator("//div[@class='title text-capitalize d-flex align-items-center']//div[contains(text(),'Create')]");
        this.downloadPdfButton = page.locator("//button[@id='download-pdf-btn']");
        this.addBatchedItemButton = page.locator("//div[@id='item-20']//span[@class='btn add-button text-semi-bold w-100 font-12'][normalize-space()='+ Add']");
        this.convertToInvoice = page.locator("//button[normalize-space()='Convert To Invoice']");
        this.covertToInvoiceToastMessage = page.locator("//div[contains(@aria-label,'converted to invoice successfully')]");
        this.convertSalesInvoiceHeader = page.locator("//div[contains(@class,'title text-capitalize d-flex align-items-center')]//div[contains(text(),'Create')]");
        this.saveConvertedSalesInvoice = page.locator("//button[@class='btn-primary btn text-capitalize full save']");

    }


    async goto() {
        try{
            await this.leftNavSalesBtn.click();
            await this.gotItText.click();
            await this.leftNavQuotationBtn.click();
            await this.gotItText.click({timeout:2000});
        }
        catch{}
    }
}
module.exports = { QuotationPage };
