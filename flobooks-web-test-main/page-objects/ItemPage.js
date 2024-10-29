const { expect } = require('@playwright/test');
const itemPageStrings = require('../constants/ItemPageStrings');

class ItemPage {
  constructor(page) {
    this.page = page;
    this.leftNavItemsBtn = page.getByTestId('left-nav-body').getByText('Items');
    this.gotItButton = page.locator('text=Got It');
    this.itemHeader = page.locator('mbb-screen-header').getByText('Items', { exact: true });
    this.itemSettingsButton = page.locator("//*[@featurename='item_settings']/button");
    this.itemSettingModal = page.locator("//div[@class='modal-content item_settings']");
    this.serialisationModal_next = page.locator("//*[@class='submit-buttons']//div[2]");
    this.serialisationModal_done = page.locator("//*[@class='submit-buttons']//div[contains(text(),'Done')]");
    this.dialogueCloseButton = page.getByRole('dialog').getByText('close');
    this.bulkActionButton = page.locator("//*[@placeholder = 'Bulk Actions']//*[contains(text(),'Bulk Actions')]");
    this.bulkEditItemsButton = page.locator("//*[contains(@class,'mbb-option')]//*[contains(text(),'Bulk Edit')]");
    this.bulkAddEditPageHeader = page.getByTestId("title");
    this.bulkAddEditPageBack = page.locator("(//*[@class='header']//img)[1]");
    this.bulkPageBackConfirmationYes = page.locator("//button//*[contains(text(),'Leave')]");
    this.bulkAddItemsButton = page.locator("//*[contains(@class,'mbb-option')]//*[contains(text(),'Bulk Add')]").first();
    this.bulkAddModalClose = page.locator("//*[contains(@class,'mbb-modal-header')]//*[@name = 'ic-x-close']");
    this.toastSerializationEnabled = page.locator("//*[@id='toast-container']//*[contains(text(),'if serialization is enabled')]");
    this.toastContainerClose = page.locator("//*[@id='toast-container']//*[contains(text(),'close')]");
    this.bulkUploadBanner = page.locator('.upload-items-banner_text');
    this.uploadBannerButton = page.getByRole('button', { name: 'Upload Items' });
    this.closeBannerButton = page.locator('i').first();
    this.lowStock = page.getByText('Low Stock', { exact: true });
    this.itemName = page.locator("//table//tr[1]//*[contains(text(),'Item Name')]");
    this.itemCode = page.locator("//table//tr[1]//*[contains(text(),'Item Code')]");
    this.stockQuantity = page.locator("//table//tr[1]//*[contains(text(),'Stock QTY')]");
    this.stockValue = page.locator('//span[normalize-space()="Stock Value"]');
    this.sellingPrice = page.locator("//table//tr[1]//*[contains(text(),'Selling Price')]");
    this.purchasePrice = page.locator("//table//tr[1]//*[contains(text(),'Purchase Price')]");

    this.stockValue = page.locator("//*[@title='Stock Value']//div[2]//mbb-typography");
    this.lowStockCount = page.locator("//*[@title='Low Stock']//div[2]//mbb-typography");

    //create Item
    this.createItemButton = page.getByRole('button', { name: ' Create Item' });
    this.createItemHeader = page.locator("//div[contains(@class,'mbb-modal-header')]//mbb-typography/div");
    this.basicDetailsText = page.locator('//div[@class="tab-panel"]//*[contains(text(),"Basic Details")]');
    this.batchDetailsTab = page.locator("//div[contains(@class,'tab-holder')]//*[contains(text(),'Batch Details')]");
    this.pricingDetailsTab = page.locator("//div[@class='tab-holder']//*[contains(text(),'Pricing Details')]");
    this.customFieldTab = page.locator("//div[contains(@class,'tab-holder')]//*[contains(text(),'Custom Fields')]");
    this.stockDetailsText = page.locator('//div[contains(text(),"Stock Details")]');
    this.uploadItemImagesText = page.locator('//label[@class="mb-1"]');
    this.enterItemName = page.getByTestId('item-name');
    this.enterItemCode = page.locator('id=sku_code');
    this.enterItemDescription = page.locator('id=description');// , placeholder=Enter Description');
    this.enterSalesPrice = page.locator("id=sales_price");// or "getByPlaceholder('ex: ₹200').nth(1)");
    this.enterPurchasePrice = page.locator('id=purchase_price');//, input:has(:placeholder("ex: ₹200"))');
    this.wholeSalePriceButton = page.locator("//button//*[contains(text(),'Wholesale')]");
    this.wholeSalePriceField = page.locator("//input[@id='wholesale_price']");
    this.wholeSaleQuantityField = page.locator("//input[@id='wholesale_quantity']");
    this.taxSelector = page.locator("//mbb-dropdown-v2//*[contains(text(),'Tax')]").first();
    this.selectWithTax = page.locator("//mbb-dropdown-v2//*[contains(text(),'With Tax')]").first();
    this.selectWithoutTax = page.locator("//mbb-dropdown-v2//*[contains(text(),'Without Tax')]").first();
    this.itemTypeText = page.locator('/html[1]/body[1]/app-root[1]/div[1]/div[1]/div[2]/app-home[1]/app-add-item[1]/div[1]/form[1]/div[2]/div[1]/div[1]/div[2]/div[2]/label[1]');
    this.itemTypeProduct = page.getByText('Product', { exact: true });
    this.itemTypeService = page.getByText('Service', { exact: true });
    this.dropDownArrow = page.locator('//mbb-dropdown-icon[@class="rotate"]//*[name()="svg"]');
    this.withoutTax = page.getByText('Without Tax').nth(1);
    this.withTax = page.getByRole('listitem').filter({ hasText: 'With Tax' }).locator('a');
    this.saveItemButton = page.getByRole('button', { name: 'Save' });
    this.categoryDropDown = page.locator("//mbb-dropdown-v2[@placeholder='Select Category']//div[@class='mbb-dropdown-container']");
    this.firstCategory = page.locator("//*[@placeholder='Select Category']//div[contains(@class,'mbb-option')]").first();
    this.gstDropDown = page.locator("//mbb-dropdown-v2[@placeholder='Select Tax Rate']//div[@class='mbb-dropdown-container']").first();
    this.batchToggle = page.locator("//*[@label='Enable Batching']//div[contains(@class,'mbb-toggle')]");
    this.serialisationToggle = page.locator("//*[@label='Enable Serialisation']//div[contains(@class,'mbb-toggle')]");
    this.batchName = page.locator("//*[@id='batch_no']");
    this.expiryDayPicker = page.locator("//*[@label='Select expiry date']");
    this.datePickerConfirm = page.locator("//*[@class='confirm']");
    this.openingStock = page.locator("//*[@id='opening_stock']");
    this.serialNumberField = page.locator("//*[@id='serialised-list']//input");
    this.mrpField = page.locator("//input[@id='mrp']");
    this.choose18PercentGst = page.locator("//div[contains(@class,'mbb-option')]//*[contains(text(),'GST @ 18%')]");
    this.toastItemCreatedSuccess = page.locator("//mbb-toast");
    this.cancelItemModal = page.locator("//button//*[contains(text(),'Cancel')]");
    this.customFieldName = page.locator("//div[@class='mbb-input-fied']//mbb-typography");

    //search 
    this.searchButton = page.locator("//*[@name='ic-search']");
    this.searchBox = page.locator("//input[@placeholder='Search Item']");
    this.searchItemName = page.locator("//*[@id='mbb-table-body']/tr[1]/td[1]").first();
    this.searchItemCode = page.locator("//*[contains(text(),'Item Code')]//parent::mbb-typography/following-sibling::mbb-typography/div");
    this.searchSellingPrice = page.locator("//*[@title='Pricing Details']//*[contains(text(),'₹ 999')]");
    this.searchPurchasePrice = page.locator("//*[@title='Pricing Details']//*[contains(text(),'₹ 599')]");
    this.searchGSTRate = page.locator("//*[@title='Pricing Details']//*[contains(text(),'18%')]");
    this.searchResultFirst = page.locator("//*[@id='mbb-table-body']/tr[1]");

    //adjust stock 
    this.adjustStockButton = page.locator("//*[@label='Adjust Stock']/button");
    this.popUpAdjustStockQtyTxt = page.getByText('Adjust Stock Quantity');
    this.toastAdjustSuccess = page.locator("//*[@id='toast-container']//*[contains(text(),'successfully')]");
    this.toastEditSuccess = page.locator("//*[@class='cdk-overlay-pane']//*[contains(text(),'successfully')]");
    this.popUpItemNameText = page.getByText('//div[normalize-space()="Item Name"]');
    this.popUpItemName = page.locator('.desc.item.text-ellipsis.mt-2');
    this.addOrReduceStockTxt = page.getByText('Add or Reduce stock');
    this.popUpGodownTxt = page.getByText('Godown *');
    this.popUpAdjustQtyTxt = page.getByText('Adjust quantity');
    this.popUpRemarksTxt = page.getByText('Remarks (Optional)');
    this.godownDropDownMenu = page.locator("//*[@placeholder='Select Godown']/div");
    this.selectGodownFirst = page.locator("(//*[@placeholder='Select Godown']//div[@class='mbb-option'][1])");
    this.finalStockTxt = page.getByText('Final Stocks');
    this.adjustQtyfill = page.locator("#quantity");
    this.enterRemarks = page.locator('//textarea[@id="remarks"]');
    this.saveAdjustStock = page.locator("//button//*[contains(text(),'Save')]");
    this.batchDropDown = page.locator("//*[@placeholder='Select Batch']//*[@class='mbb-dropdown-container']");
    this.selectBatchFirst = page.locator("(//*[@placeholder='Select Batch']//*[@class='mbb-dropdown-list']/div)");

    this.addSerialNumber = page.locator("//*[contains(@class,'adjust-stock-radio')]//*[contains(text(),'Add')]/ancestor::label/span");
    this.reduceSerialNumber = page.locator("//*[contains(@class,'adjust-stock-radio')]//*[contains(text(),'Reduce')]/ancestor::label/span");
    this.serialQuantity = page.getByTestId("quantity");
    this.addNewSerialNumberField = page.getByTestId("serialised-list").locator("//td[1]//input");
    this.serialNumberList = page.getByTestId("serialised-list").locator("//tr");
    this.removeSerialNumberCheckBox = page.getByTestId("serialised-list").locator("//td[3]//input");

    //item details 
    this.itemDetailsItemNameHeader = page.locator("//mbb-screen-header//*[contains(text(),'Item')]");
    this.itemDetailsInstockText = page.getByText('in Stock');
    this.itemDetailsViewBarCodeButton = page.getByRole('button', { name: 'View Barcode' });
    this.itemDetailsTab = page.getByText('Item Details', { exact: true });
    this.itemDetailsGeneralDetailsHeader = page.locator('//div[normalize-space()="General Details"]');
    this.itemDetailsItemNameTxt = page.getByText('item details');
    this.itemDetailsItemName = page.locator('//div[@class="mt - 3"]//div[contains(text(),"Test Name")]');
    this.itemDetailsItemCode = page.locator('//label[normalize-space()="Item Code"]');
    this.itemDetailsCategory = page.locator('//label[normalize-space()="Category"]');
    this.itemDetailsCurrentStockText = page.locator('//label[normalize-space()="Current Stock"]');
    this.itemDetailsLowStockUnits = page.locator('//label[normalize-space()="Low Stock Units"]');
    this.itemDetailsItemDescription = page.locator('//label[normalize-space()="Item Description"]');
    this.stockDetailsTab = page.getByText("Stock Details", { exact: true }).first();

    this.itemDetailsCurrentStock = page.locator("//*[contains(text(),'Current Stock')]/parent::mbb-typography/following-sibling::mbb-typography");

    this.itemBatchSerialCount = page.locator("//*[@class='mbb-table']/tbody/tr");
    this.itemSerialnumberCount = page.locator("//*[@class='mbb-table']/tbody/tr");

    this.deleteItem = page.locator("//*[@name='ic-delete']");
    this.deleteButton = page.locator("//*[@class='btn-delete']").locator('visible=true');
    this.toastDeleteSuccess = page.locator("//*[@id='toast-container']//*[contains(text(),'successfully')]");

    //create new batch
    this.addNewBatchButton = page.locator("//*[@label='Add New Batch']");
    this.createBatchBatchName = page.locator("//app-add-batch-modal//*[contains(text(),'Batch No.')]/following-sibling::div//input").first();
    this.createBatchPurchasePrice = page.locator("//app-add-batch-modal//*[contains(text(),'Purchase Price')]/following-sibling::div//input").first();
    this.createBatchSalesPrice = page.locator("//app-add-batch-modal//*[contains(text(),'Sales Price')]/following-sibling::div//input").first();
    this.createBatchOpeningStock = page.locator("//app-add-batch-modal//*[contains(text(),'Opening Stock')]/following-sibling::div//input").first();
    this.createBatchGodownOptions = page.locator("//*[contains(@class,'godown-container')]");
    this.createBatchGodownAddButton = this.createBatchGodownOptions.locator("//span");
    this.createBatchGodownStockField = page.locator("(//*[contains(@class,'godown-container')]//input)[last()]");

    //stock details
    this.firstRowQuantity = page.locator("//*[@id='mbb-table-body']/tr[1]/td[3]");
    this.firstRowClosingStock = page.locator("//*[@id='mbb-table-body']/tr[1]/td[last()-1]");

    //Godown
    this.godownTab = page.getByText(' Godown ', { exact: true });
    this.transferStockModalHeader = page.locator("//app-godown-transfer-godown-modal//*[@id='mbb-modal-title']");
    this.transferButton = page.locator("//*[@featurename='transfer_godown']");
    this.godownNames = page.locator("//*[@id='mbb-table-body']/tr/td[1]");
    this.firstGodownStockCount = page.locator("//*[@id='mbb-table-body']/tr[1]/td[2]");
    this.transferFromGodown = page.locator("(//app-godown-transfer-godown-modal//mbb-dropdown)[1]");
    this.transferToGodown = page.locator("(//app-godown-transfer-godown-modal//mbb-dropdown)[2]");
    this.transferModalItemQuantity = page.locator("(//app-godown-transfer-godown-modal//input)");
    this.transferModalTransferButton = page.locator("//*[@label='Transfer']");
    this.transferSuccessfullyText = page.locator("//*[@class='transfer-stock-heading']");
    this.transferCloseButton = page.locator("//*[@id='mbb-modal-close']");
    this.transferToGodownOptions = page.locator("//*[@class='godown-value']//*[@id='dropdown-menu']//li");
    this.godownBatchDropDown = page.locator("//*[@class='mbb-dropdown-container mb-3']");

    //item settings
    this.settingBatchingToggle = page.locator("//label[@for='item_settings-0']");
    this.settingSerializationToggle = page.locator("//label[@for='item_settings-1']");
    this.stockValueCalculationText = page.locator("//*[@class='modal-body']//div[@class='title']").first();
    this.beforeExpiryText = page.locator("//*[contains(text(),'Before Expiry')]");
    this.alertBeforeExpiryToggle = page.locator("//label[@for='batchExpiryToggle']");
    this.alertBeforeExpiryDropdown = page.locator("//*[@class='expiry-alert-dropdown']");
    this.alertExpiry30Days = page.locator("//*[contains(text(),'30 Days')]");
    this.fieldNameText = page.locator("//*[contains(text(),'Field Name')]");
    this.mrpToggle = page.locator("//label[@for='item_settings-2']");
    this.wholeSalePriceToggle = page.locator("//label[@for='item_settings-3']");
    this.itemSettingCancel = page.locator("//app-settings-modal//button[text()='Cancel']");
    this.customField = page.locator("//*[contains(text(),'Custom Field')]");
    this.addNewItemCustomField = page.locator("//*[contains(text(),'Add New Field')]");
    this.enterCustomFieldName = page.getByTestId("fields-3");
    this.mgfDateVisibility = page.locator("//*[@id='fields-0']/ancestor::mbb-input-field//button");
    this.firstCustomFieldVisibility = page.locator("//*[@id='fields-3']/ancestor::mbb-input-field//button");
    this.firstCustomFieldDelete = page.locator("(//*[@name='ic-delete'])[4]");
    this.firstCustomField = page.locator("//*[@class='additional-field-input']").first();

    //category
    this.category = page.locator("//input[contains(@class,'category-search')]");
    this.addCategory = page.locator("//button[contains(text(),'Add Category')]");
    this.categoryModalHeader = page.locator("//*[@class='title']").first();
    this.categoryField = page.getByPlaceholder("Enter category name");
    this.categoryNewCategory = page.locator("//*[contains(@class,'mbb-dropdown-list')]//div[contains(text(),'New Category')]");
    this.categoryFirst = page.locator("//*[contains(@class,'mbb-dropdown-list')]//div[contains(@class,'mbb-option')]").first();
    this.tableRowCount = page.locator("//*[@class='mbb-table']/tbody/tr/th");
    this.editCategoryFirst = page.locator("//*[@name='ic-edit']").first();
    this.deleteCategory = page.getByText("Delete Category");
    this.categoryNewCategoryEdit = page.locator("(//*[contains(@class,'mbb-option')]//*[contains(text(),'0')])[1]//ancestor::div[contains(@class,'mbb-option')]//mbb-button");

    this.tableHeader = "//table//tr[1]//*[contains(text(),'Item Name')]";

    this.bulkSuccessModal = page.locator("//app-success-warning-modal//button");
  }

