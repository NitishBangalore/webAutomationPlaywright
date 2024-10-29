const { expect } = require('@playwright/test');


class ReportsPage{
    constructor(page){
        this.page = page;
        this.leftNavReportsBtn = page.getByTestId('left-nav-body').getByText('Reports');
        this.reportsPageHeader = page.locator("//*[@id='reports-dashboard-container']/div[1]");

        this.allReports = page.locator("//*[@class = 'reports']");
        this.reportsTitle = page.locator("(//i)[1]/following-sibling::div[1]");
        this.backPageArrow = page.locator("(//i)[1]");

        //GST Report
        this.gstFTUX = page.locator("(//*[@class='backdrop-ftux'])[1]");
        this.gstHeader = page.locator("//*[@id='screen-header-title']/div");
        
        //Stock Summary
        this.totalStockValue = page.locator("//span[contains(text(),'Total Stock Value')]/parent::div");

        //Low stock summary
        this.itemCount = page.locator("//tbody/tr");
        this.headerLowStock = page.locator("//*[contains(text(),'Low Stock Summary')]");
    }

    async goto() {
        await this.leftNavReportsBtn.click();
        await this.page.waitForLoadState('domcontentloaded',);
        try{
            await this.gotItText.click({timeout:5000});
        }
        catch{}
        await expect(this.reportsPageHeader).toContainText(' Reports ');
    }


}



module.exports = { ReportsPage };
