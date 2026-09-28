const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./Utils/API_utils');
const loginPayLoad = { userEmail: "michael.neftali@gmail.com", userPassword: "Kike#124#^&^&^" };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;


test('@SP Place the order', async ({ page }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    const token = await apiUtils.getToken();

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    const product = page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' });
    const addToCartRequestPromise = page.waitForRequest(req =>
        req.url().includes('add-to-cart') && req.method() === 'POST'
    );

    await product.getByText('Add To Cart').click();
    const addToCartRequest = await addToCartRequestPromise;
    const addToCartPayload = addToCartRequest.postDataJSON();
    const productId = addToCartPayload.product?._id || addToCartPayload._id || addToCartPayload.productId;

    expect(productId, `Unexpected add-to-cart payload: ${JSON.stringify(addToCartPayload)}`).toBeTruthy();

    response = await apiUtils.createOrder({
        orders: [{ country: "Nigeria", productOrderedId: productId }]
    });

    await apiContext.dispose();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const routeResponse = await page.request.fetch(route.request());
            const body = JSON.stringify(fakePayLoadOrders);
            await route.fulfill({ response: routeResponse, body });
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
});