  getnumber(value){
    value = value.toString();
    let decimalValue = parseFloat(parseFloat(value.replace(/[^0-9.]/g, '')).toFixed(2));
    return decimalValue;
  }

  async goTo() {
    await this.leftNavItemsBtn.click();
    new Promise(function (resolve) {setTimeout(resolve, 1500)});
    await this.page.waitForLoadState('domcontentloaded');
    try{
      await this.bulkSuccessModal.waitFor({timeout:2000});
      await this.bulkSuccessModal.click({timeout:2000});
    }
    catch{}
    try{
      await this.gotItButton.waitFor({timeout:2000});
      await this.gotItButton.click({timeout:2000});
    }
    catch{}
    try {
      await this.page.waitForSelector(this.tableHeader, { timeout: 5000 });
    }
    catch {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    }
  }

  async enableSerialisation() {
    await this.itemSettingsButton.click();
    try {
      await expect(await this.fieldNameText).toBeHidden({ timeout: 2000 });
      await this.settingSerializationToggle.click();
      try {
        await this.serialisationModal_next.click({ timeout: 2000 });
        await this.serialisationModal_next.click();
        await this.serialisationModal_done.click();
      }
      catch (error) {

      }
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.itemSettingCancel.click();
    }
  }

  async enableBatching() {
    await this.itemSettingsButton.click();
    try {
      await expect(this.beforeExpiryText).toBeHidden({ timeout: 2000 });
      await this.settingBatchingToggle.click();
      await this.saveItemButton.click();
      try {
        await this.serialisationModal_next.click({ timeout: 2000 });
        await this.serialisationModal_next.click();
        await this.serialisationModal_next.click();
        await this.serialisationModal_done.click();
      }
      catch { }
      await this.toastContainerClose.click({ timeout: 2000 });
    }
    catch {
      await this.itemSettingCancel.click();
    }
  }

