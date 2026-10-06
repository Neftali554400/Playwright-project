export {};

import path from 'path';
import dotenv from 'dotenv';
import { expect, type Page } from '@playwright/test';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

export async function loginAndGoToBooking(page: Page): Promise<void> {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error('EMAIL and PASSWORD must be defined in the environment');
  }

  await page.goto(BASE_URL);
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

