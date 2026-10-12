import { readFileSync } from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { test } from '@playwright/test';
import { RahulShettyLoginPage } from '../../pageobjects/rahulshetty-login.page';
import { RahulShettyShopPage } from '../../pageobjects/rahulshetty-shop.page';

test('sign in and verify iPhone X is in the shop', async ({ page }) => {
  const envPath = path.resolve(__dirname, '../../.env');
  const envContents = readFileSync(envPath, 'utf8');
  const fileEnv = dotenv.parse(envContents);
  const sentenceCredentials =
    /email\s+is\s+([^\s)]+).*?password\s+is\s+([^\s)]+)/i.exec(envContents);
  const username = (
    process.env.EMAIL ||
    process.env.USERNAME ||
    fileEnv.EMAIL ||
    fileEnv.USERNAME ||
    sentenceCredentials?.[1]
  )?.trim();
  const password =
    process.env.PASSWORD || fileEnv.PASSWORD || sentenceCredentials?.[2];

  if (!username || !password) {
    throw new Error('Set EMAIL/USERNAME and PASSWORD in .env');
  }

  const loginPage = new RahulShettyLoginPage(page);
  const shopPage = new RahulShettyShopPage(page);

  await loginPage.open();
  await loginPage.login(username, password);
  await shopPage.expectLoaded();
  await shopPage.expectIphoneXVisible();
});
