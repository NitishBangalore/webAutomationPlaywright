import { test as setup, expect } from '@playwright/test';
const { POManager } = require('../page-objects/POManager');
import * as fs from 'fs';


const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {

  // // Check if the auth file exists and has content
  // if (fs.existsSync(authFile)) {
  //   const fileData = fs.readFileSync(authFile, 'utf-8');
    
  //   // If the auth file has data, skip the test
  //   if (fileData && fileData.trim().length > 0) {
  //     console.log('Auth file already exists and contains data. Skipping authentication.');
  //     return;
  //   }
  // }

  // Perform authentication steps.
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin('8340550193', '123456');

  const dashboardPage = poManager.getDashboardPage();
  await expect(dashboardPage.dashboardHeader).toContainText('Dashboard');
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});