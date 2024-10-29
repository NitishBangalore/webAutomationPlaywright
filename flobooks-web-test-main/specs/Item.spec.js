const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const itemPageStrings = require('../constants/ItemPageStrings');
const { ItemUtils } = require('../resources/utils/ItemUtilits');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));

export default function createTests() {
    test.use({ storageState: '.auth/user.json' });

for (const data of logindataset) {
    test(`Validate item page components ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.disableSerialisation();   //bulk edit is not allowed if serialisation is enabled
        await itemPage.bulkActionButton.click();
        await itemPage.bulkEditItemsButton.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(itemPage.bulkAddEditPageHeader).toContainText(itemPageStrings.BULK_EDIT_HEADER);
        await itemPage.bulkAddEditPageBack.click();
        await itemPage.bulkPageBackConfirmationYes.click();

        await itemPage.disableBatching();     //batching allow bulk add with batches as well
        await itemPage.bulkActionButton.click();
        await itemPage.bulkAddItemsButton.click();
        await page.waitForLoadState();
        await expect(itemPage.bulkAddEditPageHeader).toContainText(itemPageStrings.BULK_ADD_HEADER);
        await itemPage.bulkAddEditPageBack.click();
        await itemPage.bulkPageBackConfirmationYes.click();

        await expect(itemPage.itemName).toContainText(itemPageStrings.NAME_ITEM);
        await expect(itemPage.itemCode).toContainText(itemPageStrings.ITEM_CODE);
        await expect(itemPage.stockQuantity).toContainText(itemPageStrings.STOCK_QUANTITY);
        await expect(itemPage.sellingPrice).toContainText(itemPageStrings.SELLING_PRICE);
        await expect(itemPage.purchasePrice).toContainText(itemPageStrings.PURCHASE_PRICE);
    });
}


for (const data of logindataset) {
    test(`Validate create new Item with/wo godown ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for(let i = 2; i >0; i--) {
            // i=1 for godown business, i=2 for non-godown
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.createItemButton.click();
            await expect(itemPage.createItemHeader).toContainText(itemPageStrings.CREATE_ITEM);
            await expect(itemPage.basicDetailsText).toContainText(itemPageStrings.BASIC_DETAILS);

            await itemPage.basicDetailsText.click();
            await itemPage.enterItemName.click();
            await itemPage.enterItemName.fill(itemPageStrings.ITEM_NAME);
            await itemPage.enterSalesPrice.click();
            await itemPage.enterSalesPrice.fill(itemPageStrings.SALES_PRICE);
            await itemPage.taxSelector.click();
            await itemPage.selectWithoutTax.click();
            await itemPage.gstDropDown.click();
            await itemPage.choose18PercentGst.click();
            await itemPage.categoryDropDown.click();
            await itemPage.firstCategory.click();

            await itemPage.pricingDetailsTab.click();
            await itemPage.enterPurchasePrice.click();
            await itemPage.enterPurchasePrice.fill(itemPageStrings.PURCHASES_PRICE);
            await itemPage.taxSelector.click();
            await itemPage.selectWithoutTax.click();

            try {
                await itemPage.stockDetailsTab.click();
                await page.waitForSelector(itemPage.godownDropDownMenu, {timeout: 2000});
                await itemPage.godownDropDownMenu.click();
                await itemPage.selectGodownFirst.click();
                await itemPage.openingStock.click();
            }
            catch (error) {
                await itemPage.openingStock.click();
            }
            await itemPage.openingStock.fill(itemPageStrings.ITEM_OPENING_STOCK);

            await itemPage.stockDetailsTab.click();
            await itemPage.enterItemCode.click();
            await itemPage.enterItemCode.fill((await ItemUtils.generateItemCode()).toString());
            await itemPage.enterItemDescription.click();
            await itemPage.enterItemDescription.fill(itemPageStrings.ITEM_DESCRIPTION);
            await itemPage.saveItemButton.click();

            //success tost validation
            await itemPage.toastItemCreatedSuccess.waitFor();
            await expect(itemPage.toastItemCreatedSuccess).toContainText("Item created", { timeout: 2000 });
        }
    });
}


