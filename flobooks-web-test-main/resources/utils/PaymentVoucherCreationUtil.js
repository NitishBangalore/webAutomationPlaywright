const { expect } = require('@playwright/test');
const { POManager } = require("../../page-objects/POManager");

class PaymentVoucherCreationUtil{

    static async createPayment(page,party,data){
        const poManager = new POManager(page);
        const paymentInPage = poManager.getPaymentInPage();

        await paymentInPage.partySearchBar.click();
        await paymentInPage.partySearchBar.type(party);
        await paymentInPage.selectParty.click();

        let invoiceNumber = await paymentInPage.firstVoucherInList_Number.textContent();
        let pendingAmt = await paymentInPage.getPendingAmount();
        let settleAmt = (pendingAmt/2).toFixed(2);


        if (await data.customSettle == true) {
            await paymentInPage.enterpaymentAmountInput.click();
            await paymentInPage.enterpaymentAmountInput.fill(settleAmt);
            expect(await paymentInPage.firstVoucherInList_AmountPending).toContainText((parseInt(settleAmt)).toString());   //as settle amount was half, new pending amount amount will also match
            expect(await paymentInPage.invoiceAmountPaid).toContainText((parseInt(settleAmt)).toString());      //mathcing the invoice paid amount is same as of amount enter while creating
        } else if (await data.customSettle == false) {
            await paymentInPage.firstInvoiceSettle.click();
            var amountPaid = (await paymentInPage.invoiceAmountPaid.textContent()).trim();
            expect(amountPaid.replace(/[^0-9.]/g, '')).toBe(pendingAmt.toString());   //for this case both amount will be same
        }
        
        if (data.paymentMode == "bank") {
            await paymentInPage.paymentModeDropDown.click();
            await paymentInPage.bankPaymentMode.click();
            await paymentInPage.paymentRecievedInDropdown.click();
            await paymentInPage.selectPaymentReceiveIn.click();
        }

        if (data.paymentMode == "cheque") {
            await paymentInPage.paymentModeDropDown.click();
            await paymentInPage.chequePaymentMode.click();
            await paymentInPage.paymentRecievedInDropdown.click();
            await paymentInPage.selectPaymentReceiveIn.click();
        }
        await paymentInPage.notes.fill(data.notes + invoiceNumber);

        await paymentInPage.saveInvoice.click();
        await paymentInPage.toast.waitFor();
        await expect(paymentInPage.toast).toHaveText('Payment created successfully');
    }

}
module.exports = {PaymentVoucherCreationUtil};