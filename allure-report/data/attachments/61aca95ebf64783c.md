# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cross_browser_booking.spec.js >> Cross-User Booking Access Denied
- Location: tests/cross_browser_booking.spec.js:34:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  4   | const API_URL = `${BASE_URL}/api`;
  5   | 
  6   | const YAHOO_USER = {
  7   |   email: 'youryahoouser@yahoo.com',
  8   |   password: 'YourPassword123'
  9   | };
  10  | 
  11  | const GMAIL_USER = {
  12  |   email: 'yourgmailuser@gmail.com',
  13  |   password: 'YourPassword123'
  14  | };
  15  | 
  16  | async function loginAs(page, user) {
  17  |   await page.goto(BASE_URL);
  18  | 
  19  |   await page
  20  |     .getByPlaceholder('you@email.com')
  21  |     .fill(user.email);
  22  | 
  23  |   await page
  24  |     .getByLabel('Password')
  25  |     .fill(user.password);
  26  | 
  27  |   await page.locator('#login-btn').click();
  28  | 
  29  |   await expect(
  30  |     page.getByRole('link', { name: 'Browse Events →' })
  31  |   ).toBeVisible();
  32  | }
  33  | 
  34  | test('Cross-User Booking Access Denied', async ({ page, request }) => {
  35  | 
  36  |   const loginRes = await request.post(
  37  |     `${API_URL}/auth/login`,
  38  |     {
  39  |       data: {
  40  |         email: YAHOO_USER.email,
  41  |         password: YAHOO_USER.password
  42  |       }
  43  |     }
  44  |   );
  45  | 
> 46  |   expect(loginRes.ok()).toBeTruthy();
      |                         ^ Error: expect(received).toBeTruthy()
  47  | 
  48  |   const loginJson = await loginRes.json();
  49  |   const token = loginJson.token;
  50  | 
  51  |   const eventsRes = await request.get(
  52  |     `${API_URL}/events`,
  53  |     {
  54  |       headers: {
  55  |         Authorization: `Bearer ${token}`
  56  |       }
  57  |     }
  58  |   );
  59  | 
  60  |   expect(eventsRes.ok()).toBeTruthy();
  61  | 
  62  |   const eventsJson = await eventsRes.json();
  63  |   const eventId = eventsJson.data[0].id;
  64  | 
  65  |   const bookingRes = await request.post(
  66  |     `${API_URL}/bookings`,
  67  |     {
  68  |       headers: {
  69  |         Authorization: `Bearer ${token}`
  70  |       },
  71  | 
  72  |       data: {
  73  |         eventId: eventId,
  74  |         customerName: 'Yahoo User',
  75  |         customerEmail: YAHOO_USER.email,
  76  |         customerPhone: '08012345678',
  77  |         quantity: 1
  78  |       }
  79  |     }
  80  |   );
  81  | 
  82  |   expect(bookingRes.ok()).toBeTruthy();
  83  | 
  84  |   const bookingJson = await bookingRes.json();
  85  |   const yahooBookingId = bookingJson.data.id;
  86  | 
  87  |   console.log('Yahoo Booking ID:', yahooBookingId);
  88  | 
  89  |   await loginAs(page, GMAIL_USER);
  90  | 
  91  |   await page.goto(
  92  |     `${BASE_URL}/bookings/${yahooBookingId}`,
  93  |     {
  94  |       waitUntil: 'networkidle'
  95  |     }
  96  |   );
  97  | 
  98  |   await expect(
  99  |     page.getByText('Access Denied')
  100 |   ).toBeVisible();
  101 | 
  102 |   await expect(
  103 |     page.getByText('You are not authorized to view this booking')
  104 |   ).toBeVisible();
  105 | 
  106 | });
```