// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  timeout: 60000,
  expect: {
    timeout: 30000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    headless: true,
    screenshot: "only-on-failure",
    baseURL: process.env.STAGING == '1' ? 'https://dev.niobooks.in' : 'https://niobooks.in',
  },
      projects: [
        { name: 'setup', testMatch: /.*\.setup\.js/ },
        
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'],
            // Use prepared auth state.
            storageState: '.auth/user.json',
            testIdAttribute: 'id',
          },
          dependencies: ['setup'],
          testMatch:'specs/suites.ts',
        },

      ],
    
});

