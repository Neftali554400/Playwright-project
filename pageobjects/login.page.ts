import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly adminLink: Locator;
  private readonly loginError: Locator;

  constructor(private readonly page: Page) {
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