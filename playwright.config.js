// @ts-check
import { defineConfig, devices, firefox } from '@playwright/test';

/** 
* @see https://playwright.dev/docs/test-configuration 
*/

const config = ({
  testDir: './tests',
  timeout: 30 * 1000, 

  expect: { 
    timeout: 5000,  
  }, 

  use: {
    browserName: 'webkit'

  },

}); 
module.exports = defineConfig({
  // Make sure 'html' is listed as a reporter:
  reporter: [['html', { open: 'never' }]], 
});
 
module.exports = defineConfig({
  // Global configuration applied to all projects
  use: {
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
  ],
});