for (const data of logindataset) {
    test(`Validate create new Batch Item with/wo godown ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for(let i = 2; i>0; i--) {
            // i=1 for godown business, i=2 for non-godown
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.enableBatching();
            await itemPage.createItemButton.click();
            await expect(itemPage.createItemHeader).toContainText(itemPageStrings.CREATE_ITEM);
            await expect(itemPage.basicDetailsText).toContainText(itemPageStrings.BASIC_DETAILS);

            await itemPage.basicDetailsText.click();
            await itemPage.enterItemName.click();
            await itemPage.enterItemName.fill(itemPageStrings.BATCH_ITEM_NAME);
            await itemPage.categoryDropDown.click();
            await itemPage.firstCategory.click();
            await itemPage.enterSalesPrice.click();
            await itemPage.enterSalesPrice.fill(itemPageStrings.SALES_PRICE);
            await itemPage.taxSelector.click();
            await itemPage.selectWithoutTax.click();
            await itemPage.gstDropDown.click();
            await itemPage.choose18PercentGst.click();
            await itemPage.batchToggle.click();

            await itemPage.batchName.click();
            await itemPage.batchName.fill(itemPageStrings.BATCH_NAME_1);
            await itemPage.expiryDayPicker.click();
            const date = (new Date()).getDate();
            await page.locator("//*[@class='mbb-range']//*[text()='" + date + "']").first().click();
            await itemPage.datePickerConfirm.click();

            try {
                await itemPage.stockDetailsTab.click();
                await page.waitForSelector(itemPage.godownDropDownMenu, {timeout: 2000});
                await itemPage.godownDropDownMenu.click();
                await itemPage.selectGodownFirst.click();
                await itemPage.openingStock.click();
            }
            catch (error) {
                await itemPage.openingStock.click();
            }
            await itemPage.openingStock.fill(itemPageStrings.ITEM_OPENING_STOCK);

            await itemPage.pricingDetailsTab.click();
            await itemPage.enterPurchasePrice.click();
            await itemPage.enterPurchasePrice.fill(itemPageStrings.PURCHASES_PRICE);
            await itemPage.taxSelector.click();
            await itemPage.selectWithoutTax.click();

            await itemPage.stockDetailsTab.click();
            await itemPage.enterItemDescription.click();
            await itemPage.enterItemDescription.fill(itemPageStrings.ITEM_DESCRIPTION);
            await itemPage.saveItemButton.click();

            //validation of success toast
            await itemPage.toastItemCreatedSuccess.waitFor();
            await expect(itemPage.toastItemCreatedSuccess).toContainText("Item created", { timeout: 2000 });
        }

    });
}


for (const data of logindataset) {
    test(`Validate create new Serialised Item ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        //check for serialisation enabled

        await itemPage.enableSerialisation();
        await itemPage.createItemButton.click();
        await expect(itemPage.createItemHeader).toContainText(itemPageStrings.CREATE_ITEM);
        await expect(itemPage.basicDetailsText).toContainText(itemPageStrings.BASIC_DETAILS);

        await itemPage.basicDetailsText.click();
        await itemPage.enterItemName.click();
        await itemPage.enterItemName.fill(itemPageStrings.SERIAL_ITEM_NAME);
        await itemPage.categoryDropDown.click();
        await itemPage.firstCategory.click();
        await itemPage.enterSalesPrice.click();
        await itemPage.enterSalesPrice.fill(itemPageStrings.SALES_PRICE);
        await itemPage.taxSelector.click();
        await itemPage.selectWithoutTax.click();
        await itemPage.gstDropDown.click();
        await itemPage.choose18PercentGst.click();
        await itemPage.serialisationToggle.click();

        await itemPage.openingStock.click();
        await itemPage.openingStock.fill(itemPageStrings.SERIAL_ITEM_OPENING_STOCK);
        for (let i = 1; i < itemPageStrings.SERIAL_ITEM_OPENING_STOCK + 1; i++) {
            if (i > itemPageStrings.SERIAL_ITEM_OPENING_STOCK) {
                break;
            }
            await page.locator("(//*[@id='serialised-list']//input)[" + i + "]").click();
            await page.locator("(//*[@id='serialised-list']//input)[" + i + "]").fill(i.toString());
        }

        await itemPage.pricingDetailsTab.click();
        await itemPage.enterPurchasePrice.click();
        await itemPage.enterPurchasePrice.fill(itemPageStrings.PURCHASES_PRICE);
        await itemPage.taxSelector.click();
        await itemPage.selectWithoutTax.click();

        await itemPage.stockDetailsTab.click();
        await itemPage.enterItemDescription.click();
        await itemPage.enterItemDescription.fill(itemPageStrings.ITEM_DESCRIPTION);
        await itemPage.saveItemButton.click();

        //validation of success toast
        await itemPage.toastItemCreatedSuccess.waitFor();
        await expect(itemPage.toastItemCreatedSuccess).toContainText("Item created", { timeout: 2000 });

    });
}


