import { Page, expect, Locator } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";

export const checkoutExpect = expect.extend({

  async toBeOrderSuccessful(checkoutPage: CheckoutPage) {
    const errors: string[] = [];

    try {
      await expect(checkoutPage.pageInstance).toHaveURL(/order-received/i);
    } catch {
      errors.push("Did not navigate to order confirmation page.");
    }

    try {
      await expect(
        checkoutPage.pageInstance.getByRole("heading", { level: 1 })).toHaveText(/Order received/i);
    } catch {
        errors.push("Success heading not displayed.");
    }

    return {
      pass: errors.length === 0,
      message: () =>
        errors.length === 0
          ? "Expected order not to be successful."
          : errors.join("\n"),
    };
  },
    async toShowValidationError(checkoutPage: CheckoutPage, expectedMessage: RegExp) {
        const errors: string[] = [];

        try {
            await expect(checkoutPage.pageInstance.getByRole("alert")).toContainText(expectedMessage);
        } catch {
            errors.push(`Expected validation message "${expectedMessage}" not shown.`);
        }

        return {
            pass: errors.length === 0,
            message: () =>
                errors.length === 0
                ? "Expected no validation error."
                : errors.join("\n"),
        };
    },

    async toCompleteProcessing(checkoutPage: CheckoutPage) {

        const errors: string[] = [];

        try {
            await expect(checkoutPage.form()).toHaveClass(/processing/);
        } catch {
           errors.push("Form never entered processing state.");
        }

        try {
            await expect(checkoutPage.form()).not.toHaveClass(/processing/);
        } catch {
            errors.push("Form did not exit processing state.");
        }

        return {
            pass: errors.length === 0,
            message: () =>
            errors.length === 0
                ? "Form completed processing correctly."
                : errors.join("\n"),
        };
    },

    async toContainErrors(checkoutPage: CheckoutPage, expectedMessages: string[]) {

        const errors: string[] = [];

        for (const expected of expectedMessages) {
            try {
                await expect(checkoutPage.errorBox()).toContainText(expected);
            } catch {
                errors.push(`Missing validation error: "${expected}"`);
            }    
        }

        return {
            pass: errors.length === 0,
            message: () =>
                errors.length === 0
                ? "Expected no validation errors."
                : errors.join("\n"),
        };
    }

});
