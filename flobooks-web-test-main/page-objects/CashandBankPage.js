class CashandBankPage{
    constructor(page){
        this.page = page;
        this.multipleAccountModalClose = page.locator("(//div[@class='modal-body'])[2]/div[1]");
        this.totalBalance = page.locator("(//span[@class='total-balance'])[1]");
    }
}

module.exports = { CashandBankPage };
