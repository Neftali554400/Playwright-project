# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: webAPI.spec.js >> @Webst Client App login
- Location: tests/webAPI.spec.js:24:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart 1" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "1"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [ref=e25]: 
          - text: Sign Out
  - text:    
  - generic [ref=e26]:
    - paragraph [ref=e27]: Home | Search
    - heading "Filters" [level=4] [ref=e29]
    - generic [ref=e30]:
      - textbox "search" [ref=e32]
      - generic [ref=e33]:
        - heading "Price Range" [level=6] [ref=e34]
        - generic [ref=e35]:
          - textbox "Min Price" [ref=e37]
          - textbox "Max Price" [ref=e39]
      - generic [ref=e40]:
        - heading "Categories" [level=6] [ref=e41]
        - generic [ref=e42]: 
        - generic [ref=e44]:
          - checkbox [ref=e45]
          - generic [ref=e46]: fashion
        - generic [ref=e47]:
          - checkbox [ref=e48]
          - generic [ref=e49]: electronics
        - generic [ref=e50]:
          - checkbox [ref=e51]
          - generic [ref=e52]: household
      - generic [ref=e53]:
        - heading "Sub Categories" [level=6] [ref=e54]
        - generic [ref=e55]: 
        - generic [ref=e57]:
          - checkbox [ref=e58]
          - generic [ref=e59]: t-shirts
        - generic [ref=e60]:
          - checkbox [ref=e61]
          - generic [ref=e62]: shirts
        - generic [ref=e63]:
          - checkbox [ref=e64]
          - generic [ref=e65]: shoes
        - generic [ref=e66]:
          - checkbox [ref=e67]
          - generic [ref=e68]: mobiles
        - generic [ref=e69]:
          - checkbox [ref=e70]
          - generic [ref=e71]: laptops
      - generic [ref=e72]:
        - heading "Search For" [level=6] [ref=e73]
        - generic [ref=e74]: 
        - generic [ref=e76]:
          - checkbox [ref=e77]
          - generic [ref=e78]: men
        - generic [ref=e79]:
          - checkbox [ref=e80]
          - generic [ref=e81]: women
  - generic [ref=e82]:
    - generic [ref=e83]:
      - generic [ref=e84]:
        - generic [ref=e85]: Showing 3 results |
        - generic [ref=e86]: User can only see maximum 9 products on a page
      - generic [ref=e87]:
        - generic [ref=e91]:
          - heading "ADIDAS ORIGINAL" [level=5] [ref=e92]
          - generic [ref=e93]: $ 11500
          - button "View" [ref=e95] [cursor=pointer]:
            - generic [ref=e96]: 
            - text: View
          - button " Add To Cart" [ref=e97] [cursor=pointer]:
            - generic [ref=e98]: 
            - text: Add To Cart
        - generic [ref=e102]:
          - heading "ZARA COAT 3" [level=5] [ref=e103]
          - generic [ref=e104]: $ 11500
          - button "View" [ref=e106] [cursor=pointer]:
            - generic [ref=e107]: 
            - text: View
          - button " Add To Cart" [active] [ref=e108] [cursor=pointer]:
            - generic [ref=e109]: 
            - text: Add To Cart
        - generic [ref=e113]:
          - heading "iphone 13 pro" [level=5] [ref=e114]
          - generic [ref=e115]: $ 55000
          - button "View" [ref=e117] [cursor=pointer]:
            - generic [ref=e118]: 
            - text: View
          - button " Add To Cart" [ref=e119] [cursor=pointer]:
            - generic [ref=e120]: 
            - text: Add To Cart
    - list "Pagination" [ref=e125]:
      - listitem [ref=e126]:
        - text: «
        - generic [ref=e127]:
          - text: Previous
          - generic [ref=e128]: page
      - listitem [ref=e129]:
        - generic [ref=e130]: You're on page
        - text: "1"
      - listitem [ref=e131]:
        - generic [ref=e132]:
          - text: Next
          - generic [ref=e133]: page
        - text: »
  - generic [ref=e134]: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1   | import { test, expect, request } from '@playwright/test';
  2   | const loginPayload = { userEmail: "michael.neftali@gmail.com", userPassword: "Kike#124#^&^&^" };
  3   | let token;
  4   | 
  5   | test.beforeAll(async () => {
  6   | 
  7   |    //Login API call to get the token
  8   |   const apiContext = await request.newContext();
  9   | 
  10  |   const LoginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
  11  |     {
  12  |       data: loginPayload
  13  |     }
  14  |   );
  15  | 
  16  |   expect(LoginResponse.ok()).toBeTruthy();
  17  |     const loginResponseJson = await LoginResponse.json();
  18  |          token = loginResponseJson.token;
  19  | 
  20  |       await apiContext.dispose();
  21  | 
  22  | });
  23  | 
  24  | test('@Webst Client App login', async ({ page }) => {
  25  | 
  26  |    await page.addInitScript(value => {
  27  |         window.localStorage.setItem('token', value);
  28  |     }, token);
  29  | 
  30  | 
  31  |    //js file- Login js, DashboardPage
  32  |    const email = loginPayload.userEmail;
  33  |    const productName = 'ZARA COAT 3';
  34  |    const products = page.locator(".card-body");
  35  |    await page.goto("https://rahulshettyacademy.com/client");
  36  | //    await page.locator("#userEmail").fill(email);
  37  | //    await page.locator("#userPassword").fill("Kike#124#^&^&^");
  38  | //    await page.locator("[value='Login']").click();
  39  |    await page.waitForLoadState('networkidle');
  40  |    await page.locator(".card-body b").first().waitFor();
  41  |    const titles = await page.locator(".card-body b").allTextContents();
  42  |    console.log(titles); 
  43  |    const count = await products.count();
  44  |    for (let i = 0; i < count; ++i) {
  45  |       if (await products.nth(i).locator("b").textContent() === productName) {
  46  |          //add to cart
  47  |          const addToCartRequestPromise = page.waitForRequest(request =>
  48  |             request.url().includes('/api/ecom/') && request.method() === 'POST'
  49  |          );
  50  |          await products.nth(i).locator("text= Add To Cart").click();
  51  |          const addToCartRequest = await addToCartRequestPromise;
  52  |          const productId = addToCartRequest.postDataJSON()._id;
  53  | 
  54  |          //Create order API call to create an order
  55  |          const orderResponse = await page.request.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
  56  |             {
  57  |                headers: {
  58  |                   Authorization: token
  59  |                },
  60  |                data: {
  61  |                   orders: [
  62  |                      {
  63  |                         country: 'Nigeria',
  64  |                         productOrderedId: productId
  65  |                      }
  66  |                   ]
  67  |                }
  68  |             }
  69  |          );
> 70  |          expect(orderResponse.ok()).toBeTruthy();
      |                                     ^ Error: expect(received).toBeTruthy()
  71  |          const orderResponseJson = await orderResponse.json();
  72  |          expect(orderResponseJson.orders[0]).toBeTruthy();
  73  |          break;
  74  |       }
  75  |    }
  76  |  
  77  |    await page.locator("[routerlink*='cart']").click();
  78  |    //await page.pause();
  79  |  
  80  |    await page.locator("div li").first().waitFor();
  81  |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  82  |    expect(bool).toBeTruthy();
  83  |    await page.locator("text=Checkout").click();
  84  |  
  85  |    await page.locator("[placeholder*='Country']").pressSequentially("Nig", { delay: 150 });
  86  |    const dropdown = page.locator(".ta-results");
  87  |    await dropdown.waitFor();
  88  |    const optionsCount = await dropdown.locator("button").count();
  89  |    for (let i = 0; i < optionsCount; ++i) {
  90  |       const text = await dropdown.locator("button").nth(i).textContent();
  91  |       if (text === " Nigeria") {
  92  |          await dropdown.locator("button").nth(i).click();
  93  |          break;
  94  |       }
  95  |    }
  96  |  
  97  |    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  98  |    await page.locator(".action__submit").click();
  99  |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  100 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  101 |    console.log(orderId);
  102 |  
  103 |    await page.locator("button[routerlink*='myorders']").click();
  104 |    await page.locator("tbody").waitFor();
  105 |    const rows = await page.locator("tbody tr");
  106 |  
  107 |   for (let i = 0; i < await rows.count(); ++i) {
  108 |   const rowOrderId = await rows.nth(i).locator("th").textContent();
  109 |    if (orderId.includes(rowOrderId)) {
  110 |    await rows.nth(i).locator("button").first().click();
  111 |    break;
  112 | }
  113 | }
  114 | });
  115 | 
```