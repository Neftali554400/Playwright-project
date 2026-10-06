export {};

import { expect, type Page } from '@playwright/test';

export const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

export async function loginAndGoToEvents(page: Page): Promise<void> {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error('EMAIL and PASSWORD must be set in the environment');
  }

  await page.goto(BASE_URL);

  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  await page.goto(`${BASE_URL}/events`);
}