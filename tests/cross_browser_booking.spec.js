const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = `${BASE_URL}/api`;

const YAHOO_USER = {
  email: 'youryahoouser@yahoo.com',
  password: 'YourPassword123'
};

const GMAIL_USER = {
  email: 'yourgmailuser@gmail.com',
  password: 'YourPassword123'
};

async function loginAs(page, user) {
  await page.goto(BASE_URL);

  await page
    .getByPlaceholder('you@email.com')
    .fill(user.email);

  await page
    .getByLabel('Password')
    .fill(user.password);

  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'Browse Events →' })
  ).toBeVisible();
}

test('Cross-User Booking Access Denied', async ({ page, request }) => {

  const loginRes = await request.post(
    `${API_URL}/auth/login`,
    {
      data: {
        email: YAHOO_USER.email,
        password: YAHOO_USER.password
      }
    }
  );

  expect(loginRes.ok()).toBeTruthy();

  const loginJson = await loginRes.json();
  const token = loginJson.token;

  const eventsRes = await request.get(
    `${API_URL}/events`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(eventsRes.ok()).toBeTruthy();

  const eventsJson = await eventsRes.json();
  const eventId = eventsJson.data[0].id;

  const bookingRes = await request.post(
    `${API_URL}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },

      data: {
        eventId: eventId,
        customerName: 'Yahoo User',
        customerEmail: YAHOO_USER.email,
        customerPhone: '08012345678',
        quantity: 1
      }
    }
  );

  expect(bookingRes.ok()).toBeTruthy();

  const bookingJson = await bookingRes.json();
  const yahooBookingId = bookingJson.data.id;

  console.log('Yahoo Booking ID:', yahooBookingId);

  await loginAs(page, GMAIL_USER);

  await page.goto(
    `${BASE_URL}/bookings/${yahooBookingId}`,
    {
      waitUntil: 'networkidle'
    }
  );

  await expect(
    page.getByText('Access Denied')
  ).toBeVisible();

  await expect(
    page.getByText('You are not authorized to view this booking')
  ).toBeVisible();

});