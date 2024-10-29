class LandingpageSelectors{
  
  constructor(page){
    this.page=page;
    this.loginButton= page.locator('text=Login');
    this.mobileNumberInput= page.locator('[placeholder="Mobile Number"]');
    this.mobileNumberInputTrial= page.locator('[placeholder="Enter Mobile Number"]');
    this.freeTrialButton= page.locator("text=Get Free Trial");
    this.mobileNumberOtpInput= page.locator('[placeholder="OTP"]');
    this.qrScanLoginButton= page.locator('//*[@id="landing-container"]/div[4]/app-login/div/div[1]/button');
    this.dashboardTitle= page.locator("text=Dashboard");
  }

  async validLogin(mobileNumberInput,mobileNumberOtpInput){
    await this.mobileNumberInput.type(mobileNumberInput);
    await this.mobileNumberOtpInput.type(mobileNumberOtpInput);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

}

module.exports = {};