for (const data of logindataset) {
    test(`Validate search Item name  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.ITEM_NAME, { timeout: 2000 });
        await itemPage.searchResultFirst.click();
        await expect(itemPage.searchItemCode).toContainText(process.env.itemCode);
        await expect(itemPage.searchSellingPrice).toContainText(itemPageStrings.SALES_PRICE);
        await expect(itemPage.searchPurchasePrice).toContainText(itemPageStrings.PURCHASES_PRICE);
        await expect(itemPage.searchGSTRate).toContainText(itemPageStrings.GST_RATE);

    });
}


for (const data of logindataset) {
    test(`Validate search Batch Item  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.BATCH_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.BATCH_ITEM_NAME);
        await itemPage.searchResultFirst.click();
        await expect(itemPage.searchSellingPrice).toContainText(itemPageStrings.SALES_PRICE);
        await expect(itemPage.searchPurchasePrice).toContainText(itemPageStrings.PURCHASES_PRICE);

        const batches = await itemPage.itemBatchSerialCount.count();
        for (let i = 1; i <= batches; i++) {
            await expect(page.locator("//*[@class='mbb-table']/tbody/tr[" + i + "]/td[2]")).toContainText(itemPageStrings.BATCH_NAME_1);    //batch Name
            await expect(page.locator("//*[@class='mbb-table']/tbody/tr[" + i + "]/td[5]")).toContainText(itemPageStrings.ITEM_OPENING_STOCK);  //batch quantity
        }

    });
}


for (const data of logindataset) {
    test(`Validate search Serial Item  ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.SERIAL_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.SERIAL_ITEM_NAME);
        await itemPage.searchResultFirst.click();
        await expect(itemPage.searchSellingPrice).toContainText(itemPageStrings.SALES_PRICE);
        await expect(itemPage.searchPurchasePrice).toContainText(itemPageStrings.PURCHASES_PRICE);
        await loginPage.delay(2000);    //serial numbers take 1-2 sec to load
        const serialCount = await itemPage.itemSerialnumberCount.count();
        expect(serialCount.toString()).toEqual(itemPageStrings.SERIAL_ITEM_OPENING_STOCK);

        for (let i = 1; i <= serialCount; i++) {
            await expect(page.locator("//*[@class='mbb-table']/tbody/tr[" + i + "]/td[1]")).toContainText(i.toString());
        }
    });
}


for (const data of logindataset) {
    test(`Validate adjust item stock with/without Godown ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for (let i = 2; i >0; i--) {
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.ITEM_NAME);
            await expect(itemPage.searchItemName).toContainText(itemPageStrings.ITEM_NAME, { timeout: 2000 });
            await itemPage.searchItemName.click();

            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.ITEM_NAME);

            let currentStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
            await itemPage.adjustStockButton.click();
            await expect(itemPage.popUpAdjustStockQtyTxt).toContainText(itemPageStrings.ADJUST_STOCK_QUANTITY);
            try{
                await itemPage.godownDropDownMenu.waitFor({timeout: 2000});
                await itemPage.godownDropDownMenu.click();
                await itemPage.selectGodownFirst.click();
            }
            catch{/*no need to handle anything as non-godown company dont have those fields*/}

            await itemPage.adjustQtyfill.fill(itemPageStrings.CODE_ITEM);
            await itemPage.enterRemarks.click();
            await itemPage.enterRemarks.fill(itemPageStrings.ADDED_STOCKS);
            await expect(itemPage.finalStockTxt).toContainText(itemPageStrings.FINAL_STOCKS);
            await itemPage.saveAdjustStock.click();

            await itemPage.toastAdjustSuccess.waitFor();
            await expect(itemPage.toastAdjustSuccess).toContainText("adjusted successfully");

            await itemPage.stockDetailsTab.click();
            let adjustStock = itemPage.getnumber(await itemPage.firstRowQuantity.textContent());
            let closingStock = itemPage.getnumber(await itemPage.firstRowClosingStock.textContent());
            
            expect(adjustStock).toEqual(parseFloat(itemPageStrings.CODE_ITEM));
            expect(closingStock).toEqual(currentStock + parseFloat(itemPageStrings.CODE_ITEM));
        }
    });
}


