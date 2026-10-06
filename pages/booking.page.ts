export {};

import { expect, type Locator, type Page } from '@playwright/test';

export class BookingPage {
  page: Page;
  bookingCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookingCards = page.locator('#booking-card');
  }

  async completeBooking(email: string): Promise<string> {
    await expect(this.page.locator('#ticket-count')).toHaveText('1');

    await this.page.getByLabel('Full Name').fill('Michael Neftali');
    await this.page.locator('#customer-email').fill(email);
    await this.page
      .getByPlaceholder('+91 98765 43210')
      .fill('+234 801 234 5678');

    await this.page.locator('.confirm-booking-btn').click();

    const bookingRefElement = this.page.locator('.booking-ref').first();
    await expect(bookingRefElement).toBeVisible();

    return (await bookingRefElement.innerText()).trim();
  }

  async openBookings(baseUrl: string): Promise<void> {
    await this.page
      .getByRole('button', { name: 'View My Bookings' })
      .click();

    await expect(this.page).toHaveURL(`${baseUrl}/bookings`);
  }

  async expectBooking(bookingRef: string, eventTitle: string): Promise<void> {
    const booking = this.bookingCards.filter({
      has: this.page.locator('.booking-ref', { hasText: bookingRef }),
    });

    await expect(booking).toBeVisible();
    await expect(booking).toContainText(eventTitle);
  }
}