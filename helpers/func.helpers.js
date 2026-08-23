const path = require('path');
process.loadEnvFile(path.resolve(__dirname, '../.env'));
const { expect } = require('@playwright/test');

  const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  async function loginAndGoToBooking(page){await page.goto(BASE_URL);

    await page.getByPlaceholder('you@email.com').fill(process.env.EMAIL);
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.locator('#login-btn').click();
    await expect(
      page.getByRole('link', { name: 'Browse Events →' }) ).toBeVisible();
    }
    
module.exports = { loginAndGoToBooking };
