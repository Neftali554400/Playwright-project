import { expect, type Locator, type Page } from '@playwright/test';

const SHOP_URL = 'https://rahulshettyacademy.com/angularpractice/shop';

export class RahulShettyShopPage {
  private readonly iphoneX: Locator;

  constructor(private readonly page: Page) {
    this.iphoneX = page.getByRole('heading', { name: 'iphone X', exact: true });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(SHOP_URL);
  }

  async expectIphoneXVisible(): Promise<void> {
    await expect(this.iphoneX).toBeVisible();
  }
}
