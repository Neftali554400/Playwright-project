export {};

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/login.page';
import { AdminEventsPage } from '../pageobjects/admin-events.page';
import { EventsPage } from '../pageobjects/events.page';
import { BookingPage } from '../pageobjects/booking.page';

test('user can create and book an event', async ({ page }) => {
  const baseUrl = 'https://eventhub.rahulshettyacademy.com';
  const email = process.env.EMAIL?.trim();
  const password = process.env.PASSWORD;
  const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    .toISOString()
    .slice(0, 16);

  if (!email || !password) {
    throw new Error('EMAIL and PASSWORD must be set in .env');
  }

  const eventTitle = `DevFest ${Date.now()}`;
  const loginPage = new LoginPage(page);
  const adminEventsPage = new AdminEventsPage(page);
  const eventsPage = new EventsPage(page);
  const bookingPage = new BookingPage(page);

  await page.goto(baseUrl);
  await loginPage.login(email, password);

  await adminEventsPage.open();
  await adminEventsPage.createEvent({
    title: eventTitle,
    description: 'This is a one of a kind event hosted in Los Angeles',
    city: 'Maryland',
    venue: '34 TopDown Park, Adx 2349',
    date: futureDate,
    price: '800',
    totalSeats: '50',
  });

  await expect(page.getByRole('row', { name: new RegExp(eventTitle, 'i') })).toBeVisible();
});