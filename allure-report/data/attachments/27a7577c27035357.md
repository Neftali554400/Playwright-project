# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orderflow_2.spec.js >> @Webst Client App login
- Location: tests/orderflow_2.spec.js:3:1

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
  3  | test('@Webst Client App login', async ({ page }) => {
  4  |    //js file- Login js, DashboardPage
  5  |    const email = "michael.neftali@gmail.com";
  6  |    const productName = 'ZARA COAT 3';
  7  |    const products = page.locator(".card-body");
> 8  |    await page.goto("https://rahulshettyacademy.com/client");
     |               ^ Error: page.goto: Test timeout of 30000ms exceeded.
  9  |    await page.getByPlaceholder("email@example.com").fill(email);
  10 |    await page.getByPlaceholder("enter your passsword").fill("Kike#124#^&^&^");
  11 |    await page.getByRole('button',{name:"Login"}).click();
  12 |    await page.waitForLoadState('networkidle');
  13 |    await page.locator(".card-body b").first().waitFor();
  14 |    
  15 |    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
  16 |    .getByRole("button",{name:"Add to Cart"}).click();
  17 |  
  18 |    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  19 |  
  20 |    //await page.pause();
  21 |    await page.locator("div li").first().waitFor();
  22 |    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  23 |  
  24 |    await page.getByRole("button",{name :"Checkout"}).click();
  25 |  
  26 |    await page.getByPlaceholder("Select Country").pressSequentially("Nig");
  27 |  
  28 |    await page.getByRole("button",{name :"Nigeria"}).last().click();
  29 |    await page.getByText("PLACE ORDER").click();
  30 |  
  31 |    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  32 | })
  33 | 
```