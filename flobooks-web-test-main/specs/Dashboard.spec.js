const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dashboardUrl = require('../constants/dashboardUrl');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));


export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Dashboard Components for ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);
        await expect(dashboardPage.chatSupportButton).toBeVisible();
        await expect(dashboardPage.latestTransactions).toBeVisible();
        await expect(dashboardPage.toPayText).toBeVisible();
        await expect(dashboardPage.toCollectText).toBeVisible();
        await expect(dashboardPage.totalCashandBankBalanceText).toBeVisible();
    });
}

for (const data of logindataset)
    test(`validate Buttons redirection for  ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        const dashboardPage = poManager.getDashboardPage();

        // validate To Collect Button
        let toCollectAmount = "";
        toCollectAmount = await dashboardPage.toCollectAmount.innerText();
        toCollectAmount = toCollectAmount.replace(/[^\d.,]/g, '');

        await dashboardPage.toCollectText.click();
        await expect(page).toHaveURL(dashboardUrl.TOCOLLECTURL);

        await dashboardPage.gotItText.click();
        const partyPage = poManager.getPartyPage();
        await expect(partyPage.toCollectAmount).toContainText(toCollectAmount);

        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);

        // validate To Pay Button 
        let toPayAmount = "";
        toPayAmount = await dashboardPage.toPayAmount.innerText();
        toPayAmount = toPayAmount.replace(/[^\d.,]/g, '');
        await dashboardPage.toPayText.click();

        await expect(page).toHaveURL(dashboardUrl.TOPAYURL);
        await expect(partyPage.toPayAmount).toContainText(toPayAmount);

        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);

        //validate Cash and Bank Balance 
        let totalCashandBankAmount = "";
        totalCashandBankAmount = await dashboardPage.totalCashandBankAmount.innerText();
        totalCashandBankAmount = totalCashandBankAmount.replace(/[^\d.,]/g, '');
        await dashboardPage.totalCashandBankBalanceText.click();

        const cashandBankPage = poManager.getCashandBankPage();
        await cashandBankPage.multipleAccountModalClose.click();
        // Click button:has-text("Next")
        await dashboardPage.nextText.click();
        // Click text=Finish
        await dashboardPage.finishText.click();
        await expect(cashandBankPage.totalBalance).toContainText(totalCashandBankAmount);
        await expect(page).toHaveURL(dashboardUrl.CASHANDBANKURL);
        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);

    });

for (const data of logindataset)
    test(`validate graph for   ${data.number}`, async ({ page }) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);

        await expect(dashboardPage.last7daysSalesText).toBeVisible();
        let vouchersCount1 = "";
        vouchersCount1 = await (dashboardPage.voucherCount.innerText());
        await dashboardPage.salesReportDropDownButton.click();
        await dashboardPage.weeklyReportText.click();
        await expect(dashboardPage.last4weeksSalesText).toBeVisible();
        let vouchersCount2 = "";

        await loginPage.delay(1000);
        vouchersCount2 = await (dashboardPage.voucherCount.innerText());

        if (parseInt(vouchersCount1) > parseInt(vouchersCount2)) {
            test.fail();
        }
    });


for (const data of logindataset)
    test(`validate transaction table  ${data.number}`, async ({ page }) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.dashboardLeftNavButton.click();
        await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);

        await expect(dashboardPage.date).toBeVisible();
        await expect(dashboardPage.type).toBeVisible();
        await expect(dashboardPage.transaction).toBeVisible();
        await expect(dashboardPage.partyName).toBeVisible();
        await expect(dashboardPage.amount).toBeVisible();

        await dashboardPage.seeAllTransactionbutton.click();
        let invoiceNumber = "";

        invoiceNumber = await dashboardPage.secondInvoiceNumber.innerText();
        await dashboardPage.searchInvoiceIcon.click();
        await dashboardPage.searchInvoiceInputField.type(invoiceNumber);
        await loginPage.delay(2000);
        let invoiceNumberCheck = "";
        invoiceNumberCheck = await dashboardPage.firstInvoiceNumber.innerText();
        expect(invoiceNumberCheck).toContain(invoiceNumber);

    });
}