const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const GodownStrings = require('../constants/GodownPageStrings');


export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate Godown landing page ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const itemPage = poManager.getItemPage();
        // await itemPage.goTo();

        await loginPage.delay(1000);
        const godownPage = poManager.getGodownPage();
        // await godownPage.leftNavGodownBtn.click();
        await page.goto("/app/home/godown");
        await godownPage.godownPageHeader.waitFor();

        expect(await godownPage.godownPageHeader).toContainText(GodownStrings.PAGE_HEADER);
        expect(await godownPage.enableGodownButton).toBeEnabled();
    });
}

for (const data of logindataset) {
    test(`Validate enable Godown ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        // await godownPage.leftNavGodownBtn.click();
        await page.goto("/app/home/godown");
        await godownPage.godownPageHeader.waitFor();

        await godownPage.enableGodownButton.click();
        await godownPage.enableGodownModalSubmit.click();
        expect(await godownPage.enableGodownModalTitle).toContainText(GodownStrings.TRANSFER_PROGESS);
        await godownPage.enableGodownModalOkay.click();

        expect(await godownPage.toast).toContainText(GodownStrings.GODOWN_ENABLED);

        await godownPage.godownName.waitFor();
        expect(await godownPage.godownName).toContainText(await dashboardPage.businessName.textContent());
        expect(await godownPage.mainGodownTag).toContainText("Main Godown");

    });
}

for (const data of logindataset) {
    test(`Validate create godown ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        await godownPage.createGodownButton.click();
        await godownPage.createGodownHeader.waitFor();

        await godownPage.createGodownNameField.click();
        await godownPage.createGodownNameField.fill(GodownStrings.GODOWN_1_NAME);
        await godownPage.createGodownAddress.click();
        await godownPage.createGodownAddress.fill(GodownStrings.GODOWN_1_ADDRESS);
        await godownPage.createGodownState.click();
        await godownPage.createGodownState.fill(GodownStrings.GODOWN_1_STATE);
        await godownPage.selectFirstState.click();
        await godownPage.createGodownPin.click();
        await godownPage.createGodownPin.fill(GodownStrings.GODOWN_1_PIN);
        await godownPage.createGodownCity.click();
        await godownPage.createGodownCity.fill(GodownStrings.GODOWN_1_CITY);

        await godownPage.saveButton.click();

        await godownPage.toast.waitFor();
        expect(await godownPage.toast).toContainText(GodownStrings.GODOWN_CREATED);
    });
}

for (const data of logindataset) {
    test(`Validate newly created godown ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        await godownPage.switchGodown(GodownStrings.GODOWN_1_NAME);

        expect(await godownPage.godownName).toContainText(GodownStrings.GODOWN_1_NAME);
        expect(await godownPage.godownAddress).toContainText(GodownStrings.GODOWN_1_ADDRESS+", "
            +GodownStrings.GODOWN_1_CITY+", "
            +GodownStrings.GODOWN_1_STATE+", "
            +GodownStrings.GODOWN_1_PIN);

        expect(await godownPage.godownEmptyState).toBeVisible();
    });
}

for (const data of logindataset) {
    test(`Validate transfer single item ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        await godownPage.switchGodown(await dashboardPage.businessName.textContent());

        let currentGodown = await godownPage.godownName.textContent();

        let itemName = await godownPage.firstItemName.textContent();
        await godownPage.gowownItemsSelect.nth(0).click();  //selecting first item
        
        await godownPage.transferStockButton.click();
        await loginPage.delay(1000);
        await godownPage.transferFromGodown.waitFor();

        expect(await godownPage.transferStockModalHeader).toContainText("Transfer "+itemName);

        //transfer half of total item to another godown
        let itemStock = (await godownPage.transferModalCurrentStock.textContent()).match(/\d+/)[0];
        const stockTransfer = (parseInt(itemStock)/2).toString();
        const leftStock = (parseFloat(itemStock)-parseFloat(stockTransfer)).toString();
        
        await godownPage.transferItemQuantity.fill(stockTransfer);

        await godownPage.selectGodownInTransferModal(currentGodown);
        
        await godownPage.transferModalTransferButton.click();
        await godownPage.transferSuccessfullyText.waitFor();

        expect(await godownPage.transferSuccessfullyText).toContainText(GodownStrings.TRANSFER_SUCCESS);
        await godownPage.transferCloseButton.click();

        await godownPage.firstItemName.waitFor();
        expect((await godownPage.fitstItemQuantity.textContent()).replace(/,/g, '').match(/[\d.]+/)[0]).toEqual(leftStock);

        await godownPage.switchGodown(GodownStrings.GODOWN_1_NAME);
        await godownPage.firstItemName.waitFor();

        expect(await godownPage.firstItemName).toContainText(itemName);
        expect((await godownPage.fitstItemQuantity.textContent()).replace(/,/g, '').match(/[\d.]+/)[0]).toEqual(stockTransfer);

    });
}

