const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const YAHOO_USER = {
  email: 'michael.neftali@gmail.com',
  password: 'Kike#124#^&^&^'
};

const GMAIL_USER = {
  email: 'michael.neftali@gmail.com',
  password: 'Kike#124#^&^&^'
};

async function loginAs(page, user) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Cross-User Booking Access Denied', async ({ page, browser }) => {
  await loginAs(page, YAHOO_USER);
  await page.goto(`${BASE_URL}/events`);

  await page.locator('[data-testid="event-card"]').first().getByTestId('book-now-btn').click();
  await page.getByLabel('Full Name').fill('Yahoo User');
  await page.locator('#customer-email').fill(YAHOO_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('+234 801 234 5678');
  await page.locator('.confirm-booking-btn').click();

  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingUrl = page.url();
  const secondPage = await browser.newPage();

  try {
    await loginAs(secondPage, GMAIL_USER);
    await secondPage.goto(bookingUrl, { waitUntil: 'networkidle' });
    await expect(secondPage.getByText('Access Denied')).toBeVisible();
    await expect(secondPage.getByText('You are not authorized to view this booking')).toBeVisible();
  } finally {
    await secondPage.close();
  }
});
