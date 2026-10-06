export {};

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { expect, test, type Page } from '@playwright/test';
import { loginAndGoToBooking } from '../helpers/func.helpers';

const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

function getRequiredEnvVar(name: 'EMAIL' | 'PASSWORD'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in the environment`);
  }
  return value;
}

test('single ticket', async ({ page }: { page: Page }) => {
  const email = getRequiredEnvVar('EMAIL');

  await loginAndGoToBooking(page);
  await page.goto(`${BASE_URL}/events`);

  await page.locator('[data-testid="event-card"]').nth(2).getByTestId('book-now-btn').click();
  await page.getByLabel('Full Name').fill('Michael obinali');
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+234 801 234 5678');
  await page.locator('.confirm-booking-btn').click();

  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingRef = (await page.locator('.text-gray-900.font-mono').first().innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef[0]).toBe(eventTitle[0]);

  await page.getByTestId('check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  const refundResult = page.locator('#refund-result');
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText('Eligible for refund');
  await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund');

  await page.waitForTimeout(5000);
});

test('group ticket', async ({ page }: { page: Page }) => {
  const email = getRequiredEnvVar('EMAIL');

  await loginAndGoToBooking(page);
  await page.goto(`${BASE_URL}/events`);

  await page.locator('[data-testid="event-card"]').nth(2).getByTestId('book-now-btn').click();
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: '+' }).click();
  await page.getByLabel('Full Name').fill('Michael Neftali');
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+234 801 234 5678');
  await page.locator('.confirm-booking-btn').click();

  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  const bookingRef = (await page.locator('.text-gray-900.font-mono').first().innerText()).trim();
  const eventTitle = (await page.locator('h1').innerText()).trim();
  expect(bookingRef[0]).toBe(eventTitle[0]);

  await page.getByTestId('check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  const refundResult = page.locator('#refund-result');
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText('Not eligible for refund');
  await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable');

  await page.waitForTimeout(5000);
});
