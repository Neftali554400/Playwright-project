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

    

    // await page.pause();



   

   





});