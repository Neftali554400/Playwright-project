const path = require('path');
process.loadEnvFile(path.resolve(__dirname, '../.env'));
const { test, expect } = require('@playwright/test');
const { loginAndGoToBooking } = require('../helpers/func.helpers.js');

test('group ticket', async ({ page }) => { 
  const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

  // Log in and open the events page.
  await loginAndGoToBooking(page);
  await page.goto(`${BASE_URL}/events`); 

  // Book three tickets for the selected event.
  await page.locator('[data-testid="event-card"]').nth(1).getByTestId('book-now-btn').click(); 
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: '+' }).click();
  await page.getByLabel('Full Name').fill('Michael Neftali');
  await page.locator('#customer-email').fill(process.env.EMAIL);
  await page.getByPlaceholder('+91 98765 43210').fill('+234 801 234 5678'); 
  await page.locator('.confirm-booking-btn').click();

  // Open the booking details and verify the booking reference.
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();
  
  const bookingRef = (await page.locator('.text-gray-900.font-mono').first().innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef[0]).toBe(eventTitle[0]);  

  // Check that a group booking is not eligible for a refund.
  await page.getByTestId('check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });
  const refundResult = page.locator('#refund-result');
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText('Not eligible for refund');
  await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable');

 
await page.waitForTimeout(5000);

});