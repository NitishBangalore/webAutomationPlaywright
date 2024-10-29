const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const partyPageStrings = require('../constants/partyPageStrings');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const createPartyDataset = JSON.parse(JSON.stringify(require('../resources/createParty.json')));


export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset)
    test(`validate party page components`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await page.waitForSelector('div.table-responsive');

        const partyPage = poManager.getPartyPage();
        await partyPage.goTo();

        await expect(partyPage.partyHeaderText).toBeVisible();
        await expect(partyPage.AllText).toBeVisible();
        await expect(partyPage.toCollectText).toBeVisible();
        await expect(partyPage.toPay).toBeVisible();
        await expect(partyPage.bulkAction).toBeVisible();
        await expect(partyPage.partySettings).toBeVisible();
        await expect(partyPage.report).toBeVisible();
    });

for (const data of logindataset)
    for (const party of createPartyDataset)
        test(`validate create new party`, async ({ page }) => {

            const poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await page.waitForSelector('div.table-responsive');

            const partyPage = poManager.getPartyPage();
            await partyPage.goTo();

            await partyPage.createpartyBtn.click();
            //create new party
            await partyPage.createParty(party);
            await partyPage.partyDetailsBackButton.click();
            await partyPage.createpartyBtn.click();
            await partyPage.createPartyThroughGST(party);

        });


for (const data of logindataset)
    for (const party of createPartyDataset)
        test(`validate search and delete party  ${party.name} `, async ({ page }) => {
            const poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await page.waitForSelector('div.table-responsive');

            const partyPage = poManager.getPartyPage();
            await partyPage.goTo();

            await partyPage.searchBtn.click();
            await partyPage.searchBar.fill(partyPageStrings.SEARCHBARPARTYNAME);
            await partyPage.searchBar.press('Enter');

            // Click text=Laptop Sales
            await partyPage.partyNameLaptopSales.click();
            await expect(partyPage.partyDetailsPartyHeader).toContainText(partyPageStrings.SEARCHBARPARTYNAME);

            await partyPage.deletePartyButton.click();
            await partyPage.deletePartyConfirmationButton.click();

        });

}