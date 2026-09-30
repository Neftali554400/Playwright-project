const { customtest } = require('./Utils/fixtures');

customtest('Fixtures demo', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('https://rahulshettyacademy.com/client');
  await authenticatedPage.locator("button[routerlink*='myorders']").click();
  await authenticatedPage.locator('tbody').waitFor();
});