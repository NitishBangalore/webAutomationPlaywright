class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.mobileNumberInput = page.locator("//input[@placeholder='Mobile Number']");
    this.mobileNumberInputTrial = page.frameLocator('#login_iframe').locator('[placeholder="Enter Mobile Number"]');
    this.freeTrialButton = page.locator("text=Get Free Trial");
    this.mobileNumberOtpInput = page.locator('//span[normalize-space()="Get OTP"]');
    this.mobileOtpInput = page.locator('//input[@placeholder="OTP"]');
    this.qrScanLoginButton = page.locator('//*[@id="landing-container"]/div[4]/app-login/div/div[1]/button');
    this.dashboardTitle = page.locator("text=Dashboard");
    this.LoginButton = page.locator("//span[normalize-space()='Login']");
    this.DashboardHeader = page.locator('#header >> text=Dashboard');
    this.registerButton = page.frameLocator('#login_iframe').locator('button:has-text("Register")');
    this.newUserRegisterText = page.locator('text=Namaste 🙏, Create your myBillBook Account');
    this.invalidMobileNumberError = page.locator("//div[@class='input-error']");
    this.invalidOtpError = page.frameLocator('#login_iframe').getByText('Valid mobile number required')
  }

  async completeLoginProcess(mobile,otp){
    await this.goTo();
    this.validLogin(mobile,otp);
  }

  async goToLoginPage(){
    await this.page.goto("/app/main-landing");
  }

  async goTo() {
    await this.page.goto("/app");
    await this.page.waitForSelector('div.table-responsive');
  }

  async validLogin(mobile, otp) {
    await this.loginButton.click();
    await this.mobileNumberInput.click();
    await this.mobileNumberInput.fill(mobile);
    await this.mobileNumberOtpInput.click();
    await this.mobileOtpInput.fill(otp);
    await this.LoginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
  }

}



module.exports = { LoginPage };