async function loginAndGoToEvents(page) {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('you@email.com').fill(process.env.EMAIL);
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  await page.goto(`${BASE_URL}/events`);
}