import { test, expect } from '@playwright/test';

test('codegenrecord', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await page.getByRole('textbox', { name: 'email@example.com' }).fill('michael.neftali@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Kike#124#^&^&^');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('img').first().click();
  await page.getByRole('button', { name: ' Add To Cart' }).first().click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button', { name: 'Checkout❯' }).click();
  await page.getByRole('textbox', { name: 'Select Country' }).click();
  await page.getByPlaceholder('Select Country').pressSequentially('Nig');
  await page.getByRole('button', { name: 'Nigeria' }).last().click();
  await page.getByText('Place Order').click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();

});