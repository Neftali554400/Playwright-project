# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orderflow.spec.js >> @Webst Client App login
- Location: tests/orderflow.spec.js:3:2

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]
          - button "Login" [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e59]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e70]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  |  
  3  |  test('@Webst Client App login', async ({ page }) => {
  4  |    //js file- Login js, DashboardPage
  5  |    const email = "michael.neftali@gmail.com";
  6  |    const productName = 'ZARA COAT 3';
  7  |    const products = page.locator(".card-body");
> 8  |    await page.goto("https://rahulshettyacademy.com/client");
     |               ^ Error: page.goto: Test timeout of 30000ms exceeded.
  9  |    await page.locator("#userEmail").fill(email);
  10 |    await page.locator("#userPassword").fill("Kike#124#^&^&^");
  11 |    await page.locator("[value='Login']").click();
  12 |    await page.waitForLoadState('networkidle');
  13 |    await page.locator(".card-body b").first().waitFor();
  14 |    const titles = await page.locator(".card-body b").allTextContents();
  15 |    console.log(titles); 
  16 |    
  17 |    const count = await products.count();
  18 |    for (let i = 0; i < count; ++i) {
  19 |       if (await products.nth(i).locator("b").textContent() === productName) {
  20 |          //add to cart
  21 |          await products.nth(i).locator("text= Add To Cart").click();
  22 |          break;
  23 |       }
  24 |    }
  25 |  
  26 |    await page.locator("[routerlink*='cart']").click();
  27 |    //await page.pause();
  28 |  
  29 |    await page.locator("div li").first().waitFor();
  30 |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  31 |    expect(bool).toBeTruthy();
  32 |    await page.locator("text=Checkout").click();
  33 |  
  34 |    await page.locator("[placeholder*='Country']").pressSequentially("Nig", { delay: 150 });
  35 |    const dropdown = page.locator(".ta-results");
  36 |    await dropdown.waitFor();
  37 |    const optionsCount = await dropdown.locator("button").count();
  38 |    for (let i = 0; i < optionsCount; ++i) {
  39 |       const text = await dropdown.locator("button").nth(i).textContent();
  40 |       if (text === " Nigeria") {
  41 |          await dropdown.locator("button").nth(i).click();
  42 |          break;
  43 |       }
  44 |    }
  45 |  
  46 |    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  47 |    await page.locator(".action__submit").click();
  48 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  49 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  50 |    console.log(orderId);
  51 |  
  52 |    await page.locator("button[routerlink*='myorders']").click();
  53 |    await page.locator("tbody").waitFor();
  54 |    const rows = await page.locator("tbody tr");
  55 |  
  56 |   for (let i = 0; i < await rows.count(); ++i) {
  57 |   const rowOrderId = await rows.nth(i).locator("th").textContent();
  58 |    if (orderId.includes(rowOrderId)) {
  59 |    await rows.nth(i).locator("button").first().click();
  60 |    break;
  61 | }
  62 | }
  63 | });
```