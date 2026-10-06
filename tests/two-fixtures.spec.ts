export {};

// tests/events.spec.ts
const { expect } = require('@playwright/test');
const { customtest } = require('./Utils/fixtures');

customtest('authenticated user can view the newly created event', async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto('/events'); // uses baseURL from fixture
  await expect(authenticatedPage.getByText(createEvent.name)).toBeVisible();
});