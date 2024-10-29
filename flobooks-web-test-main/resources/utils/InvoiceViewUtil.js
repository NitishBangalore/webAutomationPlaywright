const { POManager } = require("../../page-objects/POManager");

class InvoiceViewUtil{

    async getTaxType(){
        const poMonager = new POManager(page);
        const salesInvoicePage = poMonager.getSalesInvoicePage();

        const indianUTs = ["Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli & Daman & Diu","Lakshadweep","Delhi","Puducherry","Ladakh","Jammu & Kashmir"];
        let taxType = null;
        let address = await salesInvoicePage.companyAddress.textContent();
        let companyState = address.match(/(\w+)(?=,?\s*\d{6}$)/)[0];

        let partyState = await salesInvoicePage.pdfPartyAddress.textContent();

        if(companyState == partyState){
            if(indianUTs.includes(companyState)){
                taxType = 1;    // UTGST + CGST
            }
            else taxType = 2;   // SGST + CGST
        }
        else taxType = 3;       // IGST

        return taxType;
    }

    static async openInvoice(page,serialNumber){
        const poMonager = new POManager(page);
        const salesInvoicePage = poMonager.getSalesInvoicePage();

        await salesInvoicePage.searchInvoiceButton.click();
        await salesInvoicePage.searchSalesInvoice.fill(serialNumber);
        await page.waitForTimeout(1500);
        await salesInvoicePage.openFirstInvoice.click();
        await page.waitForLoadState('domcontentloaded');
        await salesInvoicePage.companyName.waitFor();
    }

}
module.exports =  { InvoiceViewUtil };