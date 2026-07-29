const { test, expect } = require('@playwright/test');

test('first playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const cardTitles = page.locator('.card-title a');
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

        //CSS
    await userName.fill("rahulshettyacademy");    
    await page.locator('[type="password"]').fill("Learning@830$3mK2");
    await signIn.click();

    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents(); 
    console.log(allTitles);
});

test('second playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://google.com');

    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test.only('login to Practice Website', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // const firstName = page.locator('input[type="firstName"]');
    // const lastName = page.locator('input[type="lastName"]');
    // const Email = page.locator('input[type="email"]');
    
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    //await page.locator('.text-reset').click();

    // Get the title, put an assertion
    console.log(await page.title());

    // // Fill the registration form
    // await firstName.fill("Michael");
    // await lastName.fill("Neftali");
    // await Email.fill("michael.neftali@gmail.com");
    // await page.locator('#userMobile').fill("8108989212");
    // await page.locator('#userPassword').fill("Kike#124#^&^&^");
    // await page.locator('#confirmPassword').fill("Kike#124#^&^&^");
    

    // // Select Gender
    // await page.locator('input[type="radio"]').first().check();

    // // Accept Terms & Conditions
    // await page.locator('input[type="checkbox"]').check();

    // // Select Occupation
    // await page
    // .getByRole('combobox')
    // .selectOption({ value: '3: Engineer' });

    //Login 
    await page.locator('#userEmail').fill("michael.neftali@gmail.com");
    await page.locator('#userPassword').fill("Kike#124#^&^&^"); 
    await page.locator('input[type="submit"]').click();
    
    //Get Title of all Products  
    await page.waitForLoadState('networkidle');
    const allprodTitles = await page.locator('#products b').allTextContents();
    console.log(allprodTitles);

});
    

