export {};

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

function getCrossUser(role: 'OWNER' | 'GUEST') {
  const email = process.env[`CROSS_USER_${role}_EMAIL`];
  const password = process.env[`CROSS_USER_${role}_PASSWORD`];

  if (!email || !password) {
    throw new Error(`CROSS_USER_${role}_EMAIL and CROSS_USER_${role}_PASSWORD must be set`);
  }

  return { email, password };
}

async function loginAs(page, user) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Cross-User Booking Access Denied', async ({ page, browser }) => {
  const owner = getCrossUser('OWNER');
  const guest = getCrossUser('GUEST');

  await loginAs(page, owner);
  await page.goto(`${BASE_URL}/events`);

  await page.locator('[data-testid="event-card"]').first().getByTestId('book-now-btn').click();
  await page.getByLabel('Full Name').fill('Yahoo User');
  await page.locator('#customer-email').fill(owner.email);
  await page.getByPlaceholder('+91 98765 43210').fill('+234 801 234 5678');
  await page.locator('.confirm-booking-btn').click();

  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingUrl = page.url();
  const secondPage = await browser.newPage();

  try {
    await loginAs(secondPage, guest);
    await secondPage.goto(bookingUrl, { waitUntil: 'networkidle' });
    await expect(secondPage.getByText('Access Denied')).toBeVisible();
    await expect(secondPage.getByText('You are not authorized to view this booking')).toBeVisible();
  } finally {
    await secondPage.close();
  }
});
