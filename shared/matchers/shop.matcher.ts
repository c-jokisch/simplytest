import { expect as baseExpect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";

export const shopExpect = baseExpect.extend({
    // Validates that the shop page URL matches the expected pattern
    async toHaveURL(shopPage: ShopPage, expected: RegExp | string) {
        try {
            // Attempt to match the URL
            await baseExpect(shopPage.pageInstance).toHaveURL(expected);
            return {
                pass: true,
                message: () => `Expected URL to match ${expected}, and it did.`
            };
        } catch (error) {
            // URL did not match
            return {
                pass: false,
                message: () => `Expected URL to match ${expected}, but it did not.`
            };
        }
    }
});