for (const data of logindataset) {
    test(`Validate adjust Batch Item stock with/without Godown ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for (let i = 2; i >0; i--) {
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.BATCH_ITEM_NAME);
            await expect(itemPage.searchItemName).toContainText(itemPageStrings.BATCH_ITEM_NAME, { timeout: 2000 });
            await itemPage.searchItemName.click();

            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.BATCH_ITEM_NAME);

            let currentStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
            await itemPage.adjustStockButton.click();
            await expect(itemPage.popUpAdjustStockQtyTxt).toContainText(itemPageStrings.ADJUST_STOCK_QUANTITY);
        
            await itemPage.batchDropDown.click();
            await itemPage.selectBatchFirst.click();

            try{
                await itemPage.godownDropDownMenu.waitFor({timeout: 2000});
                await itemPage.godownDropDownMenu.click();
                await itemPage.selectGodownFirst.click();
            }
            catch{/*no need to handle anything as non-godown company dont have those fields*/}

            await itemPage.adjustQtyfill.fill(itemPageStrings.CODE_ITEM);
            await itemPage.enterRemarks.click();
            await itemPage.enterRemarks.fill(itemPageStrings.ADDED_STOCKS);
            await expect(itemPage.finalStockTxt).toContainText(itemPageStrings.FINAL_STOCKS);
            await itemPage.saveAdjustStock.click();

            await itemPage.toastAdjustSuccess.waitFor();
            await expect(itemPage.toastAdjustSuccess).toContainText("adjusted successfully");

            await itemPage.stockDetailsTab.click();
            let adjustStock = itemPage.getnumber(await itemPage.firstRowQuantity.textContent());
            let closingStock = itemPage.getnumber(await itemPage.firstRowClosingStock.textContent());
                
            expect(adjustStock).toEqual(parseFloat(itemPageStrings.CODE_ITEM));
            expect(closingStock).toEqual(currentStock + parseFloat(itemPageStrings.CODE_ITEM));
        }
    });
}


for (const data of logindataset) {
    test(`Validate Add Serial Item stock ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.SERIAL_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.SERIAL_ITEM_NAME, { timeout: 2000 });
        await itemPage.searchItemName.click();

        await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.SERIAL_ITEM_NAME);

        let currentStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
        await itemPage.adjustStockButton.click();
        await expect(itemPage.popUpAdjustStockQtyTxt).toContainText(itemPageStrings.ADJUST_STOCK_QUANTITY);
    
        await itemPage.addSerialNumber.click();
        await itemPage.serialQuantity.click();
        await itemPage.serialQuantity.fill(itemPageStrings.SERIAL_ITEM_ADJUST_STOCK);

        let newSerialCount = itemPage.getnumber(itemPageStrings.SERIAL_ITEM_ADJUST_STOCK);
        for (let i = 0; i < newSerialCount; i++) {
            await itemPage.serialNumberList.nth(i).click();
            await itemPage.addNewSerialNumberField.nth(i).fill(itemPageStrings.ADJUST_SERIAL_NUMBERS[i]);
        }

        await itemPage.saveItemButton.click();
        await itemPage.itemBatchSerialCount.first().waitFor();
        await loginPage.delay(2000);

        let finalStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
        expect(finalStock).toEqual(currentStock + newSerialCount);
        
    });
}


