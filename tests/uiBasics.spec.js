const {test, expect} = require('@playwright/test'); 


test.only( 'first playwright test', async ({browser}) => 
{

    const context = await browser.newContext(); 
    const page = await context.newPage(); 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');  
  
    //get the title, put an assertion 
    console.log(await page.title());
    //await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible(); 
    await page.locator('#username').fill('michael');
    await page.locator('[type="password"]').fill('12345');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());



});


test( 'second playwright test', async ({browser}) => 
{

    const context = await browser.newContext(); 
    const page = await context.newPage(); 
    await page.goto('https://google.com');  

    //get the title, put an assertion 
    console.log(await page.title());
    await expect(page).toHaveTitle('Google'); 
});