import { expect, type Locator, type Page } from '@playwright/test';

export class EventsPage {
  private readonly eventCards: Locator;

  constructor(private readonly page: Page) {
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

    const match = seatText.match(/\d+/);
    if (!match) {
      throw new Error(`Could not find available seats for event "${title}"`);
    }

    return Number(match[0]);
  }

  async bookEvent(title: string): Promise<void> {
    await this.getEventCard(title)
      .getByTestId('book-now-btn')
      .click();
  }
}