for (const data of logindataset) {
    test(`Validate Reduce Serial Item stock ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.SERIAL_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.SERIAL_ITEM_NAME, { timeout: 2000 });
        await itemPage.searchItemName.click();

        await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.SERIAL_ITEM_NAME);

        let currentStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
        await itemPage.adjustStockButton.click();
        await expect(itemPage.popUpAdjustStockQtyTxt).toContainText(itemPageStrings.ADJUST_STOCK_QUANTITY);
    
        await itemPage.reduceSerialNumber.click();
        await itemPage.serialQuantity.click();
        await itemPage.serialQuantity.fill(itemPageStrings.SERIAL_ITEM_ADJUST_STOCK);

        let newSerialCount = itemPage.getnumber(itemPageStrings.SERIAL_ITEM_ADJUST_STOCK);
        for (let i = 0; i < newSerialCount; i++) {
            await itemPage.removeSerialNumberCheckBox.nth(newSerialCount - i-1).click();
        }

        await itemPage.saveItemButton.click();
        await loginPage.delay(2000);

        let finalStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
        expect(finalStock).toEqual(currentStock - newSerialCount);
        
    });
}


for (const data of logindataset) {
    test(`Validate create new Batch for Items with/without Godown ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for (let i = 2; i >0; i--) {
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.BATCH_ITEM_NAME);
            await expect(itemPage.searchItemName).toContainText(itemPageStrings.BATCH_ITEM_NAME, { timeout: 2000 });
            await itemPage.searchItemName.click();

            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.BATCH_ITEM_NAME);

            let currentStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());
            let newBatchStock = 0;

            await itemPage.addNewBatchButton.click();
            await itemPage.createBatchSalesPrice.waitFor();

            await itemPage.createBatchBatchName.click();
            await itemPage.createBatchBatchName.fill(itemPageStrings.BATCH_NAME_2);
            await itemPage.createBatchSalesPrice.click();
            await itemPage.createBatchSalesPrice.fill(itemPageStrings.BATCH2_SELLING_PRICE_WITHOUT_GST);
            await itemPage.createBatchPurchasePrice.click();
            await itemPage.createBatchPurchasePrice.fill(itemPageStrings.BATCH2_PURCHASE_PRICE_WITHOUT_GST);

            await itemPage.createBatchOpeningStock.click();

            try{
                await itemPage.createBatchGodownOptions.first().waitFor({timeout: 3000});
                let godownCount = await itemPage.createBatchGodownOptions.count();
                for (let j = 0; j < godownCount; j++) {
                    await itemPage.createBatchGodownAddButton.first().click();
                    await itemPage.createBatchGodownStockField.waitFor();
                    await itemPage.createBatchGodownStockField.fill(itemPageStrings.ITEM_OPENING_STOCK);
                    await loginPage.delay(2000);
                    newBatchStock += parseFloat(itemPageStrings.ITEM_OPENING_STOCK);
                }
                await loginPage.delay(2000);
                await itemPage.saveAdjustStock.click();
            }
            catch{
                await itemPage.createBatchOpeningStock.fill(itemPageStrings.ITEM_OPENING_STOCK);
                newBatchStock += parseFloat(itemPageStrings.ITEM_OPENING_STOCK);
            }
            await itemPage.saveItemButton.waitFor();
            await page.waitForTimeout(1500);    //delay for new batch to be created
            await itemPage.saveItemButton.click();
            await page.waitForTimeout(1500);

            (await page.locator("//*[@id='mbb-table-body']//*[contains(text(),'"+itemPageStrings.BATCH_NAME_2+"')]")).waitFor({timeout: 2000});
            let finalStock = itemPage.getnumber(await itemPage.itemDetailsCurrentStock.textContent());       
            expect(finalStock).toEqual(currentStock+newBatchStock);
        }
    });
}


