
const { test, expect } = require('@playwright/test');

test.only('order flow', async ({ page }) => {

    const productName = 'Zara Coat 4'; 
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("michael.neftali@gmail.com");
    await page.locator("#userPassword").fill("Kike#124#^&^&^");
    await page.locator('input[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles); 

    const count = await products.count(); 
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add to Cart").click();
            break;
        }        
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 4')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=checkout").click(); 
    await page.locator("[placeholder*='Country']").pressSequentially("Nig", {delay:100});
    await page.locator(".ta-results");
    await dropdown.waitFor(); 
    optionsCount = await dropdown.locator("button").count(); 
    for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent 
            if (text === "Nig")
        {
            await dropdown.locator("button").nth(i).click(); 
            break; 
        }
    }
    await page.pause();



});

