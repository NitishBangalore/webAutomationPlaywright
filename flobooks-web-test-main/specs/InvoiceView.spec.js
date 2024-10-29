import { InvoiceViewUtil } from '../resources/utils/InvoiceViewUtil.js';

const { test } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const {ThemeUtils} = require('../resources/utils/ThemeUtils.js');


export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Invoice View for Stylish theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Stylish';
        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemCess();
            await salesInvoicePage.validateItemTax();
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();

        await salesInvoicePage.validateTotalItemTax();
        await salesInvoicePage.validateTotalItemCess();
        await salesInvoicePage.validateTotalAmount();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Advanced GST (Tally) theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Advanced GST (Tally)';
        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();

        await salesInvoicePage.validateTotalAmount();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Advanced GST theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();
        let theme = 'Advanced GST';

        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemCess();
            await salesInvoicePage.validateItemTax();
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();

        await salesInvoicePage.validateTotalAmount();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Billbook theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Billbook';
        await ThemeUtils.changeTheme(page, theme);

        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount-1; i++){      //Billbook has an extra item quantity row with null values
            await salesInvoicePage.validateItemAmountBillbook(i);
        }

        await salesInvoicePage.validateTotalInvoiceAmountBillbook();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Advanced GST(A5) theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Advanced GST(A5)';
        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemRate.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemCess();
            
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();

        await salesInvoicePage.validateTotalItemCess();

        await salesInvoicePage.validateTotalAmountGSTA5();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Billbook(A5) theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Billbook(A5)';
        await ThemeUtils.changeTheme(page, theme);

        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount; i++){
            await salesInvoicePage.validateItemAmountBillbook(i);
        }

        await salesInvoicePage.validateTotalInvoiceAmountBillbook();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Modern theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();

        let theme = 'Modern';
        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemCess();
            await salesInvoicePage.validateItemTax();
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();
        await salesInvoicePage.validateTotalItemTax();
        await salesInvoicePage.validateTotalItemCess();

        await salesInvoicePage.validateTotalAmount();
    });
}

for (const data of logindataset) {
    test(`Validate Invoice View for Simple theme ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const salesInvoicePage = poManager.getSalesInvoicePage();
        await salesInvoicePage.gotoSalesIndexPage();
        
        let theme = 'Simple';
        await ThemeUtils.changeTheme(page, theme);
    
        await InvoiceViewUtil.openInvoice(page, '1');

        let itemCount = await salesInvoicePage.pdfItemQuantity.count();
        for(let i =0; i<itemCount ; i++){
            await salesInvoicePage.assignItemTableValue(i,theme);
            if(salesInvoicePage.itemDiscountAmount > 0){
                await salesInvoicePage.validateItemDiscount();
            }
            await salesInvoicePage.validateItemCess();
            await salesInvoicePage.validateItemTax();
        
            await salesInvoicePage.validateItemAmount();
        }

        await salesInvoicePage.assignInvoiceTableValues(theme);

        await salesInvoicePage.validateTotalItemDiscount();
        await salesInvoicePage.validateTotalItemTax();
        await salesInvoicePage.validateTotalItemCess();

        await salesInvoicePage.validateTotalAmount();
    });
}


}
