import type { Page } from '@playwright/test';

export class RahulShettyLoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('#username').fill(username);
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.locator('#terms').check();
    await this.page.locator('#signInBtn').click();
  }
}
