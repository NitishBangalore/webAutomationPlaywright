const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const landingPageStrings = require('../constants/landingPageStrings');
const dashboardUrl = require('../constants/dashboardUrl');
const logindataset = JSON.parse(JSON.stringify(require('../resources/loginTestData.json')));
const invalidMobileDataset = JSON.parse(JSON.stringify(require('../resources/invalidMobileNumber.json')));
const invalidOtpDataset = JSON.parse(JSON.stringify(require('../resources/invalidOtp.json')));


export default function createTests() {
    // Reset storage state for this file to avoid being authenticated
    test.use({ storageState: { cookies: [], origins: [] } });

for (const data of logindataset) {
    test(`Validate user App login happy flow for mobile ${data.number} ${data.otp} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goToLoginPage();

        await loginPage.validLogin(data.number, data.otp);
        if (await data.newUser == true) {
            //validate for new number 
            await expect(
                loginPage.newUserRegisterText
            ).toContainText(landingPageStrings.newUserRegisterText);
            loginPage.registerButton.isVisible();
            expect(await loginPage.DashboardHeader).toBeVisible();
        } else if (await data.newUser == false) {
            //validate for existing  user 
            await expect(page).toHaveURL(dashboardUrl.DASHBOARDLEFTNAVURL);
        }

    });
}

for (const data of invalidMobileDataset) {
    test(`Validate user App login negative flow for invalid  mobile number  ${data.number}}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goToLoginPage();
        await loginPage.loginButton.click();
        await loginPage.mobileNumberInput.click();
        await loginPage.mobileNumberInput.fill(data.number);
        await loginPage.mobileNumberOtpInput.click();
        await expect(loginPage.invalidMobileNumberError).toContainText(" Valid mobile number required ");
    });
}

for (const data of invalidOtpDataset) {
    test(`Validate user App login negative flow for invalid otp  ${data.otp} }`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goToLoginPage();
        await loginPage.loginButton.click();
        await loginPage.mobileNumberInput.click();
        await loginPage.mobileNumberInput.fill(data.number);
        await loginPage.mobileNumberOtpInput.click();
        await loginPage.mobileOtpInput.fill(data.otp);
        await loginPage.LoginButton.click();
        await expect(loginPage.invalidOtpError).toBeVisible();
    });
}

}