import type { APIRequestContext } from '@playwright/test';

class APiUtils {
  apiContext: APIRequestContext;
  loginPayLoad: Record<string, string>;

  constructor(apiContext: APIRequestContext, loginPayLoad: Record<string, string>) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken(): Promise<string> {
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: this.loginPayLoad,
    });
    const loginResponseJson = await loginResponse.json();
    if (!loginResponse.ok() || !loginResponseJson.token) {
      throw new Error(`Login failed (${loginResponse.status()}): ${JSON.stringify(loginResponseJson)}`);
    }
    const token = loginResponseJson.token as string;
    console.log(token);
    return token;
  }

  async createOrder(orderPayLoad: Record<string, unknown>): Promise<{ token: string; orderId?: string }> {
    const response: { token: string; orderId?: string } = { token: await this.getToken() };
    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
      data: orderPayLoad,
      headers: {
        Authorization: response.token,
        'Content-Type': 'application/json',
      },
    });

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    if (!orderResponse.ok() || !Array.isArray(orderResponseJson.orders)) {
      throw new Error(`Create order failed (${orderResponse.status()}): ${JSON.stringify(orderResponseJson)}`);
    }
    const orderId = orderResponseJson.orders[0] as string;
    response.orderId = orderId;

    return response;
  }
}

module.exports = { APiUtils };
