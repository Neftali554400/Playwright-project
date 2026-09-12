const { test: base, expect } = require('@playwright/test');

const test = base.extend({

  // Fixture 1: Login through the UI
  authenticatedPage: async ({ page }, use) => {

    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    await page.getByLabel('Email').fill('michael.neftali@gmail.com');
    await page.getByLabel('Password').fill(process.env.PASSWORD);

    await page.getByRole('button', { name: /login/i }).click();

    await page.waitForURL('**/events');

    await use(page);
  },


  // Fixture 2: Create event through API
  createEvent: async ({ request }, use) => {

    const eventName = `Playwright Fixture Event ${Date.now()}`;

    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        data: {
          name: eventName,
          description: 'Event created using Playwright API fixture',
          date: '2026-12-25',
          time: '10:00',
          location: 'Lagos',
          category: 'Conference',
          price: 100,
          totalSeats: 50
        }
      }
    );

    expect(response.ok()).toBeTruthy();

    const event = await response.json();

    await use(event);
  }

});

module.exports = { test, expect };