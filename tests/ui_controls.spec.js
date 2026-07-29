const { test, expect } = require('@playwright/test');

test('UI controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const UserName = page.locator("#username");
    const SignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    dropdown.selectOption("Teacher");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    
    await page.pause();



   

   





});