const { expect } = require('@playwright/test');
const { PARTYLEFTBARNAVURL, CREATEPARTYURL } = require('../constants/PartyUrl')

const data = JSON.parse(JSON.stringify(require('../resources/createParty.json')));
class PartyPage {
    constructor(page) {
        this.page = page;
        this.gotItTextBtn = page.locator('text=Got It');
        this.partyHeaderText = page.locator('text=Parties').nth(1);
        this.leftNavPartyBtn = page.locator('text=parties');
        this.okayTextBtn = page.locator('text=Okay');
        this.toCollectText = page.locator('text=To Collect');
        this.toCollectAmount = page.getByTitle('To Collect');
        this.toPay = page.locator('text=To Pay');
        this.toPayAmount = page.getByTitle('To Pay');
        this.AllText = page.getByTitle('All Parties');
        this.partySettings = page.locator('[featurename="party_settings"]');
        this.bulkAction = page.locator('[featurename="bulk_import"]');
        this.report = page.locator('[featurename="reports_dropdown"]');
        this.appHelp = page.locator('//app-contextual-help/div[@class="contextual-help"]//img');
        this.createpartyBtn = page.locator('//div[contains(text(), "Create Party")]/ancestor::button');
        this.createPartyHeader = page.locator('#header >> text=Create Party');
        this.generalDetailsText = page.locator('text=General Details');
        this.partyName = page.locator('[formcontrolname="name"]');
        this.partyMobileNumber = page.locator('[formcontrolname="mobile_number"]');
        this.partyEmail = page.locator('[formcontrolname="email"]');
        this.openingBalance = page.locator('[formcontrolname="opening_balance"]');
        this.addCustomFieldBtn = page.locator('text=Add Custom Fields');
        this.customFieldText = page.locator('text=Now you can add custom party fields like Birthday, ID Number, etc.');
        this.customFieldImg = page.locator('img[alt="Party\\ custom\\ field\\ image"]');
        this.customFieldPartySettings = page.locator('app-settings-modal >> text=Party Settings');
        this.addCustomFieldBtnForm = page.locator('text=+ Add Custom Field');
        this.customFieldBox = page.locator('[placeholder="Enter\\ custom\\ field\\ name"]');
        this.closeAddBtn = page.locator('text=Add close >> button');
        this.deleteCustomFieldBtn = page.locator('text=Delete').nth(2);
        this.deleteYesBtn = page.locator('app-settings-modal >> text=Yes, Delete');
        this.customFieldCancelBtn = page.locator('text=Now you can add custom party fields like Birthday, ID Number, etc. + Add Custom  >> button').first();
        this.addCustomFieldSaveBtn = page.locator('app-settings-modal >> text=Save');
        this.partyTypeDropDown = page.locator('text=Customer Customer Supplier >> #dropdownMenuButton');
        this.partyTypeCustomer = page.locator('#general-info-container a:has-text("Customer")');
        this.partyTypeSupplier = page.locator('a:has-text("Supplier")');
        this.partyGST = page.locator('[formcontrolname="gst_number"]');
        this.fetchPartyDetailsThroughGSToverlay = page.locator('#add-party-container > .backdrop-ftux');
        this.getGSTDetailsButton = page.getByRole('button', { name: 'Get Details' });
        this.partyPanNumber = page.locator('[formcontrolname="pan_number"]');
        this.billingAdress = page.locator('[formcontrolname="display_billing_address"]');
        this.streetAddress = page.getByRole('textbox', { name: 'Enter Street Address' });
        this.state = page.getByRole('textbox', { name: 'Enter State' });
        this.pincode = page.locator('text=State Karnataka Pincode >> [placeholder="Enter\\ pin\\ code"]');
        this.saveBillingAddressBtn = page.locator('div[class="modal modal-backdrop in"] button[type="submit"]');
        this.selectState = page.getByRole('listitem');
        this.city = page.locator('text=Street Address *State Andaman & Nicobar Islands Andhra Pradesh Arunachal Pradesh >> [placeholder="Enter\\ City"]');
        this.shippingAddressTextField = page.locator('[formcontrolname="display_shipping_address"]');
        this.shippingAddressSameAsBillingCheckbox = page.locator('div', { has: page.locator('[formcontrolname="addressCheckbox"]') }).locator('[for="cbx"]');
        this.creditPeriod = page.locator('input[placeholder="Enter"]');
        this.creditLimit = page.locator('input[formcontrolname="credit_limit"]');
        this.customFieldHeader = page.locator('div[class="title-row border-top"] div[class="title"]');
        this.customFieldImg = page.locator('text=Custom Field Store more information about your parties by adding custom fields f >> img');
        this.customFieldVisible = page.locator('[placeholder="Custom\\ Value"]').first();
        this.closeCustomFieldPopUp = page.locator('text=Party Settings close >> div').nth(1);
        this.saveCreateParty = page.locator('text=Save Alt + Enter');
        this.searchBtn = page.locator('//mbb-search');
        this.searchBar = page.locator('#search-input');
        this.partyNameLaptopSales = page.locator('text=Laptop Sales');
        this.partyDetailsPartyHeader = page.locator('//mbb-screen-header/div/div/mbb-typography');
        this.deletePartyButton = page.locator('//mbb-icon[@name="ic-delete"]/ancestor::mbb-button');
        this.deletePartyConfirmationButton = page.locator('//app-parties-show/app-modal//button[@class="btn-delete"]');
        this.notificationToast = page.locator('#toast-container');
        this.partyDetailsBackButton = page.locator('//*[@name="ic-arrow-narrow-left"]');
        this.tableHeader = '//table//tr[1]//*[contains(text(),"Party Name")]';
    }

