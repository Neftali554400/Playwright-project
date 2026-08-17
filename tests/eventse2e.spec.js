import { test, expect } from '@playwright/test';

test('codegenrecord', async ({ page }) => { 

  const eventTitle = `DevFest ${Date.now()}`;
  const eventCards = page.locator('[data-testid="event-card"]');

  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill('michael.neftali@gmail.com');
  await page.getByLabel('Password').fill('Kike#124#^&^&^'); 
  await page.locator('#login-btn').click(); 
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.locator('#event-title-input').fill('DevFest');
  await page
  .locator('#admin-event-form textarea')
  .fill('This is a one of a kind event hosted in Los Angeles');
  await page.getByLabel('City').fill('Maryland'); 
  await page.getByLabel('Venue').fill('34 TopDown Park, Adx 2349'); 
  await page.getByLabel('Event Date & Time').fill('2026-08-25T10:00');
  await page.getByLabel('Price ($)').fill('800');
  await page.getByLabel('Total Seats').fill('50');
  await page.locator('#add-event-btn').click();
  await expect(page.getByText('Event created!')).toBeVisible();
  await page.getByTestId('nav-events').click();
  const eventCount = await eventCards.count();
  await expect(eventCards.first()).toBeVisible();
  const eventCard = eventCards.filter({ hasText: 'DevFest' });
  await expect(eventCard).toBeVisible();
  await page.waitForTimeout(5000);






















});