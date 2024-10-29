const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Reports Page ${data.number}`, async ({ page }) => {
        test.setTimeout(200000);            //as to cover all the reports

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await page.waitForSelector("//*[@class='dashboard-cards']");

        const reportsPage = poManager.getReportsPage();
        await reportsPage.goto();

        const reportsCount = await reportsPage.allReports.count();

        for(let i =1; i<reportsCount+1; i++){
            await loginPage.delay(500);
            let reportName = await page.locator("(//*[@class = 'reports'])["+i+"]").textContent();
            await page.locator("(//*[@class = 'reports'])["+i+"]").click();
            await loginPage.delay(500);
            await page.waitForSelector("//*[@featurename='mark_favourite_report']");
            if(reportName == ' GSTR-1 (Sales) '){
                await expect(reportsPage.gstHeader).toContainText(reportName,{timeout:2000});
                await page.goBack();
            }
            else{
                await expect.soft(reportsPage.reportsTitle).toContainText(reportName,{ignoreCase:true,timeout:2000});
                await reportsPage.backPageArrow.click();
            }
            await page.waitForLoadState('domcontentloaded');
        }
    });
}
}