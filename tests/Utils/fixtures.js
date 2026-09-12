// Utils/fixtures.js
const { test: base } = require('@playwright/test');

const customtest = base.extend({
  authStorage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const EMAIL = process.env.EVENTHUB_EMAIL || 'michael.neftali@gmail.com';
    const PASSWORD = process.env.EVENTHUB_PASSWORD || 'Kike#124#^&^&^';

    await page.goto('https://eventhub.rahulshettyacademy.com');
    await page.getByPlaceholder('you@email.com').fill(EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.locator('#login-btn').click();

    await page.getByRole('link', { name: /Browse Events/i }).first().waitFor({
      state: 'visible',
      timeout: 15000,
    });

    const storage = await context.storageState();
    await context.close();
    await use(storage);
  },

  authenticatedPage: async ({ browser, authStorage }, use) => {
    const context = await browser.newContext({
      storageState: authStorage,
      baseURL: 'https://eventhub.rahulshettyacademy.com',
    });
    const page = await context.newPage();

    await page.goto('/events');
    await use(page);
    await context.close();
  },

  createEvent: async ({ request }, use) => {
    const EMAIL = process.env.EVENTHUB_EMAIL || 'michael.neftali@gmail.com';
    const PASSWORD = process.env.EVENTHUB_PASSWORD || 'Kike#124#^&^&^';

    const loginRes = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    if (loginRes.status() >= 400) {
      const text = await loginRes.text();
      throw new Error(`Login API failed: ${loginRes.status()} ${text}`);
    }

    const loginBody = await loginRes.json();
    const token = loginBody.token;

    const random = Date.now();
    const payload = {
      title: `e2e-event-${random}`,
      description: 'Created by Playwright fixture',
      venue: 'Lagos',
      city: 'Lagos',
      eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      category: 'Conference',
      price: 100,
      totalSeats: 50,
    };

    const resp = await request.post('https://api.eventhub.rahulshettyacademy.com/api/events', {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      data: payload,
    });

    if (resp.status() >= 400) {
      const text = await resp.text();
      throw new Error(`createEvent API failed: ${resp.status()} ${text}`);
    }

    const body = await resp.json();
    const createdEvent = body.data || body;
    createdEvent.name = createdEvent.title || createdEvent.name;
    await use(createdEvent);
  },
});

module.exports = { customtest };