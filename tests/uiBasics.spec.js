const {test, expect} = require('@playwright/test'); 


test.only( 'first playwright test', async ({browser}) => 
{

    const context = await browser.newContext(); 
    const page = await context.newPage(); 
    await page.goto('https://eventhub.rahulshettyacademy.com/login');  
  
    //get the title, put an assertion 
    console.log(await page.title());
   // await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible(); 
    await page.locator('#email').fill('michael.neftali@gmail.com');

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