# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fixture_demo.spec.js >> Fixtures demo
- Location: tests/fixture_demo.spec.js:4:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - banner [ref=f1e4]:
    - generic [ref=f1e5]:
      - generic: Ecom
      - generic [ref=f1e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=f1e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=f1e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=f1e13]:
          - link "" [ref=f1e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=f1e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=f1e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=f1e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=f1e22]:
    - generic [ref=f1e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=f1e24]:
        - text: Practice Website for
        - emphasis [ref=f1e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=f1e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=f1e28]:
      - paragraph [ref=f1e29]:
        - generic [ref=f1e30]: Register to sign in with your personal account
      - generic [ref=f1e31]:
        - heading "Log in" [level=1] [ref=f1e32]
        - generic [ref=f1e33]:
          - generic [ref=f1e34]:
            - generic [ref=f1e35]: Email
            - textbox "email@example.com" [ref=f1e36]
          - generic [ref=f1e37]:
            - generic [ref=f1e38]: Password
            - textbox "enter your passsword" [ref=f1e39]
          - button "Login" [ref=f1e40] [cursor=pointer]
        - link "Forgot password?" [ref=f1e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=f1e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=f1e43]:
    - heading "Why People Choose Us?" [level=1] [ref=f1e46]
    - generic [ref=f1e47]:
      - generic [ref=f1e48]:
        - generic [ref=f1e49]: 
        - generic [ref=f1e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=f1e52]: Successfull Orders
      - generic [ref=f1e53]:
        - generic [ref=f1e54]: 
        - generic [ref=f1e56]:
          - heading "37653" [level=1]
          - paragraph [ref=f1e57]: Customers
      - generic [ref=f1e58]:
        - generic [ref=f1e59]: 
        - generic [ref=f1e61]:
          - heading "3243" [level=1]
          - paragraph [ref=f1e62]: Sellers
    - generic [ref=f1e63]:
      - generic [ref=f1e64]:
        - generic [ref=f1e65]: 
        - generic [ref=f1e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=f1e68]: Daily Orders
      - generic [ref=f1e69]:
        - generic [ref=f1e70]: 
        - generic [ref=f1e72]:
          - heading "500+" [level=1]
          - paragraph [ref=f1e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { customtest } = require('./Utils/fixtures.js');
  3  | 
  4  | customtest('Fixtures demo', async ({ authenticatedPage }) => {
> 5  |   await authenticatedPage.goto('https://rahulshettyacademy.com/client');
     |                           ^ Error: page.goto: Target page, context or browser has been closed
  6  |   await authenticatedPage.locator("button[routerlink*='myorders']").click();
  7  | 
  8  |   const ordersTable = authenticatedPage.locator('tbody');
  9  |   await expect(ordersTable).toBeVisible();
  10 | });
```