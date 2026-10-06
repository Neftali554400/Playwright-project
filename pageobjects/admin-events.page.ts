import { expect, type Locator, type Page } from '@playwright/test';

type EventDetails = {
  title: string;
  description: string;
  city: string;
  venue: string;
  date: string;
  price: string | number;
  totalSeats: string | number;
};

export class AdminEventsPage {
  private readonly adminButton: Locator;
  private readonly manageEventsLink: Locator;

  constructor(private readonly page: Page) {
    this.adminButton = page.getByRole('button', { name: 'Admin' });
    this.manageEventsLink = page
      .getByRole('navigation')
      .getByRole('link', { name: 'Manage Events' });
  }

  async open(): Promise<void> {
    await this.adminButton.click();
    await this.manageEventsLink.click();
  }

  async createEvent(event: EventDetails): Promise<void> {
    await this.page.locator('#event-title-input').fill(event.title);
    await this.page.locator('#admin-event-form textarea').fill(event.description);
    await this.page.getByLabel('City').fill(event.city);
    await this.page.getByLabel('Venue').fill(event.venue);
    await this.page.getByLabel('Event Date & Time').fill(String(event.date));
    await this.page.getByLabel('Price ($)').fill(String(event.price));
    await this.page.getByLabel('Total Seats').fill(String(event.totalSeats));

    await this.page.locator('#add-event-btn').click();

    await expect(
      this.page.getByRole('row', { name: new RegExp(event.title, 'i') })
    ).toBeVisible();
  }
}