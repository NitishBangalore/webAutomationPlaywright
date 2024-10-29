class GodownPage {
    constructor(page) {
        this.page = page;
        this.leftNavGodownBtn = page.getByTestId('left-nav-body').getByText('Godown (Warehouse)');
        this.gotItButton = page.locator('text=Got It');
        this.godownPageHeader = page.getByTestId('screen-header-title');
        this.godownName = page.locator("(//*[contains(@class,'godown-details-container')]//mbb-typography)[1]");
        this.godownAddress = page.locator("(//*[contains(@class,'godown-details-container')]//mbb-typography)[2]");
        this.mainGodownTag = page.locator("//*[contains(@class,'godown-details-container ')]//mbb-tag");
        this.transferStockButton = page.locator("//*[@label='Transfer Stock']");
        this.createGodownButton = page.locator("//*[@featurename='create_godown']");
        this.deleteGodownButton = page.locator("//*[@featurename='delete_godown']");
        this.confirmDelete = page.locator("//*[@class='btn-delete']");
        
        this.godownChangeDropDown = page.locator("//*[@valuefield='id']");
        this.godownChangeDropOptions = page.locator("//mbb-dropdown-v2//*[@class='mbb-option']");

        //godown Table
        this.godownEmptyState = page.locator("//*[@class='mbb-table']//*[@class='empty-state']");
        this.godownItems = page.locator("//tbody//tr");
        this.gowownItemsSelect = page.locator("//tbody//tr//mbb-checkbox");
        this.firstItemName = page.locator("//tbody//tr[1]/td[1]");
        this.fitstItemQuantity = page.locator("//tbody//tr[1]/td[4]");

        this.toast = page.locator("//*[@id='toast-container']//*[@role='alert']");

        //enable godown
        this.enableGodownButton = page.locator("//button//*[contains(text(),'Enable')]");
        this.enableGodownModalSubmit = page.locator("//*[@id='button-submit']/div");
        this.enableGodownModalTitle = page.locator("//label[@class='title']");
        this.enableGodownModalOkay = page.locator("//button[contains(text(),'Okay')]");

        //create godown
        this.createGodownHeader = page.locator("#mbb-modal-title");
        this.createGodownNameField = page.locator("//*[@formcontrolname='name']");
        this.createGodownAddress = page.locator("//*[@formcontrolname='street_address']");
        this.createGodownState = page.locator("//*[@class='godown-value']//*[@id='searchInput']");
        this.selectFirstState = page.locator("//*[@class='godown-value']//*[@id='dropdown-menu']//*[@tabindex='0']");
        this.createGodownPin = page.locator("//*[@formcontrolname='pincode']");
        this.createGodownCity = page.locator("//*[@formcontrolname='city']");
        this.saveButton = page.getByRole('button', { name: 'Save' });

        //transfer stock modal
        this.transferStockModalHeader = page.locator("//app-godown-transfer-godown-modal//*[@id='mbb-modal-title']");
        this.transferFromGodown = page.locator("(//app-godown-transfer-godown-modal//input)[1]");
        this.transferModalItemQuantity = page.locator("(//app-godown-transfer-godown-modal//input)[2]");
        this.transferToGodownDropdown = page.locator("//app-godown-transfer-godown-modal//mbb-dropdown");
        this.transferToGodown = page.locator("//mbb-dropdown//*[contains(text(),'GODOWN_1')]")
        this.transferToGodownOptions = page.locator("//*[@class='godown-value']//*[@id='dropdown-menu']//li");
        this.transferModalTransferButton = page.locator("//*[@label='Transfer']");
        this.transferInProgressText = page.locator("//*[contains(text(),'Transfer in progress')]");
        this.transferModalCurrentStock = page.locator("//*[contains(text(),'Current Stock:')]");
        this.transferItemQuantity = page.locator("//*[@formcontrolname='setQuantity']");
        this.transferItemCount = page.locator("//*[@class='text-color-blue']");
        this.transferConfirmCheck = page.locator("//*[@for='cbx_transfer']");
        this.transferSuccessfullyText = page.locator("//*[@class='transfer-stock-heading']");
        this.transferCloseButton = page.locator("//*[@id='mbb-modal-close']");


    }

    async switchGodown(switchToGodownName){
        let retries = 3; // Set a maximum number of retries
        let attempt = 0;

        while (attempt < retries) {
            try {
                attempt++;  // Increment attempt counter
                await this.page.waitForTimeout(1500);
                await this.godownChangeDropDown.click({timeout: 2000});
                await this.godownChangeDropOptions.first().waitFor();

                let godownOptions = await this.godownChangeDropOptions;
                let optionsCount = await this.godownChangeDropOptions.count();

                for(let i=0; i<optionsCount; i++){
                    let optionValue = (await godownOptions.nth(i).textContent()).trim();

                    if(optionValue==switchToGodownName){      //  select if name matches to the argument value
                        await this.godownChangeDropOptions.nth(i).click();
                        await this.godownName.waitFor();
                        return;
                    }
                }
                break;
            } catch (error) {
                console.error(`Error on attempt ${attempt}: ${error.message}`);
                if (attempt >= retries) {
                    throw new Error(`Failed to switch godown to "${switchToGodownName}" after ${retries} attempts`);
                }
            }
        }
    }

    //select non-current godown in items transfer modal
    async selectGodownInTransferModal(currentGodown){
        await this.transferToGodownDropdown.click();

        let godownOptions = await this.transferToGodownOptions;
        let optionsCount = await this.transferToGodownOptions.count();

        for(let i=0; i<optionsCount; i++){
            let optionValue = await godownOptions.nth(i).textContent();
            if(optionValue!=currentGodown){     //select if name does not match current godown
                await this.transferToGodownOptions.nth(i).click();
                break;
            }
        }
    }

}
module.exports = { GodownPage };