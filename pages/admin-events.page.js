import { expect } from '@playwright/test';

export class AdminEventsPage {
  constructor(page) {
    this.page = page;
    this.adminButton = page.getByRole('button', { name: 'Admin' });
    this.manageEventsLink = page
      .getByRole('navigation')
      .getByRole('link', { name: 'Manage Events' });
  }

  async open() {
    await this.adminButton.click();
    await this.manageEventsLink.click();
  }

  async createEvent(event) {
    await this.page.locator('#event-title-input').fill(event.title);
    await this.page.locator('#admin-event-form textarea').fill(event.description);
    await this.page.getByLabel('City').fill(event.city);
    await this.page.getByLabel('Venue').fill(event.venue);
    await this.page.getByLabel('Event Date & Time').fill(event.date);
    await this.page.getByLabel('Price ($)').fill(event.price);
    await this.page.getByLabel('Total Seats').fill(event.totalSeats);

    await this.page.locator('#add-event-btn').click();

    await expect(
      this.page.getByRole('row', { name: new RegExp(event.title, 'i') })
    ).toBeVisible();
  }
}