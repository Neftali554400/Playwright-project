const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./Utils/API_utils');
const loginPayLoad = { userEmail: "michael.neftali@gmail.com", userPassword: "Kike#124#^&^&^" };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = { token: await apiUtils.getToken() };
    await apiContext.dispose();
})

//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    const product = page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' });
    const addToCartRequestPromise = page.waitForRequest(apiRequest =>
        apiRequest.url().includes('add-to-cart') && apiRequest.method() === 'POST'
    );
    await product.getByText('Add To Cart').click();
    const addToCartRequest = await addToCartRequestPromise;
    const addToCartPayload = addToCartRequest.postDataJSON();
    const productId = addToCartPayload.product?._id || addToCartPayload._id || addToCartPayload.productId || addToCartPayload.productOrderedId;
    expect(productId, `Unexpected add-to-cart payload: ${JSON.stringify(addToCartPayload)}`).toBeTruthy();
    const orderResponse = await page.request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: {
            orders: [{ country: 'Cuba', productOrderedId: productId }]
        },
        headers: {
            Authorization: response.token,
            'Content-Type': 'application/json'
        }
    });
    expect(orderResponse.ok(), `Create order failed (${orderResponse.status()}): ${await orderResponse.text()}`).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    response.orderId = orderResponseJson.orders[0];
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
// Precondition - create order -