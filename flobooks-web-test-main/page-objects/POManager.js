const { LoginPage } = require('./LoginPage');
const { DashBoardPage } = require('./DashBoardPage');
const { PartyPage } = require('./PartyPage');
const { SalesInvoicePage } = require('./SalesInvoicePage');
const { ItemPage } = require('./ItemPage');
const { PurchasePage } = require('./PurchasePage');
const { QuotationPage } = require('./QuotationPage');
const { PaymentInPage } = require('./PaymentInPage');
const { PaymentOutPage } = require('./PaymentOutPage');
const { CashandBankPage } = require('./CashandBankPage');
const { ReportsPage } = require('./ReportsPage');
const { GodownPage } = require('./GodownPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.DashboardPage = new DashBoardPage(this.page);
        this.PartyPage = new PartyPage(this.page);
        this.SalesInvoicePage = new SalesInvoicePage(this.page);
        this.ItemPage = new ItemPage(this.page);
        this.PurchasePage = new PurchasePage(this.page);
        this.QuotationPage = new QuotationPage(this.page);
        this.PaymentInPage = new PaymentInPage(this.page);
        this.PaymentOutPage = new PaymentOutPage(this.page)
        this.CashandBankPage = new CashandBankPage(this.page);
        this.ReportsPage = new ReportsPage(this.page);
        this.GodownPage = new GodownPage(this.page);
    }

    getLoginPage() {
        return this.LoginPage;
    }

    getDashboardPage() {
        return this.DashboardPage;
    }

    getPartyPage() {
        return this.PartyPage;
    }

    getSalesInvoicePage() {
        return this.SalesInvoicePage;
    }

    getItemPage() {
        return this.ItemPage;
    }
    getPurchasePage() {
        return this.PurchasePage;
    }

    getQuotationPage() {
        return this.QuotationPage;
    }

    getPaymentInPage() {
        return this.PaymentInPage;
    }

    getPaymentOutPage() {
        return this.PaymentOutPage;
    }

     getCashandBankPage(){
        return this.CashandBankPage;
    }
    
    getReportsPage(){
        return this.ReportsPage;
    }

    getGodownPage(){
        return this.GodownPage;
    }

}

module.exports = { POManager };