export {};

import { expect, type Locator, type Page } from '@playwright/test';

export class EventsPage {
  page: Page;
  eventCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventCards = page.locator('[data-testid="event-card"]');
  }

  async open(): Promise<void> {
    await this.page.getByTestId('nav-events').click();
    await expect(this.eventCards.first()).toBeVisible();
  }

  getEventCard(title: string): Locator {
    return this.eventCards.filter({ hasText: title });
  }

  async getAvailableSeats(title: string): Promise<number> {
    const eventCard = this.getEventCard(title);
    const seatText = await eventCard.getByText(/seats?/i).innerText();

    return Number(seatText.match(/\d+/)?.[0] ?? 0);
  }

  async bookEvent(title: string): Promise<void> {
    await this.getEventCard(title)
      .getByTestId('book-now-btn')
      .click();
  }
}