for (const data of logindataset) {
    test(`Validate transfer Godown Item ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        for(let i = 1; i >0; i--) {
            await dashboardPage.switchBusiness(i);
        
            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.ITEM_NAME);
            await expect(itemPage.searchItemName).toContainText(itemPageStrings.ITEM_NAME, { timeout: 2000 });
            await itemPage.searchItemName.click();
            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.ITEM_NAME);

            expect(await itemPage.godownTab).toBeVisible();
            await itemPage.godownTab.click();

            await itemPage.godownNames.first().waitFor();

            let godownList = await itemPage.godownNames.allTextContents();
            const stockAvailable = itemPage.getnumber(await itemPage.firstGodownStockCount.textContent());
            const stockTransfer = (parseInt(stockAvailable)/2).toString();
            const leftStock = (parseFloat(stockAvailable)-parseFloat(stockTransfer)).toString();
            
            await itemPage.transferButton.click();

            expect(await itemPage.transferStockModalHeader).toContainText('Transfer Stock');
            await itemPage.transferFromGodown.waitFor();

            await itemPage.transferFromGodown.click();
            await itemPage.selectGodownInTransferModal(godownList[0],"from");
            await itemPage.transferModalItemQuantity.fill(stockTransfer);

            await itemPage.transferToGodown.click();
            await itemPage.selectGodownInTransferModal(godownList[1],"to");
            await itemPage.transferModalTransferButton.click();

            await itemPage.transferSuccessfullyText.waitFor();
            await expect(itemPage.transferSuccessfullyText).toContainText("Stock Transfered Successfully");
            await itemPage.transferCloseButton.click();
            await loginPage.delay(1000);

            const stockLeft = itemPage.getnumber(await itemPage.firstGodownStockCount.textContent());
            expect(stockLeft).toEqual(parseFloat(leftStock));

            await itemPage.stockDetailsTab.click();
            await itemPage.firstRowQuantity.waitFor();
            let transferStock = itemPage.getnumber(await itemPage.firstRowQuantity.textContent());
            expect(transferStock).toEqual(parseFloat(stockTransfer));
        }
    });
}


for (const data of logindataset) {
    test(`Validate transfer Godown Batch Item ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
    
        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.BATCH_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.BATCH_ITEM_NAME, { timeout: 2000 });
        await itemPage.searchItemName.click();
        await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.BATCH_ITEM_NAME);

        expect(await itemPage.godownTab).toBeVisible();
        await itemPage.godownTab.click();

        await itemPage.godownNames.first().waitFor();
        expect(await itemPage.godownBatchDropDown).toBeVisible();

        let godownList = await itemPage.godownNames.allTextContents();
        const stockAvailable = itemPage.getnumber(await itemPage.firstGodownStockCount.textContent());
        const stockTransfer = (parseInt(stockAvailable)/2).toString();
        const leftStock = (parseFloat(stockAvailable)-parseFloat(stockTransfer)).toString();
        
        await itemPage.transferButton.click();

        expect(await itemPage.transferStockModalHeader).toContainText('Transfer Stock');
        await itemPage.transferFromGodown.waitFor();

        await itemPage.transferFromGodown.click();
        await itemPage.selectGodownInTransferModal(godownList[0],"from");
        await itemPage.transferModalItemQuantity.fill(stockTransfer);

        await itemPage.transferToGodown.click();
        await itemPage.selectGodownInTransferModal(godownList[1],"to");
        await itemPage.transferModalTransferButton.click();

        await itemPage.transferSuccessfullyText.waitFor();
        await expect(itemPage.transferSuccessfullyText).toContainText("Stock Transfered Successfully");
        await itemPage.transferCloseButton.click();
        await loginPage.delay(1000);

        const stockLeft = itemPage.getnumber(await itemPage.firstGodownStockCount.textContent());
        expect(stockLeft).toEqual(parseFloat(leftStock));

        await itemPage.stockDetailsTab.click();
        await itemPage.firstRowQuantity.waitFor();
        let transferStock = itemPage.getnumber(await itemPage.firstRowQuantity.textContent());
        expect(transferStock).toEqual(parseFloat(stockTransfer));
        
    });
}


