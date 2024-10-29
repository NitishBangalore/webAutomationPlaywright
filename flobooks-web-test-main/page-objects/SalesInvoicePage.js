const { expect } = require("@playwright/test");
const SalesInvoiceStrings = require("../constants/SalesInvoiceStrings");

class SalesInvoicePage {
    constructor(page) {
        this.page = page;
        this.leftNavSalesBtn = page.getByTestId('left-nav-body').getByText('Sales').first();
        this.createSalesInvoiceLeftNavButton = page.locator("//div[@featurename = 'create_voucher']//div[contains(text(),' Create Sales Invoice ')]");
        this.createSalesInvoiceHeader = page.locator("div[class='title text-capitalize d-flex align-items-center'] div");
        this.gotItText = page.locator('text=Got It');
        this.addPartyButton = page.getByText('+ Add Party Shift + Y');
        this.partySearchNameResult = page.locator("//ul//*[contains(text(),'test')]").first();
        this.searchParty = page.getByPlaceholder('Search party by name or number');
        this.viewDetailsArrowButton = page.locator(".view.d-flex.align-items-center.mr-3.justify-content-end");
        this.BillToText = page.locator("div[class='title border-bottom-1 d-flex align-items-center justify-content-between'] div:nth-child(1)");
        this.setCashAsDefaultCheckBox = page.locator("//div[contains(@class,'voucher-party-header')]//*[contains(text(),' Set Cash Sale as default')]");
        this.salesInvoiceNumber = page.locator("//div[@class='title text-capitalize']");
        this.salesInvoiceDate = page.locator(".title.bg-white.text-capitalize");
        this.paymentTerms = page.locator("div[class='Row mr-2 z-index-1'] div[class='title bg-white']");
        this.dueDate = page.locator("div[class='Row z-index-1'] div[class='title bg-white']");
        this.closeDueDateButton = page.locator("//i[@class='material-icons position-absolute cursor-pointer']");
        this.itemNoText = page.locator("//div[@class='col-1 item-h']");
        this.hideViewDetailButton = page.locator('.view.d-flex.align-items-center.mr-3.justify-content-end');
        this.itemsServiceText = page.locator("//div[@class='w-100 item-h']");
        this.hsnSacText = page.locator("//div[contains(@class,'items-table')]//*[contains(text(),'HSN/ SAC')]");
        this.quantityText = page.locator("//div[normalize-space()='Qty']");
        this.priceItemText = page.locator("//div[contains(text(),'Price/Item (₹)')]");
        this.discountText = page.locator("//div[normalize-space()='Discount']");
        this.taxText = page.locator("//div[normalize-space()='Tax']");
        this.amountText = page.locator("//div[@class='item-h col-3']");
        this.addColumnsButtom = page.locator("//i[@class='material-icons']");
        this.itemsColumn = page.locator("//i[@class='material-icons']")
        this.scanBarcode = page.locator('text=Scan Barcode Shift + B');
        this.subtotalText = page.locator("//div[@class='title text-right text-uppercase w-100']");
        this.addNotesButton = page.locator("div[class='cursor-pointer focus-bg']");
        this.termsAndConditionHeader = page.locator("div[class='text-color-black']");
        this.termsAndConditionText = page.locator("//textarea[@id='invoice-tnc']");
        this.addBankAccountButton = page.locator("//div[@class='title text-decoration-underline focus-bg']");
        this.taxableAmountHeader = page.locator("div[class='tax-row'] div[class='title']");
        this.addAdditionalChargesButton = page.locator("body > app-root:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > app-home:nth-child(2) > app-voucher-create-v2:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(4) > app-voucher-bill-details:nth-child(2) > div:nth-child(1) > div:nth-child(5)");
        this.totalAmount = page.getByText('Total Amount', { exact: true });
        this.autoRoundOffcheckBox = page.locator('text=Auto Round Off');
        this.amountRecieved = page.locator("//label[@class='w-60 font-14']");
        this.balanceAmount = page.locator("//div[normalize-space()='Balance Amount']");
        this.signatureText = page.locator("//div[@class='mb-2 font-14']");
        this.partyNameSearch = page.getByText('testParty 0.0').first();
        this.businessName = page.locator("//div[contains(@class,'company-details')]//*[contains(text(),'Test Enterprise')]");
        this.partyNameBillingsection = page.locator('div[class="w-100 body px-10"] div[class="font-14 color-black text-ellipsis text-bold"]');
        this.partyNumber = page.locator('body > app-root:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > app-home:nth-child(2) > app-voucher-create-v2:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > app-voucher-party-address:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)');
        this.partyPanNumber = page.locator('body > app-root:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > app-home:nth-child(2) > app-voucher-create-v2:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > app-voucher-party-address:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)');
        this.partyGSTIN = page.locator('/html[1]/body[1]/app-root[1]/div[1]/div[1]/div[2]/app-home[1]/app-voucher-create-v2[1]/div[2]/div[2]/div[1]/app-voucher-party-address[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]');
        this.billAddress = page.locator("//div[@class='w-100 body px-10']//div[@class='d-flex align-items-start']//div[@class='label']");
        this.billPhoneNumber = page.getByText(SalesInvoiceStrings.BILL_PHONE_NUMBER).nth(1);
        this.billPanNumber = page.getByText(SalesInvoiceStrings.BILL_PAN_NUMBER);
        this.billGST = page.getByText(SalesInvoiceStrings.BILL_GSTIN);
        this.addItems = page.locator("//div[@class='add-item']/div");
        this.searchItemField = page.getByPlaceholder("Search Items");
        this.addItemHeaderText = page.getByText('Add Items');
        this.itemName = page.getByRole('cell', { name: 'Item Name' });
        this.itemCode = page.getByRole('cell', { name: 'ITEM Code' });
        this.itemSalesPrice = page.getByRole('cell', { name: 'Sales Price' });
        this.itemPurchasePrice = page.getByRole('cell', { name: 'Sales Price' });
        this.itemCurrentStock = page.getByRole('cell', { name: 'Current Stock' });
        this.itemQuantity = page.getByRole('cell', { name: 'Quantity' });
        this.BoatRockerz = page.getByRole('row', { name: 'Boat Rockerz 450 977652149391 ₹ 1,770 ₹ 1,180 95 PCS + Add' }).getByText('+ Add');
        this.itemNameDetail = page.locator("//*[contains(@class,'mbb-modal-header')]//mbb-typography");
        this.itemBusinessName = page.locator('//div[@class="godown-name text-ellipsis max-width-200"]');
        this.addItemButton = page.locator("//td//span[contains(text(),'Add')]").first();
        this.addItemGodownPopUp = page.locator("//div[contains(@class,'godowns-container')]//span[contains(text(),'Add')]").first();
        this.saveItemButton = page.locator("//mbb-button//div[contains(text(),'Save')]");
        this.itemDoneButton = page.getByRole('button', { name: 'Done' });
        this.itemNumber = page.locator('#voucher-body').getByText('No', { exact: true });
        this.itemItems = page.getByTestId('voucher-body').getByText('Items', { exact: true });
        this.itemHSN = page.getByText('HSN', { exact: true });
        this.itemQuantityText = page.getByText('Qty', { exact: true });
        this.itemPrice = page.getByText('Price/Item (₹)');
        this.itemDiscount = page.getByText('Discount', { exact: true });
        this.itemTax = page.getByText('Tax', { exact: true });
        this.itemAmount = page.getByText('Amount (₹)');
        this.saveSalesVoucher = page.locator('#submit-button');
        this.downloadPdfButton = page.locator("//*[contains(text(),'Download PDF')]");
        this.closeToastButton = page.locator('#toast-container').getByText('close');
        this.printButton = page.locator("//*[contains(text(),'Print PDF')]");
        this.printDropDown = page.locator("(//*[@class='suffix overlay'])[2]");
        this.printThermalButton = page.locator("//*[contains(text(),'Print Thermal')]");
        this.deleteButton = page.locator("//*[@name='ic-delete']" );
        this.yesDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.changePartyButton = page.getByRole('button', { name: 'Change Party' });
        this.secondPartySearch = page.locator('//div[normalize-space()="Raj"]');
        this.secondPartyBillTo = page.getByText('Raj').first();
        this.secondPPartyShipTo = page.getByText('Raj').nth(1);
        this.changeShippingAddressButton = page.locator('//button[@id="focusAfterParty"]');
        this.changeShippingAddressCheck = page.locator("changeShippingAddressCheck");
        this.firstShippingAddress = page.locator('div:nth-child(3) > div:nth-child(3) > .radio-container > .checkmark');
        this.secondShippingAddress = page.locator("(//*[@class='address-list']//div//label/span)[2]");
        this.changeShippingAddressDone = page.getByRole('button', { name: 'Done' });

        //pdf locators 
        this.companyName = page.frameLocator('#invoice-preview-iframe').locator('#company-name');
        this.taxInvoiceHeader = page.frameLocator('#invoice-preview-iframe').getByText('TAX INVOICE');
        this.orignalForReciept = page.frameLocator('#invoice-preview-iframe').getByText('Original for Recipient');
        this.companyLogo = page.frameLocator('#invoice-preview-iframe').locator('#company-logo');
        this.companyPhoneNumber = page.frameLocator('#invoice-preview-iframe').locator('#company-mobile-number');
        this.companyAddress = page.frameLocator('#invoice-preview-iframe').locator('#company-address');
        this.InvoiceNo = page.frameLocator('#invoice-preview-iframe').locator('#invoice-number');
        this.InvoiceDate = page.frameLocator('#invoice-preview-iframe').locator('#invoice-date');
        this.InvoiceDueDate = page.frameLocator('#invoice-preview-iframe').locator('#invoice-due-date');
        this.BillTo = page.frameLocator('#invoice-preview-iframe').getByText('BILL TO');
        this.ShipTo = page.frameLocator('#invoice-preview-iframe').getByText('SHIP TO');
        this.BillTocompanyName = page.frameLocator('#invoice-preview-iframe').locator('#bill-to-company-name');
        this.ShipToCompanyName = page.frameLocator('#invoice-preview-iframe').locator('#ship-to-company-name');
        this.pdfPartyAddress = page.frameLocator('#invoice-preview-iframe').locator("#bill-to-place-of-supply");
        this.pdfItems = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'ITEMS' });
        this.pdfHSN = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'HSN' });
        this.pdfQuantity = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'QTY.' });
        this.pdfRate = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'RATE' });
        this.pdfTax = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'TAX' });
        this.pdfAmount = page.frameLocator('#invoice-preview-iframe').getByRole('columnheader', { name: 'AMOUNT' });
        this.pdfSubtotal = page.frameLocator('#invoice-preview-iframe').getByRole('cell', { name: 'SUBTOTAL', exact: true });
        this.pdfBankDetails = page.frameLocator('#invoice-preview-iframe').getByText('BANK DETAILS');
        this.pdfTermsAndCondition = page.frameLocator('#invoice-preview-iframe').getByText('TERMS AND CONDITIONS');
        this.pdfTotalAmount = page.frameLocator('#invoice-preview-iframe').getByRole('cell', { name: 'TOTAL AMOUNT', exact: true });
        this.pdfTotalAmountinWords = page.frameLocator('#invoice-preview-iframe').getByText('Total Amount (in words)');
        this.checkBoxVoucher = page.locator("//tr//label");
        this.pdfInvoiceAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='invoice-total-table']//*[contains(text(),'TOTAL')]/following-sibling::td | //*[@id='items-table-total-amount']").last();

        this.pdfItemsCount = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='items-table-content']/tr");     //output is 2 more than actual item count
        this.pdfItemRate = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'item-rate')]");
        this.pdfItemQuantity = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'item-quantity')]");
        this.pdfItemTaxRate = page.frameLocator('#invoice-preview-iframe').locator("//*[@class='item-tax-percentage']");
        this.pdfItemTaxAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[@class='item-tax-amount']");
        this.pdfItemTotalAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'item-total')]");
        this.pdfItemDiscountAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[@class='item-discount-amount']");
        this.pdfItemDiscountPercent = page.frameLocator('#invoice-preview-iframe').locator("//*[@class='item-discount-percentage']");
        this.pdfInvoiceItemTotalTax = page.frameLocator('#invoice-preview-iframe')
            .locator("//*[@id='items-table-total-cgst'] | //*[@id='items-table-total-sgst'] | //*[@id='items-table-total-igst'] | //*[@id='items-table-total-utgst'] | //*[@id='items-table-total-tax']");
        this.pdfAdditionalChargeWOtax = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='invoice-bottom-content-right']//*[contains(text(),'charge')]/following-sibling::td | //*[contains(@class,'charge')]/following-sibling::td[last()]");
        this.pdfInvoiceItemTotalDiscount = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='items-table-total-discount']");
        this.pdfItemCessRate = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'item-cess-percentage')]");
        this.pdfItemCessAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'item-cess-amount')]");
        this.pdfItemTotalCess = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='items-table-total-cess']");

        this.pdfInvoiceTaxableAmount = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='invoice-bottom-content-right']//*[contains(text(),'TAXABLE')]/following-sibling::td");
        this.pdfInvoiceTaxableAmount_2 = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'tax-value')]");
        this.pdfInvoiceTotalCess = page.frameLocator('#invoice-preview-iframe').locator("(//*[@id='invoice-bottom-content-right']//*[contains(text(),'Cess')]/following-sibling::td)");
        this.pdfInvoiceTotalCess_2 = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'tax-cess ')]");
        this.pdfInvoiceTotalTax = page.frameLocator('#invoice-preview-iframe')
            .locator("(//*[@id='invoice-bottom-content-right']//*[contains(text(),'CGST') or contains(text(),'IGST') or contains(text(),'SGST') or contains(text(),'UTGST')]/following-sibling::td)");
        this.pdfInvoiceTotalTax_2 = page.frameLocator('#invoice-preview-iframe').locator("//*[contains(@class,'tax-cgst-amount') or contains(@class,'tax-sgst-amount') or contains(@class,'tax-utgst-amount') or contains(@class,'tax-igst-amount')]");
        this.pdfInvoiceTotalDiscount = page.frameLocator('#invoice-preview-iframe').locator("//*[@id='invoice-total-table']//*[contains(text(),'Discount')]/following-sibling::td");
        this.recordPaymentInButton = page.locator("//mbb-button//*[contains(text(),'Record Payment In')]");

        //sales invoice page
        this.newUserSalesInvoice = page.locator('//span[contains(text(),"No Sales Invoice made during the selected time per")]');
        this.salesInvoicePageHeader = page.locator('//div[@class="title d - flex align - items - center"]');
        this.salesInvoicePageSubHeader = page.locator('//div[normalize-space()="Bill your sales to customers"]');
        this.dateDropDownButton = page.locator("//section[@class='mbb-datepicker-container']");
        this.dateFilterToday = page.getByText('Today').first();
        this.dateFilterYesterday = page.getByText('Yesterday').first();
        this.thirtyDays = page.locator("(//*[contains(text(),'30 Days')])[1]");
        this.twentyNineDays = page.locator("(//*[normalize-space()='29 Days'])[1]");
        this.openFirstInvoice = page.locator("//*[@id='mbb-table-body']/tr[1]/td[2]");
        this.searchInvoiceButton = page.locator("//mbb-search//button");
        this.searchSalesInvoice = page.getByPlaceholder('Search Sales Invoice');
        this.firstUnpaidinvoice = page.locator("(//td//*[contains(text(),'Unpaid')])[1]");
        this.indexInvoiceSetting = page.locator("//mbb-button//*[@name='ic-settings-outlined']");
        this.currentTheme = page.locator("//*[@class='modal-body']//*[@class='selectLabel']");
        this.themeDropDown = page.locator("//*[@id='modal-content-invoice_settings']//*[@id='dropdownMenuButton']");

        //invoice settings
        this.invoiceSettingsIndexPage = page.locator("//*[contains(@class,'invoice-settings')]");
        this.invoiceSettings = page.locator("//*[@featurename='invoice_settings']");
        this.invoicePrefixToggle = page.locator("//label[@for='invoice_settings-0']");
        this.prefixField = page.getByPlaceholder("Prefix");
        this.invoiceSettingsSequenceNumber = page.getByPlaceholder("Sequence No");
        this.invoiceSettingsSaveButton = page.getByRole("button", { name: "Save"});
        this.invoiceSettingsCancelButton = page.getByRole("button", { name: "Cancel"});

        //edit invoice 
        this.editInvoiceButton = page.getByRole('button', { name: 'Edit' });

        //batching 
        this.showBatchingButton = page.getByRole('button', { name: 'Show Batches keyboard_arrow_down' });
        this.addBatchingItem = page.locator('#item-00').getByText('+ Add');
        this.BatchHeader = page.getByText('batch no.', { exact: true });
        this.BatchNumber = page.locator("//span[normalize-space()='Batch #1']");

        //serialized item 
        this.addSerialItem = page.getByRole('row', { name: 'Iphone 14 Pro Max 122971350833 ₹ 79,000 ₹ 74,000 5 PCS + Add' }).getByText('+ Add');
        this.selectSerialItem = page.getByRole('row', { name: 'LE124152512' }).getByRole('checkbox');
        this.itemSerialNumber = page.locator('span').filter({ hasText: 'IMEI/Serial No: LE124152512' }).locator('span');
        this.lastSerialNumber = page.locator("//*[@id='scroll-table']//tr[last()]/td[1]");
        this.lastSerialCheckBox = page.locator("//*[@id='scroll-table']//tr[last()]//input");
        this.itemSerialNumberOnVoucher = page.locator("//*[@class='serial-numbers']/span");
        this.dialogSerialNumberSave = page.locator("//*[@class='serial-number-list']/parent::div/..//*[contains(text(),'Save')]");

        //Discount Button Calculation Changes
        this.discountDropDown = page.locator("//div[@class='d-flex align-items-center link cursor-pointer text-color-black']//div[@id='dropdownMenuButton']");
        this.taxableAmount = page.locator("//div[@class='invoice-details-without-discount']//div[3]//div[2]");
        this.sGST = page.locator("(//div[@class='value'][contains(text(),'₹ 135')])[1]");
        this.cGST = page.locator("(//div[@class='value'][contains(text(),'₹ 135')])[2]");
        this.addDiscountButton = page.locator("//div[contains(text(),'+ Add Discount')]");
        this.invoiceDiscountPercent = page.locator("//input[@id='invoice-discount']");
        this.totalAmount = page.locator(".value.bold");
        this.discountBeforeTax = page.locator("//span[normalize-space()='Discount Before Tax']");

        //addtional Charges 
        this.addAdditionalChargesButton = page.locator("//div[@class='link cursor-pointer focus-bg']");
        this.addAdditionalChargesInput = page.locator("//input[@id='charge']");
        this.addAdditionalChargeValueInput = page.getByRole('textbox', { name: '0' });
        this.addAdditionalChargeValueDropDown = page.locator("//mbb-dropdown[@id='additional-charges-tax-dropdown']//mbb-dropdown-icon//*[name()='svg']");
        this.noTaxApplicable = page.locator("//span[normalize-space()='No Tax Applicable']");
        this.gst18percent = page.locator("//span[normalize-space()='GST @18%']");
        this.autoRoundOffButton = page.locator("//label[@for='cbx-112']//span[@id='checkbox']//*[name()='svg']");

        //payment-in modal(pi)
        this.piAmountField = page.locator("//*[@id='amount-field']/parent::div/input");
        this.piPaymentModeDropDown = page.locator("//*[contains(text(),'Payment Type')]//parent::mbb-typography//following-sibling::mbb-dropdown-v2/div");
        this.piBankPaymentMode = page.locator("//*[contains(@class,'mbb-dropdown-list')]//*[contains(text(),'Bank')]");
        this.piPaymentReceivedInDropDown = page.locator("//*[contains(@class,'input-grid')]/div[3]/mbb-dropdown");
        this.piSelectPaymentReceiveIn = page.locator("//*[contains(@class,'input-grid')]//*[@id='dropdown-menu']/div");
        this.piNotesField = page.getByTestId('notes-payment');
        this.piSaveButton = page.locator("//button//*[contains(text(),'Save')]");

        this.itemQuantity = null;
        this.itemRate = null;
        this.itemTaxPecent = null;
        this.itemTaxAmount = null;
        this.invoiceItemTotalTax = null;
        this.itemDiscountPercent = null;
        this.itemDiscountAmount = null;
        this.invoiceItemTotalDiscount = null;
        this.itemCessAmount = null;
        this.itemCessPercent = null;
        this.invoiceItemTotalCess = null;
        this.itemTotalAmount = 0;
        
        

        this.invoiceTaxableAmount = null;
        this.invoiceTotalTax = null;
        this.invoiceTotalDiscount = null;
        this.additionalChargeWOTax = null;
        this.invoiceTotalAmount = null;

        this.itemSummedAmountWithoutTax = 0;
        this.itemSummedTax = 0;
        this.itemSummedDiscount = 0;
        this.itemSummedCess = 0;
    }

    async gotoCreateSaleInvoice() {
        await this.createSalesInvoiceLeftNavButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        try{
            await this.gotItText.waitFor({timeout:3000});
            await this.gotItText.click({timeout:3000});
        }
        catch{}
        await expect(this.page).toHaveURL(SalesInvoiceStrings.SALES_INVOICE_URL);
    }

    async gotoSalesIndexPage() {
        await this.leftNavSalesBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        try{
            await this.gotItText.click({timeout:10000});
        }
        catch{}
    }

    async assignItemTableValue(index,theme){
        this.itemQuantity = this.getValue(await this.pdfItemQuantity.nth(index).textContent());
        this.itemRate = this.getValue(await this.pdfItemRate.nth(index).textContent());

        //item tax
        if(theme != 'Advanced GST (Tally)' && theme != 'Billbook' && theme != 'Advanced GST(A5)'){
            this.itemTaxPecent = this.getValue(await this.pdfItemTaxRate.nth(index).textContent({timeout:500}));
            this.itemTaxAmount = this.getValue(await this.pdfItemTaxAmount.nth(index).textContent({timeout:500}));
            this.invoiceItemTotalTax = this.getValue(await this.pdfInvoiceItemTotalTax.textContent({timeout:500}));
        }else{ this.itemTaxPecent = 0; this.itemTaxAmount = 0; this.invoiceItemTotalTax = 0; }

        // item discount
        try{
            this.itemDiscountPercent = this.getValue(await this.pdfItemDiscountPercent.nth(index).textContent({timeout:500}));
            this.itemDiscountAmount = this.getValue(await this.pdfItemDiscountAmount.nth(index).textContent({timeout:500}));
            this.invoiceItemTotalDiscount = this.getValue(await this.pdfInvoiceItemTotalDiscount.textContent({timeout:500}));
        }catch{ this.itemDiscountPercent=0; this.itemDiscountAmount=0; this.invoiceItemTotalDiscount=0; }

        //items cess
        if(theme != 'Advanced GST (Tally)' && theme != 'Billbook'){
            this.itemCessPercent = this.getValue(await this.pdfItemCessRate.nth(index).textContent({timeout:500}));
            this.itemCessAmount = this.getValue(await this.pdfItemCessAmount.nth(index).textContent({timeout:500}));
            this.invoiceItemTotalCess = this.getValue(await this.pdfItemTotalCess.textContent({timeout:500}));
        }else{ this.itemCessPercent=0; this.itemCessAmount=0; this.invoiceItemTotalCess=0; }

        //item tax for Advanced GST(A5) theme
        if(theme == 'Advanced GST(A5)'){
            let count = await (this.page.frameLocator('#invoice-preview-iframe').locator("//tbody[@id='items-table-content']//tr[1]//*[contains(@class,'gst-percentage')]")).count();

            let amount = 0;
            let row = index +1;
            
            for(let i=0;i<count;i++){
                this.itemTaxPecent = this.getValue(await this.page.frameLocator('#invoice-preview-iframe').locator(`//tbody[@id='items-table-content']//tr[${row}]//*[contains(@class,'gst-percentage')]`).nth(i).textContent({timeout:500}));
                amount = this.getValue(await this.page.frameLocator('#invoice-preview-iframe').locator(`//tbody[@id='items-table-content']//tr[${row}]//*[contains(@class,'gst-amount')]`).nth(i).textContent({timeout:500}));

                expect(amount).toEqual(parseFloat(((this.itemRate-this.itemDiscountAmount)*this.itemQuantity*this.itemTaxPecent/100).toFixed(2)));

                this.itemTaxAmount += amount;
            }
        }

        this.itemTotalAmount = this.getValue(await this.pdfItemTotalAmount.nth(index).textContent({timeout:500}));


        this.itemSummedAmountWithoutTax += this.itemRate;
        this.itemSummedTax += this.itemTaxAmount;
        this.itemSummedDiscount += this.itemDiscountAmount;
        this.itemSummedCess += this.itemCessAmount;

        console.log(
            this.itemQuantity,
            this.itemRate,
            this.itemTaxPecent,
            this.itemTaxAmount,
            this.itemDiscountPercent,
            this.itemDiscountAmount,
            this.itemCessPercent,
            this.itemCessAmount,
            this.itemTotalAmount,
            this.itemSummedAmountWithoutTax,
            this.itemSummedTax,
            this.itemSummedCess,
            this.itemSummedDiscount +"-----------------"
        );
    }

    async assignInvoiceTableValues(theme){

        //additional charge
        try{
            this.additionalChargeWOTax = this.getValue(await this.pdfAdditionalChargeWOtax.textContent({timeout:500}));
        }catch{ this.additionalChargeWOTax=0; }

        //invoice total Taxable amount
        try{
            this.invoiceTaxableAmount = this.getValue(await this.pdfInvoiceTaxableAmount.textContent({timeout:500}));
        }catch{ this.invoiceTaxableAmount = await this.calculateTotalInvoiceTaxableValue(); }

        //invoice total tax
        try{
            this.invoiceTotalTax = await this.calculateTotalInvoiceTax(theme);
        }catch{ this.invoiceTotalTax=0; }

        //invoice total discount
        try{
            this.invoiceTotalDiscount = this.getValue(await this.pdfInvoiceTotalDiscount.textContent({timeout:500}));
        }catch{ this.invoiceTotalDiscount=0; }

        //invoice total cess
        try{
            this.invoiceTotalCess = await this.calculateTotalInvoiceCess(theme);
        }catch{ this.invoiceTotalCess=0; }

        //invoice total amount
        this.invoiceTotalAmount = this.getValue(await this.pdfInvoiceAmount.textContent());

        console.log(this.additionalChargeWOTax,
            this.invoiceTaxableAmount,
            this.invoiceTotalDiscount,
            this.invoiceTotalTax,
            this.invoiceTotalCess,
            this.invoiceTotalAmount
        );
    }

    async validateItemDiscount(){
        let discountAmount = parseFloat((this.itemQuantity*this.itemRate*this.itemDiscountPercent/100).toFixed(2));
        expect.soft(this.itemDiscountAmount).toEqual(discountAmount);
    }

    async validateItemTax(){
        let taxAmount = parseFloat((this.itemQuantity*(this.itemRate-this.itemDiscountAmount)*this.itemTaxPecent/100).toFixed(2));
        expect.soft(this.itemTaxAmount).toEqual(taxAmount);
    }

    async validateItemCess(){
        let cessAmount = parseFloat((this.itemQuantity*(this.itemRate-this.itemDiscountAmount)*this.itemCessPercent/100).toFixed(2));
        expect.soft(this.itemCessAmount).toEqual(cessAmount);
    }

    async validateItemAmount(){
        let totalAmount = parseFloat((this.itemQuantity*(this.itemRate+this.itemTaxAmount+this.itemCessAmount-this.itemDiscountAmount)).toFixed(2));
        expect.soft(parseInt(this.itemTotalAmount)).toEqual(parseInt(totalAmount));
    }

    async validateTotalItemDiscount(){
        let invoiceItemTotalDiscount = this.getValue(await this.pdfInvoiceItemTotalDiscount.textContent({timeout:500}));
        expect.soft(parseFloat((this.itemSummedDiscount).toFixed(2))).toEqual(invoiceItemTotalDiscount);
    }

    async validateTotalItemTax(){
        let invoiceItemTotalTax = this.getValue(await this.pdfInvoiceItemTotalTax.textContent({timeout:500}));
        expect.soft(this.itemSummedTax).toEqual(invoiceItemTotalTax);
    }

    async validateTotalItemCess(){
        let invoiceItemTotalCess = this.getValue(await this.pdfItemTotalCess.textContent({timeout:500}));
        expect.soft(this.itemSummedCess).toEqual(invoiceItemTotalCess);
    }
    
    async validateTaxableAmount(){
        let taxableAmount = this.getValue(await this.pdfInvoiceTaxableAmount.textContent({timeout:500}));
        expect.soft(parseFloat((this.itemSummedAmountWithoutTax + this.additionalChargeWOTax - this.itemSummedDiscount).toFixed(2))).toEqual(taxableAmount);
    }

    async validateTotalAmount(){
        let invoiceTotalAmount = this.getValue(await this.pdfInvoiceAmount.textContent({timeout:500}));
        expect.soft(parseInt((this.invoiceTaxableAmount + this.invoiceTotalTax + this.invoiceTotalCess + this.additionalChargeWOTax - this.invoiceTotalDiscount).toFixed(2))).toEqual(parseInt(invoiceTotalAmount));
    }

    async calculateTotalInvoiceCess(theme){
        let cess = 0;
        if(theme == 'Stylish' || theme == 'Simple' || theme == 'Modern'){
            let count = await this.pdfInvoiceTotalCess.count({timeout:500});
            for(let i=0; i<count; i++){
                cess += this.getValue(await this.pdfInvoiceTotalCess.nth(i).textContent({timeout:500}));
            }
        }
        else{ let count = await this.pdfInvoiceTotalCess_2.count({timeout:500});
            for(let i=0; i<count; i++){
                cess += this.getValue(await this.pdfInvoiceTotalCess_2.nth(i).textContent({timeout:500}));
            }}
        return cess;
    }

    async calculateTotalInvoiceTax(theme){
        let tax = 0;
        if(theme == 'Stylish' || theme == 'Simple' || theme == 'Modern'){
            let count = await this.pdfInvoiceTotalTax.count({timeout:500});
            for(let i=0; i<count; i++){
                tax += this.getValue(await this.pdfInvoiceTotalTax.nth(i).textContent({timeout:500}));
            }
        }
        else if(theme == 'Advanced GST(A5)'){
            let count = await this.pdfInvoiceItemTotalTax.count({timeout:500});
            for(let i=0; i<count; i++){
                tax += this.getValue(await this.pdfInvoiceItemTotalTax.nth(i).textContent({timeout:500}));
            }
            return tax;
        }
        else{ let count = await this.pdfInvoiceTotalTax_2.count({timeout:500});
            if(theme == 'Advanced GST (Tally)'){ count -= 2; }
            for(let i=0; i<count; i++){
                tax += this.getValue(await this.pdfInvoiceTotalTax_2.nth(i).textContent({timeout:500}));
            }
        }
        return tax;
    }

    async calculateTotalAdditionalCharge(){
        let additionalCharge = 0;
        let count = await this.pdfAdditionalChargeWOtax.count({timeout:500})
        for(let i=0; i<count; i++){
            additionalCharge += this.getValue(await this.pdfAdditionalChargeWOtax.nth(i).textContent({timeout:500}));
        }
        return additionalCharge;
    }

    async calculateTotalInvoiceTaxableValue(){
        let count = await this.pdfInvoiceTaxableAmount_2.count({timeout:500});
        let amount = 0;
        for(let i=0; i<count; i++){
            amount += this.getValue(await this.pdfInvoiceTaxableAmount_2.nth(i).textContent({timeout:500}));
        }
        return amount;
    }

    async validateTotalAmountGSTA5(){
        let additionalCharges = await this.calculateTotalAdditionalCharge();

        let invoiceTotalAmount = this.itemSummedAmountWithoutTax + this.itemSummedTax + this.itemSummedCess + additionalCharges - this.itemSummedDiscount;
        let pdfInvoiceTotalAmount = this.getValue(await this.pdfInvoiceAmount.textContent({timeout:500}));

        expect(parseInt(pdfInvoiceTotalAmount)).toEqual(parseInt(invoiceTotalAmount));
    }

    async validateItemAmountBillbook(index){
        let itemRate = this.getValue(await this.pdfItemRate.nth(index).textContent({timeout:500}));
        let itemQuantity = this.getValue(await this.pdfItemQuantity.nth(index).textContent({timeout:500}));
        let itemDiscount = this.getValue(await this.pdfItemDiscountAmount.nth(index).textContent({timeout:500}));
        let itemAmount = this.getValue(await this.pdfItemTotalAmount.nth(index).textContent({timeout:500}));
        this.itemSummedDiscount += itemDiscount;

        expect(itemAmount).toEqual(parseFloat((itemRate*itemQuantity-itemDiscount).toFixed(2)));
        this.itemTotalAmount += itemAmount;
    }
    
    async validateTotalInvoiceAmountBillbook(){
        let additionalCharges = await this.calculateTotalAdditionalCharge();
        let invoiceTotalAmount = this.getValue(await this.pdfInvoiceAmount.textContent({timeout:500}));

        expect(invoiceTotalAmount).toEqual(parseFloat((this.itemTotalAmount + additionalCharges).toFixed(2)));
    }
    
    getValue(value){
        let number = parseFloat(parseFloat(value.replace(/[^0-9.]/g, '')).toFixed(2));
        return number;
    }
}
module.exports = { SalesInvoicePage };
