const { When, Then, Given } = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');
const {test, expect,playwright} = require('@playwright/test');



Given('a login to Ecommerce application with {username} and {password}', async 
    // Write code here that turns the phrase above into concrete actions

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
});