for (const data of logindataset) {
    test(`Validate adjust item details page ${data.number} `, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);
         
        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.ITEM_NAME, { timeout: 2000 });
        await itemPage.searchItemName.click();
        await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.ITEM_NAME);
        await expect(itemPage.itemDetailsInstockText).toBeVisible();
        await expect(itemPage.itemDetailsViewBarCodeButton).toBeVisible();
        await expect(itemPage.itemDetailsTab).toBeVisible();
    });
}


for (const data of logindataset) {
    test(`Validate Enable Item Settings ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await loginPage.delay(2000);    //wait to load item settings options
        await itemPage.enableSerialisation();   //for enabling serialisation

        await itemPage.enableBatching();    //for enabling batching

        await itemPage.enableMRP();     //to enable MRP field

        await itemPage.enableWholesalePrice();      //to enable Wholesale price

        await itemPage.enableExpirtAlert();     //to enable Expity alert

        await itemPage.addCustomField();

        //verify the enabled component in create item modal
        await itemPage.createItemButton.click();

        await expect(itemPage.settingBatchingToggle).toBeEditable();
        await expect(itemPage.settingSerializationToggle).toBeEditable();
        await itemPage.pricingDetailsTab.click();
        await expect(itemPage.mrpField).toBeEditable();
        await itemPage.wholeSalePriceButton.click();
        await expect(itemPage.wholeSalePriceField).toBeEditable();
        await expect(itemPage.wholeSaleQuantityField).toBeEditable();
        await itemPage.customFieldTab.click();
        await expect(itemPage.customFieldName).toContainText(itemPageStrings.FIRST_CUSTOM_FIELD);
    });
}


for (const data of logindataset) {
    test(`Validate Item cards ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        const stockValue = await itemPage.stockValue.textContent();
        const lowStockCount = await itemPage.lowStockCount.textContent();

        const reportsPage = poManager.getReportsPage();

        await itemPage.stockValue.click();
        await page.waitForLoadState('domcontentloaded');
        let value = await reportsPage.totalStockValue.textContent();
        expect(stockValue.split(".")[0]).toEqual(value.split(":")[1].trim().split(".")[0]);
        await page.goBack();

        await itemPage.lowStockCount.click();
        await expect(reportsPage.headerLowStock).toBeVisible({ timeout: 2000 });
        expect(await reportsPage.itemCount.count()).toEqual(Number(lowStockCount));


    });
}


for (const data of logindataset) {
    test.skip(`Validate Stock value setting ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.itemSettingsButton.click();
        await itemPage.stockValueCalculation.click();
        await page.locator("#label-stockValualtion-purchase_price").click();
        await itemPage.saveItemButton.click();
        let firstStockValue = await itemPage.stockValue.textContent();

        await itemPage.itemSettingsButton.click();
        
        await itemPage.stockValueCalculation.click();
        await page.locator("#label-stockValualtion-sales_price").click();
        await itemPage.saveItemButton.click();
        let secondStockValue = await itemPage.stockValue.textContent();

        console.log(firstStockValue + "\n" + secondStockValue);
    });
}


for (const data of logindataset) {
    test(`Validate create Category ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.category.click();
        await itemPage.addCategory.click();
        await expect(itemPage.categoryModalHeader).toContainText(itemPageStrings.CATEGORY_MODAL_HEADER);
        await itemPage.categoryField.fill(itemPageStrings.NEW_CATEGORY);
        await itemPage.saveItemButton.click();

        //validate created category
        await itemPage.category.click();
        await itemPage.categoryNewCategory.click();
    });
}