  //if there are no serialised item present
  async disableSerialisation() {
    await this.itemSettingsButton.click();
    try {
      await expect(this.fieldNameText).toBeVisible({ timeout: 2000 });
      await this.settingSerializationToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch (error) {
      await this.itemSettingCancel.click();
    }
  }


  //if there are no batched item present
  async disableBatching() {
    await this.itemSettingsButton.click();
    try {
      await expect(this.beforeExpiryText).toBeVisible({ timeout: 2000 });
      await this.settingBatchingToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.itemSettingCancel.click();
    }
  }


  async enableMRP() {
    try {
      await this.createItemButton.click();
      await this.pricingDetailsTab.click();
      await expect(this.mrpField).toBeHidden({ timeout: 2000 });
      await this.cancelItemModal.click();
      await this.itemSettingsButton.click();
      await this.mrpToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.cancelItemModal.click();
    }
  }

  async disableMRP() {
    try {
      await this.createItemButton.click();
      await this.pricingDetailsTab.click();
      await expect(this.mrpField).toBeVisible({ timeout: 2000 });
      await this.cancelItemModal.click();
      await this.itemSettingsButton.click();
      await this.mrpToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.cancelItemModal.click();
    }
  }

  async enableWholesalePrice() {
    try {
      await this.createItemButton.click();
      await this.pricingDetailsTab.click();
      await expect(this.wholeSalePriceButton).toBeHidden({ timeout: 2000 });
      await this.cancelItemModal.click();
      await this.itemSettingsButton.click();
      await this.wholeSalePriceToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.cancelItemModal.click();
    }
  }

  async disableWholesalePrice() {
    try {
      await this.createItemButton.click();
      await this.pricingDetailsTab.click();
      await expect(this.wholeSalePriceButton).toBeVisible({ timeout: 2000 });
      await this.cancelItemModal.click();
      await this.itemSettingsButton.click();
      await this.wholeSalePriceToggle.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.cancelItemModal.click();
    }
  }

  async enableExpirtAlert() {
    try {
      await this.itemSettingsButton.click();
      await expect(this.alertBeforeExpiryDropdown).toBeHidden({ timeout: 2000 });
      await this.alertBeforeExpiryToggle.click();
      await this.alertBeforeExpiryDropdown.click();
      await this.alertExpiry30Days.click();
      await this.saveItemButton.click({ timeout: 2000 });
    }
    catch {
      await this.itemSettingCancel.click();
    }
  }

  async addCustomField() {
    try {
      await this.itemSettingsButton.click();
      await this.customField.click();
      await this.addNewItemCustomField.click();
      await this.enterCustomFieldName.click();
      await this.enterCustomFieldName.fill(itemPageStrings.FIRST_CUSTOM_FIELD);
      await this.mgfDateVisibility.click();
      await this.firstCustomFieldVisibility.click();
      await this.saveItemButton.click({ timeout: 2000 });
      await this.itemSettingCancel.click({ timeout: 2000 });
    }
    catch {
      await this.itemSettingCancel.click();
    }
  }

  async deleteCustomField() {
    try {
      await this.itemSettingsButton.click();
      await this.customField.click();
      await this.firstCustomFieldDelete.click({ timeout: 2000 });
      await this.saveItemButton.click({ timeout: 2000 });
      await this.itemSettingCancel.click({ timeout: 2000 });
    }
    catch {
      await this.saveItemButton.click();
      await this.itemSettingCancel.click();
    }
  }

  async searchItem(itemName){
    let attempt = 0;
    while(attempt < 2){
      try{
        await this.searchButton.click();
        new Promise(function (resolve) {setTimeout(resolve, 1500)});
        await this.searchBox.fill(itemName);
        await expect(this.searchItemName).toContainText(itemName, { timeout: 2000 });
        break;
      }
      catch(error){
        attempt++;
      }
    }
  }

  //select godown in items transfer modal
  async selectGodownInTransferModal(godown,type){
    let j = 0;
    if(type == "from"){j = 1;}
    else if(type == "to"){j = 2;}

    const transferToGodownOptions = `(//*[@class='godown-value']//*[@id='dropdown-menu'])[${j}]//li`;

    let godownOptions = await this.page.locator(transferToGodownOptions);
    let optionsCount = await this.page.locator(transferToGodownOptions).count();

    for(let i=0; i<optionsCount; i++){
        let optionValue = await godownOptions.nth(i).textContent();
        if(optionValue == godown){     //select if name does not match current godown
            await this.page.locator(transferToGodownOptions).nth(i).click();
            break;
        }
    }
}

}


module.exports = { ItemPage };