for (const data of logindataset) {
    test(`Validate transfer some items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        let currentGodown = await godownPage.godownName.textContent();

        //selecting half of totlal items
        let items = await godownPage.godownItems.count();
        for(let i=0; i<items; i+=2){
            await godownPage.gowownItemsSelect.nth(i).click();
        }
        
        await godownPage.transferStockButton.click();
        expect(await godownPage.transferStockModalHeader).toContainText(GodownStrings.STOCK_TRANSFER_TEXT);
        
        await godownPage.transferFromGodown.waitFor();

        let transferItemCount = parseInt((await godownPage.transferItemCount.textContent()).match(/\d+/)[0]);

        await godownPage.selectGodownInTransferModal(currentGodown);

        await godownPage.transferConfirmCheck.click();
        await godownPage.transferModalTransferButton.click();

        expect(await godownPage.transferInProgressText).toBeVisible();
        await godownPage.enableGodownModalOkay.click();

        await godownPage.switchGodown(GodownStrings.GODOWN_1_NAME);
        await godownPage.firstItemName.waitFor();

        expect(await godownPage.godownItems).toHaveCount(transferItemCount);

    });
}

for (const data of logindataset) {
    test(`Validate transfer all items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        //switch to non-main godown to transfer all items to main godown
        await godownPage.switchGodown(GodownStrings.GODOWN_1_NAME);     

        let currentGodown = await godownPage.godownName.textContent();

        //selecting all items
        let items = await godownPage.godownItems.count();
        for(let i=0; i<items; i++){
            await godownPage.gowownItemsSelect.nth(i).click();
        }
        
        await godownPage.transferStockButton.click();
        expect(await godownPage.transferStockModalHeader).toContainText(GodownStrings.GODOWN_TRANSFER_TEXT);
        
        await godownPage.transferFromGodown.waitFor();

        await godownPage.selectGodownInTransferModal(currentGodown);

        await godownPage.transferModalTransferButton.click();
        expect(await godownPage.transferInProgressText).toBeVisible();
        await godownPage.enableGodownModalOkay.click();

        await godownPage.godownEmptyState.waitFor();
        expect(godownPage.godownEmptyState).toBeVisible();

    });
}

for (const data of logindataset) {
    test(`Validate delete created godown ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        await godownPage.switchGodown(GodownStrings.GODOWN_1_NAME);
        await godownPage.godownName.waitFor();

        await godownPage.deleteGodownButton.click();
        await godownPage.confirmDelete.click();

        await godownPage.toast.waitFor();
        expect(await godownPage.toast).toContainText(GodownStrings.GODOWN_DELETED);
    });
}

for (const data of logindataset) {
    test(`Validate delete main godown ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(3);

        const godownPage = poManager.getGodownPage();
        await page.goto("/app/home/godown");

        expect(await godownPage.mainGodownTag).toBeVisible();

        await godownPage.deleteGodownButton.click();
        await godownPage.confirmDelete.click();

        await godownPage.toast.waitFor();
        expect(await godownPage.toast).toContainText(GodownStrings.GODOWN_DELETED);
    });
}
}