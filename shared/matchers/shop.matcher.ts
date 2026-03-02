import { expect as baseExpect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
/**
 *  Validates that the shop page URL matches the expected pattern
 */
export const shopExpect = baseExpect.extend({
  async toHaveURL(shopPage: ShopPage, expected: RegExp | string) {
    let message: string = "";
    let pass: boolean = false;
    try {
      // Attempt to match the URL
      await baseExpect(shopPage.pageInstance).toHaveURL(expected);
      pass = true;
      message = `Expected URL to match ${expected}, and it did.`;
    } catch {
      // URL did not match
      pass = false;
      message = `Expected URL to match ${expected}, but it did not.`;
    }

    return {
      pass,
      message: () => message,
    };
  },
});
