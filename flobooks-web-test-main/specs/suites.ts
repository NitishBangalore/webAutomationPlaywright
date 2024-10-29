import { test } from "@playwright/test";

import dashBoardPage from './Dashboard.spec.js';
import loginPage from './LoginPage.spec.js';
import itemPage from './Item.spec.js';
import partyPage from './Party.spec.js';
import SalesPage from './SalesInvoice.spec.js';
import purchasePage from './Purchase.spec.js';
import paymentInPage from './PaymentIn.spec.js';
import paymentOutPage from './PaymentOut.spec.js';
import quotationPage from './Quotation.spec.js';
import invoiceViewPage from './InvoiceView.spec.js';
import reportsPage from './Reports.spec.js';
import godownPage from "./Godown.spec.js";


test.describe(dashBoardPage);
test.describe(loginPage);
test.describe(itemPage);
test.describe(partyPage);
test.describe(SalesPage);
test.describe(purchasePage);
test.describe(paymentInPage);
test.describe(paymentOutPage);
test.describe(quotationPage);
test.describe(invoiceViewPage);
test.describe(reportsPage);
test.describe(godownPage);
