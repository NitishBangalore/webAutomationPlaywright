const { expect } = require('@playwright/test');
const { POManager } = require("../../page-objects/POManager");

class ThemeUtils{

    static async changeTheme(page,theme){
        let poMonager = new POManager(page);
        let salesInvoicePage = poMonager.getSalesInvoicePage();

        await salesInvoicePage.indexInvoiceSetting.click();
        let currentTheme = (await salesInvoicePage.currentTheme.textContent()).trim();

        if(currentTheme != theme){
            await salesInvoicePage.themeDropDown.click();
            await page.waitForTimeout(1500);
            await page.getByTestId("dropdown-menu").getByText(theme,{exact: true}).click();
            await salesInvoicePage.invoiceSettingsSaveButton.isEnabled();
            await page.waitForTimeout(1500);
            await salesInvoicePage.invoiceSettingsSaveButton.click({timeout:5000});
        }
        else{
            await salesInvoicePage.invoiceSettingsCancelButton.click();
        }
    }
}
module.exports =  { ThemeUtils };