const base = require('@playwright/test');
const { APiUtils } = require('./API_utils.js');
const { request } = require('@playwright/test');

const loginPayLoad = { userEmail: 'michael.neftali@gmail.com', userPassword: 'Kike#124#^&^&^' };
const orderPayLoad = {
    orders: [{ country: 'Nigeria', productOrderedId: '6960eac0c941646b7a8b3e68' }]
};

exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('michael.neftali@gmail.com');
        await page.locator('#userPassword').fill('Kike#124#^&^&^');
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);
        await context.close();
    },

    createOrder : async({}, use) =>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        use(response);
        
        await apiContext.dispose();
    }
});