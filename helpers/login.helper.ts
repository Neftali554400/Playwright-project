import { expect, type Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

export async function loginAndGoToEvents(page: Page): Promise<void> {
  await page.goto(BASE_URL);

  const email = process.env.EMAIL?.trim();
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error('EMAIL and PASSWORD must be set in .env');
  }

  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  await page.goto(`${BASE_URL}/events`);
}