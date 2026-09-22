import { expect } from '@playwright/test';

export class EventsPage {
  constructor(page) {
    this.page = page;
    this.eventCards = page.locator('[data-testid="event-card"]');
  }

  async open() {
    await this.page.getByTestId('nav-events').click();
    await expect(this.eventCards.first()).toBeVisible();
  }

  getEventCard(title) {
    return this.eventCards.filter({ hasText: title });
  }

  async getAvailableSeats(title) {
    const eventCard = this.getEventCard(title);
    const seatText = await eventCard.getByText(/seats?/i).innerText();

    return Number(seatText.match(/\d+/)[0]);
  }

  async bookEvent(title) {
    await this.getEventCard(title)
      .getByTestId('book-now-btn')
      .click();
  }
}