    async goTo() {
        await this.leftNavPartyBtn.click();
        await expect(this.page).toHaveURL(PARTYLEFTBARNAVURL);
        await this.gotItTextBtn.click();
        try {
            await this.page.waitForSelector(this.tableHeader, { timeout: 5000 });
        }
        catch {
            await this.page.reload({ waitUntil: 'domcontentloaded' });
        }
    }

    async createParty(data) {
        await expect(this.page).toHaveURL(CREATEPARTYURL);
        await expect(this.createPartyHeader).toBeVisible();
        await expect(this.generalDetailsText).toBeVisible();
        await expect(this.fetchPartyDetailsThroughGSToverlay).toBeVisible();
        await this.okayTextBtn.click();

        await this.partyName.click();
        await this.partyName.fill(data.name);
        await this.partyMobileNumber.click();
        await this.partyMobileNumber.fill(data.mobile);
        await this.partyEmail.click();
        await this.partyEmail.fill(data.email);
        await this.openingBalance.click();
        await this.openingBalance.fill(data.openingBalance);
        if (data.partyType == "customer") {
            await this.partyTypeDropDown.click();
            await this.partyTypeCustomer.click();
        }
        await this.partyGST.click();
        await this.partyGST.fill(data.GSTIN);
        await this.partyPanNumber.click();
        await this.partyPanNumber.fill(data.panNumber);
        await this.billingAdress.click();
        await this.city.click();
        await this.city.fill(data.city);
        await this.streetAddress.click();
        await this.streetAddress.fill(data.streetAddress);
        await this.state.click();
        await this.state.fill(data.state);
        await this.selectState.filter({ hasText: `${data.state}` }).click();
        await this.pincode.click();
        await this.pincode.fill(data.pincode);
        await this.saveBillingAddressBtn.click();
        await this.shippingAddressSameAsBillingCheckbox.click();
        await this.creditPeriod.click();
        await this.creditLimit.click();
        await this.creditLimit.fill(data.creditLimit);
        await this.saveCreateParty.click();
        await expect(this.partyDetailsPartyHeader).toBeVisible();
        await expect(this.notificationToast).toBeVisible();
        await expect(this.notificationToast).toContainText('Party created successfully');
    }

    async createPartyThroughGST(data) {
        await expect(this.getGSTDetailsButton).toBeDisabled();
        await this.partyGST.click();
        await this.partyGST.fill(data.GSTIN);
        await expect(this.getGSTDetailsButton).toBeEnabled();
        await this.getGSTDetailsButton.click();
        await expect(this.notificationToast).toBeVisible();
        await expect(this.notificationToast).toContainText('Party details updated');
        // validate that the fields are populated with data fetched through GST
        await expect(this.partyName).not.toBeEmpty();
        await expect(this.partyMobileNumber).not.toBeEmpty();
        await expect(this.partyGST).not.toBeEmpty();
        await expect(this.partyPanNumber).not.toBeEmpty();
        await expect(this.billingAdress).not.toBeEmpty();
        await expect(this.shippingAddressTextField).not.toBeEmpty();
        await this.saveCreateParty.click();
        await expect(this.partyDetailsPartyHeader).toBeVisible();
        await expect(this.notificationToast).toBeVisible()
        await expect(this.notificationToast).toContainText('Party created successfully');
    }
}
module.exports = { PartyPage };