for (const data of logindataset) {
    test(`Validate Delete Category without items${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        //delete category without items
        await itemPage.category.click();
        await itemPage.categoryNewCategoryEdit.click();
        await itemPage.deleteCategory.click();
        await itemPage.deleteButton.click();
        await expect(itemPage.toastDeleteSuccess).toContainText("Item category deleted successfully");

    });
}


for (const data of logindataset) {
    test(`Validate Delete Category with items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        //delete category with items
        await itemPage.category.click();
        await itemPage.editCategoryFirst.click();
        await expect(itemPage.deleteCategory).toHaveClass(/disabled/);

    });
}


for (const data of logindataset) {
    test(`Validate Category items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.category.click();
        let category = (await itemPage.categoryFirst.textContent()).split(/[\(\)]/)[1];

        await itemPage.categoryFirst.click();
        await loginPage.delay(1500);       //for all items to get filter
        expect(await itemPage.tableRowCount.count()).toEqual(Number(category));
    });
}


for (const data of logindataset) {
    test(`Delete Item and validate for both company ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();

        for (let i = 2; i > 0; i--) {
            await dashboardPage.switchBusiness(i);
         
            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.ITEM_NAME);
            await expect(await itemPage.searchItemName).toContainText(itemPageStrings.ITEM_NAME, { timeout: 4000 });
            await itemPage.searchItemName.click();
            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.ITEM_NAME);

            await itemPage.deleteItem.click();
            await itemPage.deleteButton.click();

            await itemPage.toastAdjustSuccess.waitFor();
            await expect(itemPage.toastAdjustSuccess).toContainText("deleted successfully");
        }
    });
}


for (const data of logindataset) {
    test(`Validate Delete Batch items for both company ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        for (let i = 2; i > 0; i--) {
            await dashboardPage.switchBusiness(i);

            //items
            const itemPage = poManager.getItemPage();
            await itemPage.goTo();

            await itemPage.searchItem(itemPageStrings.BATCH_ITEM_NAME);
            await expect(itemPage.searchItemName).toContainText(itemPageStrings.BATCH_ITEM_NAME, { timeout: 2000 });
            await itemPage.searchItemName.click();
            await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.BATCH_ITEM_NAME);

            await itemPage.deleteItem.click();
            await itemPage.deleteButton.click();

            await itemPage.toastAdjustSuccess.waitFor();
            await expect(itemPage.toastAdjustSuccess).toContainText("deleted successfully");
        }
    });
}


for (const data of logindataset) {
    test(`Validate Delete Serial items ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.switchBusiness(2);

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await itemPage.searchItem(itemPageStrings.SERIAL_ITEM_NAME);
        await expect(itemPage.searchItemName).toContainText(itemPageStrings.SERIAL_ITEM_NAME, { timeout: 2000 });
        await itemPage.searchItemName.click();
        await expect(itemPage.itemDetailsItemNameHeader).toContainText(itemPageStrings.SERIAL_ITEM_NAME);

        await itemPage.deleteItem.click();
        await itemPage.deleteButton.click();

        await itemPage.toastAdjustSuccess.waitFor();
        await expect(itemPage.toastAdjustSuccess).toContainText("deleted successfully");
    });
}


for (const data of logindataset) {
    test(`Validate Disable Item Settings ${data.number}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();

        //items
        const itemPage = poManager.getItemPage();
        await itemPage.goTo();

        await loginPage.delay(2000);    //wait to load item settings options
        await itemPage.disableSerialisation();   //for disabling serialisation

        await itemPage.disableBatching();    //for disabling batching

        await itemPage.disableMRP();     //to disable MRP field

        await itemPage.disableWholesalePrice();      //to disable Wholesale price

        await itemPage.deleteCustomField();

        //verify the disabled component in create item modal
        await itemPage.createItemButton.click();

        await expect(itemPage.settingBatchingToggle).toBeHidden();
        await expect(itemPage.settingSerializationToggle).toBeHidden();
        await itemPage.pricingDetailsTab.click();
        await expect(itemPage.mrpField).toBeHidden();
        await expect(itemPage.wholeSalePriceButton).toBeHidden();
        await itemPage.customFieldTab.click();
        await expect(itemPage.customFieldName).toBeHidden();
    });
}


}