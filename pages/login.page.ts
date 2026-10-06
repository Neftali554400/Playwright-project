export {};

import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  adminLink: Locator;
  loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('you@email.com');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.locator('#login-btn');
    this.adminLink = page.getByText('Admin', { exact: true });
    this.loginError = page.locator('[role="alert"], .error, .alert');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    try {
      await expect(this.adminLink).toBeVisible({ timeout: 10000 });
    } catch {
      const error = await this.loginError.first().textContent().catch(() => '');

      throw new Error(
        `Login failed: ${error?.trim() || 'credentials were rejected or the Admin locator is incorrect'}`
      );
    }
  }
}