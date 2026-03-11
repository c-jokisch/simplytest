import { expect as baseExpect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";

// Deklariere zusätzliche Matcher 
declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      toHaveURL(shopPage: ShopPage, expected: RegExp | string): Promise<R>;
      toHaveNavigatedSuccessfully(expected: { url: string; title: string; h1: string }): Promise<R>;
      toBeEmptyCart(cartPage: CartPage): Promise<R>;
      toBeCartUpdatedProducts(expectedPath: string, expectedSubtotal: string, expectedTotal: string, expectedOrderTotal: string): Promise<R>;
      toBeOrderSuccessful(checkoutPage: CheckoutPage): Promise<R>;
      toShowValidationError(checkoutPage: CheckoutPage, expectedMessage: RegExp): Promise<R>;
      toCompleteProcessing(checkoutPage: CheckoutPage): Promise<R>;
      toContainErrors(checkoutPage: CheckoutPage, expectedMessages: { errors: string[] }): Promise<R>;
    }
  }
}

export const expect = baseExpect.extend({
  async toHaveNavigatedSuccessfully(
    shopPage: ShopPage,
    expected: { url: string; title: string; h1: string }
  ) {
    const results: string[] = [];

    try {
      await baseExpect(shopPage.pageInstance).toHaveURL(expected.url);
    } catch {
      results.push(`URL did not match: ${expected.url}`);
    }

    try {
      await baseExpect(shopPage.pageInstance).toHaveTitle(expected.title);
    } catch {
      results.push(`Title did not match: ${expected.title}`);
    }

    try {
      await baseExpect(shopPage.pageInstance.getByRole('heading', { level: 1 })).toHaveText(expected.h1);
    } catch {
      results.push(`H1 did not match: ${expected.h1}`);
    }

    return {
      pass: results.length === 0,
      message: () => `Navigation results: ${results.join(", ")}`,
    };
  },
});

export { baseExpect };
