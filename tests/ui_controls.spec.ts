const { test, expect } = require('@playwright/test');

test('UI controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const UserName = page.locator("#username");
    const documentLink = page.locator('[href*="documents-request"]');
    const SignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    dropdown.selectOption("Teacher");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    //assertion
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await page.locator(".radiotextsty").nth(1).isChecked();
    await page.locator("#terms").click(); 
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    });

    // await page.pause();


test('child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');  

    const [newPage] = await Promise.all([
        
    context.waitForEvent('page'),
    documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ") [0]
    console.log(domain); 
    await page.locator('#username').type(domain);
    await page.pause();
    console.log(await page.locator('#username').textContent());
});
   

   





